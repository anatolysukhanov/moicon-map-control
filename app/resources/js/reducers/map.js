const MAP_CENTER = {
    lat: 60.6023,
    lng: 10.8286
};

const MAX_ZOOM = 20;

const mapReducer = Redux.createReducer(
    {
        userId: 0,
        zoom: 12,
        center: MAP_CENTER,
        geoPosition: undefined,
        userCenter: undefined,
        isShowCurrentLocation: false,
        successMessage: "",
        errorMessage: "",
        isLoading: false,
    },
    {
        [USER_ID_ACTION]: (state, action) => {
            state.userId = Number(action.payload);
        },
        [USER_INITIAL_DATA_LOAD_ACTION]: state => {
            state.isLoading = true;
        },
        [USER_INITIAL_DATA_LOADED_ACTION]: state => {
            state.isLoading = false;
        },
        [USER_FETCH_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_GET_STARTED_ACTION]: state => {
            state.isLoading = true;
        },
        [ROUTE_GET_FINISHED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_GET_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_SHOW_HISTORY_ACTION]: state => {
            state.isLoading = true;
        },
        [ROUTE_GET_HISTORY_SUCCEEDED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_GET_HISTORY_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_RECORD_STOP_ACTION]: state => {
            state.isLoading = true;
        },
        [ROUTE_REORDER_SUCCEEDED_ACTION]: state => {
            state.isLoading = false;
        },
        [ROUTE_REORDER_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [REPORT_ADD_ACTION]: state => {
            state.isLoading = true;
        },
        [REPORT_ADD_SUCCEEDED_ACTION]: state => {
            state.isLoading = false;
        },
        [REPORT_ADD_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [NOTE_CREATE_SAVE_ACTION]: state => {
            state.isLoading = true;
        },
        [NOTE_CREATE_SAVE_SUCCEEDED_ACTION]: state => {
            state.isLoading = false;
        },
        [NOTE_CREATE_SAVE_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [MAP_SHOW_SUCCESS_MESSAGE_ACTION]: (state, action) => {
            state.successMessage = action.payload;
        },
        [MAP_CLOSE_SUCCESS_MESSAGE_ACTION]: state => {
            state.successMessage = "";
        },
        [MAP_SHOW_ERROR_MESSAGE_ACTION]: (state, action) => {
            state.errorMessage = action.payload;
        },
        [MAP_CLOSE_ERROR_MESSAGE_ACTION]: state => {
            state.errorMessage = "";
        },
        [REPORT_ADD_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [DRIVER_GET_ROUTE_FINISHED_ACTION]: state => {
            state.isLoading = false;
        },
        [DRIVER_GET_ROUTE_FAILED_ACTION]: state => {
            state.isLoading = false;
        },
        [DRIVER_CLICK_ACTION]: (state, action) => {
            state.isLoading = true;
        },
        [USER_LOGOUT_ACTION]: state => {
            state.isLoading = true;
        },
        [USER_LOGGED_OUT_ACTION]: state => {
            state.isLoading = false;
        },
        [MAP_GEOPOSITION_CHANGED_ACTION]: (state, action) => {
            state.geoPosition = action.payload;
            if (!state.isShowCurrentLocation) {
                state.center = action.payload;
            }
        },
        [MAP_DRAG_END_ACTION]: (state, action) => {
            state.isShowCurrentLocation = true;
            state.userCenter = action.payload;
        },
        [MAP_ZOOM_CHANGED_ACTION]: (state, action) => {
            state.zoom = action.payload.zoom;
            state.isShowCurrentLocation = true;
            state.userCenter = action.payload.center;
        },
        [MAP_ZOOM_IN_ACTION]: state => {
            if (state.zoom < MAX_ZOOM) {
                state.zoom++;
            }
        },
        [MAP_ZOOM_OUT_ACTION]: state => {
            if (state.zoom > 0) {
                state.zoom--;
            }
        },
        [MAP_SHOW_CURRENT_LOCATION_ACTION]: state => {
            state.isShowCurrentLocation = false;
            state.center = {...state.geoPosition};
            state.userCenter = {...state.geoPosition};
        },
    },
);
