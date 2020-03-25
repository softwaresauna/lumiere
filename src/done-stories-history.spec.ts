import {getDoneStoriesHistory, DoneStoriesHistory} from "./done-stories-history";

describe("extracts time & value entries", () => {

    interface Example {
        lines: string[],
        expectedTimeLabels: string[],
        expectedValues: number[],
        endDate?: string
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
        },

        {
            lines: [
                "2020-05-04T04:55:45.032Z 2",
                "2020-05-06T14:02:12.103Z 3",
                "2020-05-09T23:11:15.618Z 4",
            ],
            expectedTimeLabels: [
                "2020-05-04",
                "2020-05-05",
                "2020-05-06",
                "2020-05-07",
                "2020-05-08",
                "2020-05-09",
            ],
            expectedValues: [2, 2, 3, 3, 3, 4]
        },

        {
            lines: [
                "2020-05-04T04:55:45.032Z 2",
                "2020-05-06T14:02:12.103Z 2",
                "2020-05-09T23:11:15.618Z 4",
            ],
            expectedTimeLabels: [
                "2020-05-04",
                "2020-05-05",
                "2020-05-06",
                "2020-05-07",
                "2020-05-08",
                "2020-05-09",
            ],
            expectedValues: [2, 2, 2, 2, 2, 4]
        },

        {
            lines: [
                "2020-05-29T23:11:15.618Z 1",
                "2020-05-30T14:02:12.103Z 1",
                "2020-05-31T04:55:45.032Z 1"
            ],
            endDate: "2020-06-04",
            expectedTimeLabels: [
                "2020-05-29",
                "2020-05-30",
                "2020-05-31",
                "2020-06-01",
                "2020-06-02",
                "2020-06-03",
                "2020-06-04",
            ],
            expectedValues: [1, 1, 1]
        },
    ];

    examples.forEach(example => it(JSON.stringify(example), () => {

        const storyTagsText = example.lines.join("\n");
        const endMillis = example.endDate
            ? new Date(example.endDate).getTime()
            : undefined;

        const expected: DoneStoriesHistory = {
            timeLabels: example.expectedTimeLabels,
            storyCounts: example.expectedValues
        };

        expect(getDoneStoriesHistory(storyTagsText, endMillis)).toEqual(expected)
    }));
});
