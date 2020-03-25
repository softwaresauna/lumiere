import {DoneStoriesHistory} from "./done-stories-history";

export interface ChartistData {
    labels: string[];
    series: (UnnamedSeries | NamedSeries)[];
}

type UnnamedSeries = number[];

interface NamedSeries {
    name: string;
    value: number[];
}

export function toChartistData(data: DoneStoriesHistory): ChartistData {

    return {
        labels: data.timeLabels,
        series: [data.storyCounts]
    }
}