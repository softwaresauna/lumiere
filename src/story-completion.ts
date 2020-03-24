export interface StoryCompletionData {
    timeLabels: string[];
    completedStoryCounts: number[];
}

export function getStoryCompletionData(storyTagsText: string): StoryCompletionData {

    return {
        timeLabels: [storyTagsText.substring(0, storyTagsText.indexOf("T"))],
        completedStoryCounts: [+storyTagsText.split(" ")[1]]
    };
}
