function checkExpiredNotesTimer() {
    return ReduxSaga.eventChannel(emitter => {
            const iv = setInterval(() => {
                emitter();
            }, framework.config.app.checkingExpiredNotesIntervalInSeconds * 1000);
            return () => {
                clearInterval(iv)
            }
        }
    )
}

function* checkExpiredNotes() {
    const channel = yield ReduxSaga.effects.call(checkExpiredNotesTimer);
    try {
        while (true) {
            yield ReduxSaga.effects.take(channel);
            yield ReduxSaga.effects.put(NOTE_CHECK_EXPIRED_ACTION());
        }
    } catch (error) {
        Logger.error(error);
    } finally {
        if (yield ReduxSaga.effects.cancelled()) {
            channel.close();
        }
    }
}

function* addNote(action) {
    try {
        const addNoteForm = yield ReduxSaga.effects.select(selectAddNoteForm);

        const {id: noteId} = yield ReduxSaga.effects.call(Backend.addNote, {
            ...addNoteForm.note,
            ...action.payload,
            expiresIn: Math.ceil((new Date(addNoteForm.note.expirationDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) + " days"
        });

        yield ReduxSaga.effects.put(NOTE_CREATE_SAVE_SUCCEEDED_ACTION(noteId));
        yield showSuccessMessage("Note successfully added");

    } catch (error) {

        yield ReduxSaga.effects.put(NOTE_CREATE_SAVE_FAILED_ACTION(error.message));
        yield showErrorMessage();
    }
}

function* noteSaga() {
    yield ReduxSaga.effects.takeLatest(NOTE_CREATE_SAVE_ACTION, addNote);
    while (yield ReduxSaga.effects.take(USER_INITIAL_DATA_LOADED_ACTION)) {
        const bgSyncTask1 = yield ReduxSaga.effects.fork(checkExpiredNotes);
        yield ReduxSaga.effects.take(USER_LOGGED_OUT_ACTION);
        yield ReduxSaga.effects.cancel(bgSyncTask1);
    }
}
