const profileReducer = Redux.createReducer(
    {
        isOpen: false,
    },
    {
        [PROFILE_TOGGLE_ACTION]: state => {
            state.isOpen = !state.isOpen;
        },
    },
);
