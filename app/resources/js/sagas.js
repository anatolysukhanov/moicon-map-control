function* rootSaga() {
    yield ReduxSaga.effects.all([
        userSaga(),
        reportSaga(),
        routeSaga(),
        getRouteSaga(),
        noteSaga(),
        mapSaga()
    ])
}