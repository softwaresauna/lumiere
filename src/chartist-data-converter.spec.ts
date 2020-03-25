import {DoneStoriesHistory} from "./done-stories-history";
import {ChartistData, toChartistData} from "./chartist-data-converter";

it("convert domain model to Chartist model", () => {

    const history: DoneStoriesHistory = {
        timeLabels: ["foo", "bar", "pop"],
        storyCounts: [4, -17]
    };

    const expectedChartistData: ChartistData = {
        labels: ["foo", "bar", "pop"],
        series: [[4, -17]]
    };

    expect(toChartistData(history)).toEqual(expectedChartistData);
});