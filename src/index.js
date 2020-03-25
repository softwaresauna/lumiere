import {getDoneStoriesHistory} from "./done-stories-history";
import axios from "axios";
import {toChartistData} from "./chartist-data-converter";

function loadData(sourceUrl, endDate) {

    if (!sourceUrl) {
        console.log("Loading data aborted: No URL in query param 'sourceUrl'.");
        return;
    }

    axios.get(sourceUrl)
        .then(response => {
            const storyTagsText = response.data;

            const endMillis = endDate
                ? new Date(endDate).getTime()
                : undefined;

            const history = getDoneStoriesHistory(storyTagsText, endMillis);

            const chartistData = toChartistData(history);

            new Chartist.Bar(
                '.ct-chart',
                chartistData,
                {
                    axisY: {
                        type: Chartist.FixedScaleAxis,
                        onlyInteger: true,
                        high: 200,
                        low: 0,
                        divisor: 5,
                    }
                });
        });
}

const sourceUrl = new URLSearchParams(window.location.search).get("sourceUrl");
const endDate = new URLSearchParams(window.location.search).get("endDate");

document.getElementById("dataFileUrl").setAttribute("value", sourceUrl);
document.getElementById("endDate").setAttribute("value", endDate);

loadData(sourceUrl, endDate);