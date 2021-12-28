function* showSuccessMessage(message) {
    yield ReduxSaga.effects.put(MAP_SHOW_SUCCESS_MESSAGE_ACTION(framework.translate(message)));
    yield ReduxSaga.effects.delay(5000);
    yield ReduxSaga.effects.put(MAP_CLOSE_SUCCESS_MESSAGE_ACTION());
}

function* showErrorMessage() {
    yield ReduxSaga.effects.put(MAP_SHOW_ERROR_MESSAGE_ACTION(framework.translate("Something went wrong. Please try again")));
    yield ReduxSaga.effects.delay(5000);
    yield ReduxSaga.effects.put(MAP_CLOSE_ERROR_MESSAGE_ACTION());
}