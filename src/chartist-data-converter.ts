import {Data} from "./data";

interface ChartistData {
    labels: string[];
    series: UnnamedSeries | NamedSeries;
}

type UnnamedSeries = number[];

interface NamedSeries {
    name: string;
    value: number[];
}

export function toChartistData(data: Data): ChartistData {

    return {
        labels: data.labels,
        series: data.values
    }
}