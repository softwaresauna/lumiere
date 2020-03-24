import {getStoryCompletionData, StoryCompletionData} from "./story-completion";

describe("extracts time & value entries", () => {

    interface Example {
        lines: string[],
        expectedTimeLabels: string[],
        expectedValues: number[]
    }

    const examples: Example[] = [
        {
            lines: ["2020-05-29T23:11:15.618Z 42"],
            expectedTimeLabels: ["2020-05-29"],
            expectedValues: [42]
        },
        {
            lines: [
                "2020-05-29T23:11:15.618Z 42",
                "2020-05-30T14:02:12.103Z 43"
            ],
            expectedTimeLabels: ["2020-05-29", "2020-05-30"],
            expectedValues: [42, 43]
        },
        {
            lines: [
                "2020-05-29T23:11:15.618Z 42",
                "2020-05-30T14:02:12.103Z 43",
                "2020-05-31T04:55:45.032Z 47"
            ],
            expectedTimeLabels: ["2020-05-29", "2020-05-30", "2020-05-31"],
            expectedValues: [42, 43, 47]
        },

        {
            lines: [
                "2020-05-04T04:55:45.032Z 2",
                "2020-05-04T14:02:12.103Z 2",
                "2020-05-04T23:11:15.618Z 3",
                "2020-05-05T08:53:11.321Z 3",
                "2020-05-05T19:02:12.543Z 4",
                "2020-05-06T12:45:02.665Z 4",
                "2020-05-06T20:13:30.204Z 6",
            ],
            expectedTimeLabels: ["2020-05-04", "2020-05-05", "2020-05-06"],
            expectedValues: [3, 4, 6]
        }
    ];

    examples.forEach(example => it(JSON.stringify(example), () => {

        const storyTagsText = example.lines.join("\n");

        const expected: StoryCompletionData = {
            timeLabels: example.expectedTimeLabels,
            completedStoryCounts: example.expectedValues
        };

        expect(getStoryCompletionData(storyTagsText)).toEqual(expected)
    }));
});
