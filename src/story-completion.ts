export interface StoryCompletionData {
    timeLabels: string[];
    completedStoryCounts: number[];
}

interface Entry {
    timeLabel: string;
    value: number;
}

export function getStoryCompletionData(storyTagsText: string): StoryCompletionData {

    const entriesByTimeLabel = storyTagsText
        .split("\n")
        .map(entry => ({
            timeLabel: extractTimeLabel(entry),
            value: extractStoryCount(entry)
        }))
        .reduce(
            (map: Map<string, number>, entry: Entry) => {
                map.set(entry.timeLabel, entry.value);
                return map;
            },
            new Map<string, number>());

    return {
        timeLabels: Array.from(entriesByTimeLabel.keys()),
        completedStoryCounts: Array.from(entriesByTimeLabel.values())
    };
}

function extractTimeLabel(entry: string): string {
    return entry.substring(0, entry.indexOf("T"));
}

function extractStoryCount(entry: string): number {
    return +entry.split(" ")[1];
}
