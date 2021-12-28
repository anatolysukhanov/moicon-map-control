const initializeAppView = ($reactElement) => {
    const sagaMiddleware = ReduxSaga.default();
    window.appReduxStore = Redux.createStore(
        Redux.combineReducers({
            map: mapReducer,
            device: deviceReducer,
            settings: settingsReducer,
            profile: profileReducer,
            routes: routesReducer,
            route: routeReducer,
            drivers: driversReducer,
            comments: commentsReducer,
            reports: reportsReducer,
            user: userReducer,
            notes: notesReducer
        }),
        Redux.applyMiddleware(sagaMiddleware)
    )

    window.addEventListener('beforeunload', framework.runWithinState(() => window.appReduxStore.dispatch(USER_BEFORE_UNLOAD_ACTION())));

    sagaMiddleware.run(rootSaga);
    const element = React.createElement(ReactRedux.Provider, {store: window.appReduxStore}, React.createElement(ReactReduxApp));
    framework.react.render(element, $reactElement);

    framework.backend.onbroadcastWithinState('GetInitialData_' + framework.config.companyId,
        message => {
            if (message.type === "note") {
                window.appReduxStore.dispatch(message.action === "update" ? NOTE_ADDED_ACTION(message.data) : NOTE_DELETED_ACTION(message.data));
            } else if (message.type === "report") {
                window.appReduxStore.dispatch(message.action === "update" ? REPORT_ADDED_ACTION(message.data) : REPORT_DELETED_ACTION(message.data));
            }
        },
        (resolve, reject, firstRun) => {
            framework.backend.apiCallWithinStatePromise('GetInitialData', {companyId: framework.config.companyId}).then(OUT => {
                window.appReduxStore.dispatch(USER_INITIAL_DATA_LOADED_ACTION(OUT));
                resolve();
            }).catch((error) => {
                Logger.error(error);
                reject(error);
            });
        });

    framework.backend.onbroadcastWithinState('GetRoutesBeingDrivenData_' + framework.config.companyId,
        message => {
            Logger.log("onbroadcastWithinState GetRoutesBeingDrivenData, message:", message)
            window.appReduxStore.dispatch(message.action === "update" ? DRIVERS_UPDATE_ACTION(message.data) : DRIVERS_DELETE_ACTION(message.data));
        },
        (resolve, reject, firstRun) => {
            framework.backend.apiCallWithinStatePromise('GetRoutesBeingDrivenData', {companyId: framework.config.companyId}).then(OUT => {
                Logger.log("GetRoutesBeingDrivenData, OUT:", OUT);
                window.appReduxStore.dispatch(DRIVERS_LOAD_ACTION(OUT.routesBeingDrivenData));
                resolve();
            }).catch((error) => {
                Logger.error(error);
                reject(error);
            });
        });

    framework.backend.onclientbroadcastWithinState('GetRoutesBeingDrivenData_' + framework.config.companyId,
        message => {
            Logger.log("onclientbroadcastWithinState GetRoutesBeingDrivenData, message:", message)
            window.appReduxStore.dispatch(DRIVERS_CLIENT_UPDATE_ACTION(message));
        },
        (resolve, reject, firstRun) => {
            resolve();
        });
};
