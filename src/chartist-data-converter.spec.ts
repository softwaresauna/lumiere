import {Data} from "./data";
import {ChartistData, toChartistData} from "./chartist-data-converter";

it("convert domain model to Chartist model", () => {

    const data: Data = {
      labels: ["foo", "bar"],
        values: [4, -17]
    };

    const expectedChartistData: ChartistData = {
        labels: ["foo", "bar"],
        series: [[4, -17]]
    };

    expect(toChartistData(data)).toEqual(expectedChartistData);
});