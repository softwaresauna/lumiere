import {getData} from "./data";
import axios from "axios";


axios.get("https://raw.githubusercontent.com/softwaresauna/story-tag-results-test/master/story-tags.txt")
    .then(response => {
        const storyTagsText = response.data;

        const chartData = getData(storyTagsText);

        // Create a new line chart object where as first parameter we pass in a selector
        // that is resolving to our chart container element. The Second parameter
        // is the actual data object.
        new Chartist.Line('.ct-chart', chartData);
    });


