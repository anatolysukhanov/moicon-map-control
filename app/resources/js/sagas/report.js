function* addReport(action) {
    try {
        const addReportForm = yield ReduxSaga.effects.select(selectAddReportForm);

        const {id: imageId, token: imageToken, url: imageUrl} = yield ReduxSaga.effects.call(Backend.generateUploadUrl, "image.jpg");
        yield ReduxSaga.effects.call(Backend.uploadImage, imageUrl, addReportForm.report.imageUrl);

        const {id: imageThumbnailId, token: imageThumbnailToken, url: imageThumbnailUrl} = yield ReduxSaga.effects.call(Backend.generateUploadUrl, "thumbnail.jpg");
        yield ReduxSaga.effects.call(Backend.uploadImage, imageThumbnailUrl, addReportForm.report.imageThumbnailUrl);

        const {id: reportId} = yield ReduxSaga.effects.call(Backend.addReport, {
            ...addReportForm.report,
            imageThumbnailId,
            imageThumbnailToken,
            imageId,
            imageToken,
            description: action.payload
        });

        yield ReduxSaga.effects.put(REPORT_ADD_SUCCEEDED_ACTION(reportId));
        yield showSuccessMessage("Report successfully added");

    } catch (error) {

        yield ReduxSaga.effects.put(REPORT_ADD_FAILED_ACTION(error.message));
        yield showErrorMessage();
    }
}

function* reportSaga() {
    yield ReduxSaga.effects.takeLatest(REPORT_ADD_ACTION, addReport);
}
