export interface Data {
    labels: string[];
    values: number[];
}

export function getData(storyTagsText: string): Data {

    return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
        values: [5, 2, 4, 2, 0]
    };
}
