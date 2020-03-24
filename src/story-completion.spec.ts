import {getStoryCompletionData, StoryCompletionData} from "./story-completion";

it("extracts one entry", () => {

    const entry = "2020-05-29T23:11:15.618Z 42";

    const expected: StoryCompletionData = {
        timeLabels: ["2020-05-29"],
        completedStoryCounts: [42]
    };

    expect(getStoryCompletionData(entry)).toEqual(expected)
});