const getInitials = (author) => {
    return author
        .split(" ")
        .map(word => word.substring(0, 1).toUpperCase())
        .join("");
}

const userReducer = Redux.createReducer(
    {
        id: 0,
        isDriver: undefined,
        isAdmin: false,
        name: "",
        initials: "",
    },
    {
        [USER_INITIAL_DATA_LOADED_ACTION]: (state, action) => {
            state.name = action.payload.username;
            state.initials = getInitials(action.payload.username);
            state.isDriver = action.payload.userIsDriver;
            state.isAdmin = action.payload.userIsAdmin;
        },
        [USER_ID_ACTION]: (state, action) => {
            state.id = action.payload;
        },
    },
);
