import {StoryCompletionData} from "./story-completion";
import {ChartistData, toChartistData} from "./chartist-data-converter";

it("convert domain model to Chartist model", () => {

    const data: StoryCompletionData = {
        timeLabels: ["foo", "bar"],
        completedStoryCounts: [4, -17]
    };

    const expectedChartistData: ChartistData = {
        labels: ["foo", "bar"],
        series: [[4, -17]]
    };

    expect(toChartistData(data)).toEqual(expectedChartistData);
});