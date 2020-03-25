export interface DoneStoriesHistory {
    timeLabels: string[];
    storyCounts: number[];
}

interface Entry {
    timestampMillis: number;
    value: number;
}

const HOUR_MILLIS = 1000 * 60 * 60;
export const INCREMENT_MILLIS = 24 * HOUR_MILLIS;

export function getDoneStoriesHistory(storyTagsText: string, endMillis: number): DoneStoriesHistory {

    const entries: Entry[] = storyTagsText
        .split("\n")
        .map(entry => ({
            timestampMillis: extractTimestamp(entry),
            value: extractStoryCount(entry)
        }));

    const entriesByTime = entries
        .reduce(
            (map: Map<number, number>, entry: Entry) => {
                map.set(entry.timestampMillis, entry.value);
                return map;
            },
            new Map<number, number>());

    const storyCounts: number[] = [];

    const startingAtMillis = entries[0].timestampMillis;

    let currentDayMillis = startingAtMillis;
    let lastStoryCount = 0;

    while (entriesByTime.size > 0) {
        lastStoryCount = entriesByTime.get(currentDayMillis) || lastStoryCount;
        entriesByTime.delete(currentDayMillis);
        storyCounts.push(lastStoryCount);
        currentDayMillis += INCREMENT_MILLIS;
    }

    return {
        timeLabels: generateTimeLabels(startingAtMillis, storyCounts.length),
        storyCounts
    };
}

function extractTimestamp(entry: string): number {
    return new Date(entry.substring(0, entry.indexOf("T"))).getTime();
}

function extractStoryCount(entry: string): number {
    return +entry.split(" ")[1];
}

function generateTimeLabels(startingAtMillis: number, amount: number): string[] {
    return Array(amount).fill(0)
        .map((_, index) =>
            formatTime(startingAtMillis + index * INCREMENT_MILLIS));
}

function formatTime(millis: number): string {
    return new Date(millis).toISOString().split("T")[0];
}
