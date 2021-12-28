const commentsReducer = Redux.createReducer(
    {
        isOpen: false,
        report: undefined
    },
    {
        [COMMENTS_TOGGLE_ACTION]: (state, action) => ({
            ...state,
            isOpen: !state.isOpen,
            report: action.payload
        }),
    },
);
