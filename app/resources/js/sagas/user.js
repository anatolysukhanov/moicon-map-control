/*function* fetchUser() {
    try {
        const user = yield ReduxSaga.effects.call(Backend.fetchUser);
        yield ReduxSaga.effects.put(USER_INITIAL_DATA_LOADED_ACTION(user));
    } catch (error) {
        yield ReduxSaga.effects.put(USER_FETCH_FAILED_ACTION(error.message));
        yield showErrorMessage();
    }
}*/

function* logoutUser() {
    yield closeRoute();
    yield ReduxSaga.effects.put(USER_LOGGED_OUT_ACTION());
    framework.open('/logout');
}

function* beforeUnload() {
    yield closeRoute();
}

function checkInactiveDriversTimer() {
    return ReduxSaga.eventChannel(emitter => {
            const iv = setInterval(() => {
                emitter();
            }, framework.config.app.checkingInactiveDriversIntervalInSeconds * 1000);
            return () => {
                clearInterval(iv)
            }
        }
    )
}

function* checkInactiveDrivers() {
    const channel = yield ReduxSaga.effects.call(checkInactiveDriversTimer);
    try {
        while (true) {
            yield ReduxSaga.effects.take(channel);
            yield ReduxSaga.effects.put(DRIVERS_CHECK_INACTIVE_ACTION());
        }
    } catch (error) {
        Logger.error(error);
    } finally {
        if (yield ReduxSaga.effects.cancelled()) {
            channel.close();
        }
    }
}

function* userSaga() {
    yield ReduxSaga.effects.takeLatest(USER_LOGOUT_ACTION, logoutUser);
    yield ReduxSaga.effects.takeLatest(USER_BEFORE_UNLOAD_ACTION, beforeUnload);
    while (yield ReduxSaga.effects.take(USER_INITIAL_DATA_LOADED_ACTION)) {
        const bgSyncTask1 = yield ReduxSaga.effects.fork(checkInactiveDrivers);
        yield ReduxSaga.effects.take(USER_LOGGED_OUT_ACTION);
        yield ReduxSaga.effects.cancel(bgSyncTask1);
    }
}