import {getStoryCompletionData} from "./story-completion";
import axios from "axios";
import {toChartistData} from "./chartist-data-converter";

// "https://raw.githubusercontent.com/softwaresauna/story-tag-results-test/master/story-tags.txt"


function loadData(sourceUrl) {

    if (!sourceUrl){
        console.log("Loading data aborted: No URL in query param 'sourceUrl'.");
        return;
    }

    axios.get(sourceUrl)
        .then(response => {
            const storyTagsText = response.data;

            const chartData = getStoryCompletionData(storyTagsText);
            const chartistData = toChartistData(chartData);

            // Create a new line chart object where as first parameter we pass in a selector
            // that is resolving to our chart container element. The Second parameter
            // is the actual data object.
            new Chartist.Line('.ct-chart', chartistData);
        });
}

const sourceUrl = new URLSearchParams(window.location.search).get("sourceUrl");

loadData(sourceUrl);