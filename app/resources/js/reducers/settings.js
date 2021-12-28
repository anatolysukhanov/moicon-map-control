const settingsReducer = Redux.createReducer(
    {
        isOpen: false,
        isRoadNamesChecked: false,
        isNotesChecked: true,
        isOtherTrucksChecked: true,
    },
    {
        [SETTINGS_PANEL_TOGGLE_ACTION]: state => {
            state.isOpen = !state.isOpen;
        },
        [SETTINGS_ROAD_NAMES_TOGGLE_ACTION]: (state, action) => {
            state.isRoadNamesChecked = action.payload;
        },
        [SETTINGS_MESSAGES_TOGGLE_ACTION]: (state, action) => {
            state.isNotesChecked = action.payload;
        },
        [SETTINGS_OTHER_TRUCKS_TOGGLE_ACTION]: (state, action) => {
            state.isOtherTrucksChecked = action.payload;
        }
    },
);
