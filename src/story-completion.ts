export interface StoryCompletionData {
    timeLabels: string[];
    completedStoryCounts: number[];
}

export function getStoryCompletionData(storyTagsText: string): StoryCompletionData {

    return {
        timeLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        completedStoryCounts: [5, 2, 4, 2, 0]
    };
}
