const WAYPOINTS_COUNT = 25;

const pathReducer = (acc, cur) => acc.concat(cur.path.slice(acc.length === 0 ? 0 : 1));

const isNear = (geoPosition, point) => {
    return google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(geoPosition.lat, geoPosition.lng), new google.maps.LatLng(point.lat, point.lng)) < framework.config.app.pointVisitedDistanceInMeters; // return true;
}

const calculateRoutePercentageCompleted = (geoPosition, points, pointsVisited, percentages, legRoutes) => {
    if (pointsVisited.length === 0) return 0;
    if (pointsVisited.length === points.length) return 100;

    const percentageFromA = pointsVisited.length > 1 ? percentages.slice(0, pointsVisited.length - 1).reduce((acc, cur) => acc + cur, 0) : 0;

    const legRoute = legRoutes[pointsVisited.length - 1];

    const nearestPointOnLine = turf.nearestPointOnLine(legRoute, turf.point([geoPosition.lng, geoPosition.lat]));

    const start = turf.point([points[pointsVisited.length - 1].lng, points[pointsVisited.length - 1].lat]);

    const sliceFromAToNearest = turf.lineSlice(start, nearestPointOnLine, legRoute);

    const percentageFromAToNearest = percentageFromA * turf.length(sliceFromAToNearest) / turf.length(legRoute);

    return percentageFromA + percentageFromAToNearest;
}

function* chunks(arr, n) {
    for (let i = 0; i < arr.length - 1; i += n - 1) {
        yield(arr.slice(i, i + n));
    }
}

function* checkRoutePointVisited(action) {
    try {
        const route = yield ReduxSaga.effects.select(selectRoute);
        const pointsNotVisited = yield ReduxSaga.effects.select(selectNotVisitedRoutePoints);
        if (route.isRecording === true && pointsNotVisited) {
            for (const point of pointsNotVisited) {
                if (isNear(action.payload, point)) {
                    yield ReduxSaga.effects.put(ROUTE_POINT_VISITED_ACTION(point.id));
                    return;
                }
            }
        } else if (pointsNotVisited !== undefined && pointsNotVisited.length > 0 && isNear(action.payload, pointsNotVisited[0])) {
            yield ReduxSaga.effects.put(ROUTE_POINT_VISITED_ACTION(pointsNotVisited[0].id));
        }
    } catch (error) {
        Logger.error(error);
    }
}

function* reorderRoute(action) {
    try {
        const route = yield ReduxSaga.effects.select(selectRoute);
        const response = yield ReduxSaga.effects.call(Backend.reorderRoute, route.drivenRoute.id, route.drivenRoute.pointsVisited);
        yield ReduxSaga.effects.put(ROUTE_REORDER_SUCCEEDED_ACTION());
        yield showSuccessMessage("Route successfully recorded");
    } catch (error) {
        yield ReduxSaga.effects.put(ROUTE_REORDER_FAILED_ACTION(error.message));
        yield showErrorMessage();
    }
}

function* getRouteHistory(action) {
    try {
        const drivenData = yield ReduxSaga.effects.call(Backend.getRouteDrivenData, action.payload);
        yield ReduxSaga.effects.put(ROUTE_GET_HISTORY_SUCCEEDED_ACTION(drivenData));
    } catch (error) {
        yield ReduxSaga.effects.put(ROUTE_GET_HISTORY_FAILED_ACTION(error.message));
        yield showErrorMessage();
    }
}

function* getRoute(action) {
    try {
        const routeObj = yield ReduxSaga.effects.call(Backend.getRoute, action.payload);

        const points = routeObj.route.fields.points.map(p => ({lat: Number(p.fields.lat), lng: Number(p.fields.lng)}));

        const routeChunks = [...chunks(points, WAYPOINTS_COUNT)];

        const routePaths = yield ReduxSaga.effects.call(GoogleMapsAPI.getPath, routeChunks);

        const errorIndex = routePaths.findIndex(p => p.path.length === 0);

        let routeDistance = 0, legDistances = [], legRoutes = [];

        if (errorIndex !== -1) {

            for (let i = 0; i < errorIndex; i++) {

                for (let j = 0; j < routePaths[i].legs.length; j++) {

                    legDistances.push(routePaths[i].legs[j].distance.value);

                    routeDistance += routePaths[i].legs[j].distance.value;

                    const path = routePaths[i].legs[j].steps.reduce(pathReducer, []);

                    if (path.length > 1) {
                        legRoutes.push(turf.lineString(path.map(step => [step.lng(), step.lat()])));
                    } else {
                        legRoutes.push(undefined);
                    }
                }
            }

            // routeObj.route.fields.path = routePaths.slice(0, errorIndex).reduce((acc, cur) => acc.concat(cur.slice(acc.length === 0 ? 0 : 1)), []);
            routeObj.route.fields.path = routePaths.slice(0, errorIndex).reduce(pathReducer, []);

            yield ReduxSaga.effects.put(ROUTE_GET_SUCCEEDED_ACTION(routeObj));

            const restRouteChunks = routeChunks.slice(errorIndex);

            for (let restRouteChunk of restRouteChunks) {

                yield ReduxSaga.effects.delay(1000);

                const restPath = yield ReduxSaga.effects.call(GoogleMapsAPI.getRoute, restRouteChunk);

                for (let j = 0; j < restPath.legs.length; j++) {

                    legDistances.push(restPath.legs[j].distance.value);

                    routeDistance += restPath.legs[j].distance.value;

                    const path = restPath.legs[j].steps.reduce(pathReducer, []);

                    if (path.length > 1) {
                        legRoutes.push(turf.lineString(path.map(step => [step.lng(), step.lat()])));
                    } else {
                        legRoutes.push(undefined);
                    }
                }

                yield ReduxSaga.effects.put(ROUTE_GET_CHUNK_SUCCEEDED_ACTION(restPath.path));
            }

        } else {

            for (let i = 0; i < routePaths.length; i++) {

                for (let j = 0; j < routePaths[i].legs.length; j++) {

                    legDistances.push(routePaths[i].legs[j].distance.value);

                    routeDistance += routePaths[i].legs[j].distance.value;

                    const path = routePaths[i].legs[j].steps.reduce(pathReducer, []);

                    if (path.length > 1) {
                        legRoutes.push(turf.lineString(path.map(step => [step.lng(), step.lat()])));
                    } else {
                        legRoutes.push(undefined);
                    }
                }
            }

            routeObj.route.fields.path = routePaths.reduce((acc, cur) => acc.concat(cur.path.slice(acc.length === 0 ? 0 : 1)), []);

            yield ReduxSaga.effects.put(ROUTE_GET_SUCCEEDED_ACTION(routeObj));
        }

        yield ReduxSaga.effects.put(ROUTE_GET_FINISHED_ACTION({routeDistance, legDistances, legRoutes}));

    } catch (error) {

        yield ReduxSaga.effects.put(ROUTE_GET_FAILED_ACTION(error.message));

        yield showErrorMessage();
    }
}

function* startDrivingRoute(action) {
    try {
        const map = yield ReduxSaga.effects.select(selectMap);
        const rotation = yield ReduxSaga.effects.select(selectDeviceRotation);
        const address = yield ReduxSaga.effects.call(GoogleMapsAPI.getAddress, map.geoPosition.lat, map.geoPosition.lng);
        const response = yield ReduxSaga.effects.call(Backend.startDrivingRoute, action.payload, map.geoPosition.lat, map.geoPosition.lng, address, rotation);
        yield ReduxSaga.effects.put(ROUTE_START_DRIVING_ACTION(response.id));
    } catch (error) {
        Logger.error(error);
    }
}

function updateDrivingRouteTimer() {
    return ReduxSaga.eventChannel(emitter => {
            const iv = setInterval(() => {
                emitter();
            }, framework.config.app.sendingDriverPositionIntervalInSeconds * 1000);
            return () => {
                clearInterval(iv)
            }
        }
    )
}

function updateDrivingRouteClientTimer() {
    return ReduxSaga.eventChannel(emitter => {
            const iv = setInterval(() => {
                emitter();
            }, framework.config.app.sendingDriverPositionClientIntervalInSeconds * 1000);
            return () => {
                clearInterval(iv)
            }
        }
    )
}

function* updateDrivingRoute() {
    const channel = yield ReduxSaga.effects.call(updateDrivingRouteTimer);
    try {
        while (true) {
            Logger.log("updateDrivingRoute: backend api call");
            yield ReduxSaga.effects.take(channel);
            const route = yield ReduxSaga.effects.select(selectRoute);
            const map = yield ReduxSaga.effects.select(selectMap);
            const rotation = yield ReduxSaga.effects.select(selectDeviceRotation);
            const address = yield ReduxSaga.effects.call(GoogleMapsAPI.getAddress, map.geoPosition.lat, map.geoPosition.lng);
            const routePercentageCompleted = calculateRoutePercentageCompleted(map.geoPosition, route.drivenRoute.points, route.drivenRoute.pointsVisited, route.drivenRoute.percentages, route.drivenRoute.legRoutes);
            yield ReduxSaga.effects.call(Backend.updateDrivingRoute, route.drivenRoute.drivenId, map.geoPosition.lat, map.geoPosition.lng, address, routePercentageCompleted, rotation, false);
        }
    } catch (error) {
        Logger.error(error);
    } finally {
        if (yield ReduxSaga.effects.cancelled()) {
            channel.close();
        }
    }
}

function* updateDrivingRouteClient() {
    // console.log("updateDrivingRouteClient");
    const channel = yield ReduxSaga.effects.call(updateDrivingRouteClientTimer);
    try {
        while (true) {
            Logger.log("updateDrivingRouteClient: clientbroadcast");
            yield ReduxSaga.effects.take(channel);
            const route = yield ReduxSaga.effects.select(selectRoute);
            const map = yield ReduxSaga.effects.select(selectMap);
            const rotation = yield ReduxSaga.effects.select(selectDeviceRotation);
            const routePercentageCompleted = calculateRoutePercentageCompleted(map.geoPosition, route.drivenRoute.points, route.drivenRoute.pointsVisited, route.drivenRoute.percentages, route.drivenRoute.legRoutes);
            framework.backend.clientbroadcast("GetRoutesBeingDrivenData_" + framework.config.companyId, {
                routeDrivenId: route.drivenRoute.drivenId,
                lat: map.geoPosition.lat,
                lng: map.geoPosition.lng,
                routePercentageCompleted: routePercentageCompleted,
                rotation,
            });
        }
    } catch (error) {
        Logger.error(error);
    } finally {
        if (yield ReduxSaga.effects.cancelled()) {
            channel.close();
        }
    }
}

function* closeRoute() {
    try {
        const route = yield ReduxSaga.effects.select(selectRoute);
        if (route.drivenRoute && route.drivenRoute.drivenId !== 0) {
            const route = yield ReduxSaga.effects.select(selectRoute);
            const map = yield ReduxSaga.effects.select(selectMap);
            const rotation = yield ReduxSaga.effects.select(selectDeviceRotation);
            const address = yield ReduxSaga.effects.call(GoogleMapsAPI.getAddress, map.geoPosition.lat, map.geoPosition.lng);
            const routePercentageCompleted = calculateRoutePercentageCompleted(map.geoPosition, route.drivenRoute.points, route.drivenRoute.pointsVisited, route.drivenRoute.percentages, route.drivenRoute.legRoutes);
            yield ReduxSaga.effects.call(Backend.updateDrivingRoute, route.drivenRoute.drivenId, map.geoPosition.lat, map.geoPosition.lng, address, routePercentageCompleted, rotation, true);
            yield ReduxSaga.effects.put(ROUTE_STOP_ACTION());
        }
    } catch (error) {
        Logger.error(error);
    }
}

function* routeSaga() {
    yield ReduxSaga.effects.takeLatest(MAP_GEOPOSITION_CHANGED_ACTION, checkRoutePointVisited);
    yield ReduxSaga.effects.takeLatest(ROUTE_RECORD_STOP_ACTION, reorderRoute);
    yield ReduxSaga.effects.takeLatest(ROUTE_GO_BACK_ACTION, closeRoute);
    yield ReduxSaga.effects.takeLatest(ROUTE_SHOW_HISTORY_ACTION, getRouteHistory);
    yield ReduxSaga.effects.takeLatest(ROUTE_START_ACTION, startDrivingRoute);
    while (yield ReduxSaga.effects.take(ROUTE_START_ACTION)) {
        const bgSyncTask1 = yield ReduxSaga.effects.fork(updateDrivingRoute);
        const bgSyncTask2 = yield ReduxSaga.effects.fork(updateDrivingRouteClient);
        yield ReduxSaga.effects.race({
            task1: ReduxSaga.effects.take(ROUTE_GO_BACK_ACTION),
            task2: ReduxSaga.effects.take(USER_LOGOUT_ACTION),
        })
        yield ReduxSaga.effects.cancel(bgSyncTask1);
        yield ReduxSaga.effects.cancel(bgSyncTask2);
    }
}

function* getRouteSaga() {
    while (true) {
        const action = yield ReduxSaga.effects.take(ROUTE_GET_STARTED_ACTION, getRoute);
        const getRouteTask = yield ReduxSaga.effects.fork(getRoute, action);
        yield ReduxSaga.effects.race({
            task1: ReduxSaga.effects.take(ROUTE_CANCEL_ACTION),
            task2: ReduxSaga.effects.take(ROUTE_CLOSE_ACTION),
            task3: ReduxSaga.effects.take(ROUTE_REORDER_SUCCEEDED_ACTION),
            task4: ReduxSaga.effects.take(ROUTE_REORDER_FAILED_ACTION)
        })
        yield ReduxSaga.effects.cancel(getRouteTask);
    }
}
