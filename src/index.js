import {getData} from "./data";
import axios from "axios";

// "https://raw.githubusercontent.com/softwaresauna/story-tag-results-test/master/story-tags.txt"


function loadData(sourceUrl) {

    if (!sourceUrl){
        console.log("Loading data aborted: No URL in query param 'sourceUrl'.");
        return;
    }

    axios.get(sourceUrl)
        .then(response => {
            const storyTagsText = response.data;

            const chartData = getData(storyTagsText);

            // Create a new line chart object where as first parameter we pass in a selector
            // that is resolving to our chart container element. The Second parameter
            // is the actual data object.
            new Chartist.Line('.ct-chart', chartData);
        });
}

const sourceUrl = new URLSearchParams(window.location.search).get("sourceUrl");

loadData(sourceUrl);