const selectRoute = Redux.createSelector(
    state => state.route,
    route => ({
        ...route,
        ...(route.drivenRoute && {
            drivenRoute: {
                ...route.drivenRoute,
                points: route.drivenRoute.points.map(point => ({
                    ...point,
                    visited: route.drivenRoute.pointsVisited.includes(point.id)
                }))
            },
        }),
    })
);

const selectRecordingRoutePoints = Redux.createSelector(
    selectRoute,
    route => route.isRecording === true ? route.drivenRoute.points.filter(point => point.visited === false) : undefined
);

const selectNotVisitedRoutePoints = Redux.createSelector(
    selectRoute,
    route => route.isRecording === true || route.isStartedPanelOpen === true ? route.drivenRoute.points.filter(point => point.visited === false) : undefined
);
