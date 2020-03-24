import {StoryCompletionData} from "./story-completion";

export interface ChartistData {
    labels: string[];
    series: UnnamedSeries[] | NamedSeries[];
}

type UnnamedSeries = number[];

interface NamedSeries {
    name: string;
    value: number[];
}

export function toChartistData(data: StoryCompletionData): ChartistData {

    return {
        labels: data.timeLabels,
        series: [data.completedStoryCounts]
    }
}