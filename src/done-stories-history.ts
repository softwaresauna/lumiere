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

export function getDoneStoriesHistory(storyTagsText: string, endMillis?: number): DoneStoriesHistory {

    const entries: Entry[] = extractEntries(storyTagsText);

    const startingAtMillis = entries[0].timestampMillis;

    const storyCounts = computeStoryCounts(entries, startingAtMillis);

    return {
        timeLabels: generateTimeLabels(startingAtMillis, endMillis, storyCounts.length),
        storyCounts
    };
}

function extractEntries(text: string): Entry[] {
    return text
        .split("\n")
        .map(entry => ({
            timestampMillis: extractTimestamp(entry),
            value: extractStoryCount(entry)
        }));
}

function computeStoryCounts(entries: Entry[], startMillis: number): number[] {

    const entriesByTime = entries
        .reduce(
            (map: Map<number, number>, entry: Entry) => {
                map.set(entry.timestampMillis, entry.value);
                return map;
            },
            new Map<number, number>());

    const storyCounts: number[] = [];

    let currentDayMillis = startMillis;
    let lastStoryCount = 0;

    while (entriesByTime.size > 0) {
        lastStoryCount = entriesByTime.get(currentDayMillis) || lastStoryCount;
        entriesByTime.delete(currentDayMillis);
        storyCounts.push(lastStoryCount);
        currentDayMillis += INCREMENT_MILLIS;
    }

    return storyCounts;
}

function extractTimestamp(entry: string): number {
    return new Date(entry.substring(0, entry.indexOf("T"))).getTime();
}

function extractStoryCount(entry: string): number {
    return +entry.split(" ")[1];
}

function generateTimeLabels(startMillis: number, endMillis: number | undefined, dataSize: number): string[] {

    const amountOfLabels = endMillis !== undefined
        ? Math.floor((endMillis - startMillis) / INCREMENT_MILLIS) + 1
        : dataSize;

    return Array(amountOfLabels).fill(0)
        .map((_, index) =>
            formatTime(startMillis + index * INCREMENT_MILLIS));
}

function formatTime(millis: number): string {
    return new Date(millis).toISOString().split("T")[0];
}
