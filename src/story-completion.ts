export interface StoryCompletionData {
    timeLabels: string[];
    completedStoryCounts: number[];
}

export function getStoryCompletionData(storyTagsText: string): StoryCompletionData {

    const entries = storyTagsText
        .split("\n")
        .map(entry => ({
            timeLabel: extractTimeLabel(entry),
            value: extractStoryCount(entry)
        }));

    return {
        timeLabels: entries.map(entry => entry.timeLabel),
        completedStoryCounts: entries.map(entry => entry.value)
    };
}

function extractTimeLabel(entry: string): string {
    return entry.substring(0, entry.indexOf("T"));
}

function extractStoryCount(entry: string): number {
    return +entry.split(" ")[1];
}