const routesReducer = Redux.createReducer(
    {
        isPanelOpen: false,
        data: [],
    },
    {
        [USER_INITIAL_DATA_LOADED_ACTION]: (state, action) => {
            state.data = action.payload.routes.map(r => {
                const {
                    pointIds,
                    ...fields
                } = r.fields;
                return {
                    ...fields,
                    id: r.id,
                }
            });
        },
        [ROUTES_PANEL_TOGGLE_ACTION]: state => {
            state.isPanelOpen = !state.isPanelOpen;
        },
        [ROUTE_GET_SUCCEEDED_ACTION]: state => {
            state.isPanelOpen = false;
        },
        [ROUTE_CANCEL_ACTION]: state => {
            state.isPanelOpen = true;
        },
    },
);
