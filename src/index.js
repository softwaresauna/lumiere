import {getDoneStoriesHistory} from "./done-stories-history";
import axios from "axios";
import {toChartistData} from "./chartist-data-converter";

function loadData(sourceUrl) {

    if (!sourceUrl) {
        console.log("Loading data aborted: No URL in query param 'sourceUrl'.");
        return;
    }

    axios.get(sourceUrl)
        .then(response => {
            const storyTagsText = response.data;

            const history = getDoneStoriesHistory(storyTagsText);


            const chartistData =
                //toChartistData(history);
                {
                    labels: ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j"],
                    series: [[1, 2, 3, 1, 2, 3]]
                };


            const xAxisSize = history.storyCounts.length + 10;


           new Chartist.Bar(
                '.ct-chart',
                chartistData,
                {
                    // axisX: {
                    //     type: Chartist.FixedScaleAxis,
                    //     high: xAxisSize,
                    //     low: 0,
                    //     divisor: xAxisSize,
                    // },

                    axisY: {
                        type: Chartist.FixedScaleAxis,
                        onlyInteger: true,
                        high: 6,
                        low: 0,
                        divisor: 6,
                    }
                });
        });
}

const sourceUrl = new URLSearchParams(window.location.search).get("sourceUrl");

loadData(sourceUrl);