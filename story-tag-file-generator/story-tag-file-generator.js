function randomInterval(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}



// ---- entry time ----

const startMillis = 1584090441321;
const hours = 1000 * 60 * 60;

const timePassedMin = 4 * hours;
const timePassedMax = 48 * hours;

let lastEntryTime = startMillis;

function advanceLastEntryTime() {
    lastEntryTime += randomInterval(timePassedMin, timePassedMax);
}

function getEntryTime() {
    return new Date(lastEntryTime).toISOString()
}





// ---- tags ----


let lastStoryCount = 0;

const storyIncreaseMin = 0;
const storyIncreaseMax = 2;

const tagSamples = [
    "#assignCopiesFiles",
    "#assignedStatusReadyForAnalysis",
    "#UploadFormValidationPilot",
    "#UploadFailedPopup",
    "#UploadOkShowList",
    "#UploadOkPopup",
    "#chooseDoctor",
    "#MeasurementListSortedByNewestFirst",
    "#lockedCopyingStatusReadyForPostAnalysis",
    "#copyLockedMeasurement",
    "#lockedCopyingFailedStatusReadyForAnalysis",
    "#deliveryTime",
    "#uploadReportFails",
    "#uploadReportStatusDone",
    "#uploadReportSaved",
    "#ValidateUploadRequestData",
    "#UploadRequestValidation",
    "#UploadTimeSet",
    "#UploadStoredToFileShare",
    "#UploadMeasurementDataDocumentSavedToDb",
    "#UploadHospitalSet",
    "#InitialStatusUploaded",
    "#UploadsInList",
    "#DisplayOnlyMeasurementsFromNursesHospital",
    "#assignCopiesFiles",
    "#failedAssignmentStatusUploaded",
    "#assignedHasDoctor",
    "#failedAssignmentDoctorUnassigned",
    "#chooseDoctor",
    "#assignedStatusReadyForAnalysis"
];

function getStoryTags() {

    const storyIncrease = randomInterval(storyIncreaseMin, storyIncreaseMax);

    lastStoryCount += storyIncrease;

    const tags = [];

    for (let tagIndex = 0; tagIndex < lastStoryCount; tagIndex++) {
        tags.push(tagSamples[tagIndex % tagSamples.length] + tagIndex);
    }

    return tags;
}


// ---- generator ----

const entries = [];
const totalEntries = 200;

for (let i = 0; i < totalEntries; i++) {
    entries.push(entry())
}

function entry() {

    advanceLastEntryTime();

    const tags = getStoryTags();
    const tagsCount = tags.length;
    const timestamp = getEntryTime();

    return [
        timestamp,
        tagsCount,
        ...tags
    ].join(" ");
}


const fs = require('fs');

fs.writeFileSync("story-tags.txt", entries.join("\n"));





