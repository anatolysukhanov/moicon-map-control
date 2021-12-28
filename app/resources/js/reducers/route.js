const DEFAULT_ROUTE = {
    id: 0,
    path: [],
    points: [],
    pointsVisited: [],
    percentages: [],
    legRoutes: [],
    drivenId: 0
};

const routeReducer = Redux.createReducer(
    {
        isMenuOpen: false,
        isStartPanelOpen: false,
        isHistoryPanelOpen: false,
        isStartedPanelOpen: false,
        isRecordingPopupOpen: false,
        isRecording: false,
        drivenRoute: DEFAULT_ROUTE,
        drivenData: []
    },
    {
        [ROUTE_MENU_TOGGLE_ACTION]: state => {
            state.isMenuOpen = !state.isMenuOpen;
        },
        [ROUTE_GET_SUCCEEDED_ACTION]: (state, action) => {
            const {
                id,
                points,
                ...fields
            } = action.payload.route.fields;
            state.drivenRoute = {
                ...fields,
                id: action.payload.route.id,
                pointsVisited: [],
                percentages: [],
                legRoutes: [],
                drivenId: 0,
                points: points.map(p => {
                    const {
                        ...fields
                    } = p.fields;
                    return {
                        ...fields,
                        id: p.id,
                        lat: Number(fields.lat),
                        lng: Number(fields.lng),
                    };
                })
            };
            state.isStartPanelOpen = true;
        },
        [ROUTE_GET_CHUNK_SUCCEEDED_ACTION]: (state, action) => {
            state.drivenRoute.path = state.drivenRoute.path.concat(action.payload.slice(1));
        },
        [ROUTE_GET_FINISHED_ACTION]: (state, action) => {
            let percentages = [];
            for (let i = 0; i < action.payload.legDistances.length; i++) {
                percentages.push(action.payload.legDistances[i] / action.payload.routeDistance * 100);
            }
            state.drivenRoute.percentages = percentages;
            state.drivenRoute.legRoutes = action.payload.legRoutes;
        },
        [ROUTE_GET_FAILED_ACTION]: (state, action) => {
            Logger.log("ROUTE_GET_FAILED_ACTION:", action);
        },
        [ROUTE_START_ACTION]: state => {
            state.isStartPanelOpen = false;
            state.isStartedPanelOpen = true;
        },
        [ROUTE_START_DRIVING_ACTION]: (state, action) => {
            state.drivenRoute.drivenId = action.payload;
        },
        [ROUTE_GET_HISTORY_SUCCEEDED_ACTION]: (state, action) => {
            state.drivenData = action.payload.routeDrivenData.map(d => {
                const diff = new Date(d.fields.endDate) - new Date(d.fields.startDate);
                const hourDiff = Math.floor(diff / 3600 / 1000);
                const minDiff = Math.floor(diff / 60 / 1000) - 60 * hourDiff;
                return {
                    id: d.id,
                    startDate: formatDrivenRouteDate(new Date(d.fields.startDate)),
                    totalTime: hourDiff + "h " + minDiff + "m",
                    userName: d.fields.userName,
                    routePercentageCompleted: d.fields.routePercentageCompleted.toFixed(0)
                }
            });
            state.isStartPanelOpen = false;
            state.isHistoryPanelOpen = true;
        },
        [ROUTE_CLOSE_HISTORY_ACTION]: state => {
            state.drivenData = [];
            state.isHistoryPanelOpen = false;
            state.isStartPanelOpen = true;
        },
        [ROUTE_RECORD_CLICKED_ACTION]: state => {
            state.isRecordingPopupOpen = true;
        },
        [ROUTE_RECORD_YES_ACTION]: state => {
            state.isRecordingPopupOpen = false;
            state.isRecording = true;
            state.isStartPanelOpen = false;
        },
        [ROUTE_RECORD_NO_ACTION]: state => {
            state.isRecordingPopupOpen = false;
        },
        [ROUTE_POINT_VISITED_ACTION]: (state, action) => {
            if (!state.drivenRoute.pointsVisited.includes(action.payload)) {
                state.drivenRoute.pointsVisited.push(action.payload);
            }
        },
        [ROUTE_RECORD_STOP_ACTION]: state => {
            state.isRecording = false;
        },
        [ROUTE_REORDER_SUCCEEDED_ACTION]: state => {
            state.drivenRoute = DEFAULT_ROUTE;
        },
        [ROUTE_REORDER_FAILED_ACTION]: (state, action) => {
            state.drivenRoute = DEFAULT_ROUTE;
            // save to local storage?
        },
        [ROUTE_CANCEL_ACTION]: state => {
            state.isStartPanelOpen = false;
            state.drivenRoute = DEFAULT_ROUTE;
        },
        [ROUTE_CLOSE_ACTION]: state => {
            state.isStartPanelOpen = false;
            state.drivenRoute = DEFAULT_ROUTE;
        },
        [ROUTE_GO_BACK_ACTION]: state => {
            state.isStartPanelOpen = true;
            state.isStartedPanelOpen = false;
        },
        [ROUTE_STOP_ACTION]: state => {
            state.drivenRoute.pointsVisited = [];
        },
        [USER_LOGGED_OUT_ACTION]: state => {
            state.drivenRoute = DEFAULT_ROUTE;
        },
    },
);
