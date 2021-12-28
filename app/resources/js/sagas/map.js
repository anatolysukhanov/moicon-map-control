const pathDriverReducer = (acc, cur) => acc.concat(cur.slice(acc.length === 0 ? 0 : 1));

function* getDriverRoute(action) {
    try {

        const routeObj = yield ReduxSaga.effects.call(Backend.getRoute, action.payload.routeId);

        const points = routeObj.route.fields.points.map(p => ({lat: Number(p.fields.lat), lng: Number(p.fields.lng)}));

        const routeChunks = [...chunks(points, WAYPOINTS_COUNT)];

        const routePaths = yield ReduxSaga.effects.call(GoogleMapsAPI.getDriverPath, routeChunks);

        const errorIndex = routePaths.findIndex(p => p.length === 0);

        let routePath = [];

        if (errorIndex !== -1) {

            routePath = routePaths.slice(0, errorIndex).reduce(pathDriverReducer, []);

            const restRouteChunks = routeChunks.slice(errorIndex);

            for (let restRouteChunk of restRouteChunks) {

                yield ReduxSaga.effects.delay(1000);

                const restRoutePath = yield ReduxSaga.effects.call(GoogleMapsAPI.getDriverRoute, restRouteChunk);

                routePath.push(...restRoutePath);
            }

        } else {

            routePath = routePaths.reduce((acc, cur) => acc.concat(cur.slice(acc.length === 0 ? 0 : 1)), []);
        }

        yield ReduxSaga.effects.put(DRIVER_GET_ROUTE_FINISHED_ACTION(routePath));

    } catch (error) {
        Logger.error(error);
        yield ReduxSaga.effects.put(DRIVER_GET_ROUTE_FAILED_ACTION(error.message));
    }
}

function* mapSaga() {
    const drivers = yield ReduxSaga.effects.select(selectDrivers);
    if (drivers.clickedDriver === undefined) {
        yield ReduxSaga.effects.takeLatest(DRIVER_CLICK_ACTION, getDriverRoute);
    }
}
