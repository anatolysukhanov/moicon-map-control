const DEFAULT_NOTE_CREATE_FORM = {
    isOpen: false,
    note: {
        userId: undefined,
        lat: undefined,
        lng: undefined,
        address: "",
        message: "",
        expirationDate: ""
    }
};

const notesReducer = Redux.createReducer(
    {
        userId: 0,
        addNoteForm: DEFAULT_NOTE_CREATE_FORM,
        data: [],
        clickedNoteId: 0
    },
    {
        [USER_ID_ACTION]: (state, action) => {
            state.userId = Number(action.payload);
        },
        [USER_INITIAL_DATA_LOADED_ACTION]: (state, action) => {
            state.data = action.payload.notes.map(note => {
                return {
                    ...note.fields,
                    id: note.id,
                    lat: Number(note.fields.lat),
                    lng: Number(note.fields.lng),
                }
            });
        },
        [MAP_CLICKED_ACTION]: (state, action) => {
            state.addNoteForm.note.lat = action.payload.lat;
            state.addNoteForm.note.lng = action.payload.lng;
            state.addNoteForm.isOpen = true;
        },
        [NOTE_CREATE_SAVE_ACTION]: (state, action) => {
            state.addNoteForm.note.message = action.payload.message;
            state.addNoteForm.note.expirationDate = action.payload.expirationDate;
            if (action.payload.lat && action.payload.lng) {
                state.addNoteForm.note.lat = action.payload.lat;
                state.addNoteForm.note.lng = action.payload.lng;
                state.addNoteForm.note.address = action.payload.address;
            }
        },
        [NOTE_CREATE_CANCEL_ACTION]: state => {
            state.addNoteForm = {
                ...DEFAULT_NOTE_CREATE_FORM,
                note: {
                    userId: state.userId,
                    ...DEFAULT_NOTE_CREATE_FORM.note
                }
            };
        },
        [NOTE_CREATE_SAVE_SUCCEEDED_ACTION]: (state, action) => {
            state.data.push({
                ...state.addNoteForm.note,
                id: action.payload
            });
            state.addNoteForm = {
                ...DEFAULT_NOTE_CREATE_FORM,
                note: {
                    userId: state.userId,
                    ...DEFAULT_NOTE_CREATE_FORM.note
                }
            };
        },
        [NOTE_CREATE_SAVE_FAILED_ACTION]: (state, action) => {
            state.addNoteForm = {
                ...DEFAULT_NOTE_CREATE_FORM,
                note: {
                    userId: state.userId,
                    ...DEFAULT_NOTE_CREATE_FORM.note
                }
            };
        },
        [NOTE_CLICKED_ACTION]: (state, action) => {
            state.clickedNoteId = action.payload === state.clickedNoteId ? 0 : action.payload;
        },
        [NOTE_POPUP_CLOSE_ACTION]: state => {
            state.clickedNoteId = 0;
        },
        [NOTE_ADDED_ACTION]: (state, action) => {
            if (action.payload.fields.userId !== state.userId) {
                state.data.push({
                    ...action.payload.fields,
                    id: action.payload.id
                });
            }
        },
        [NOTE_DELETED_ACTION]: (state, action) => {
            const index = state.data.findIndex(n => n.id === action.payload.id);
            if (index !== -1) {
                state.data.splice(index, 1);
            }
        },
        [NOTE_CHECK_EXPIRED_ACTION]: state => {
            state.data.forEach((item, index) => {
                const expirationDateUTC = (new Date(item.expirationDate)).getTime();
                const nowUTC = (new Date()).getTime();
                if (expirationDateUTC <= nowUTC) {
                    state.data.splice(index, 1);
                }
            });
        },
    }
);
