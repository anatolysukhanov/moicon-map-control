const selectMap = state => state.map;

const selectGeoPosition = Redux.createSelector(
    selectMap,
    map => map.geoPosition,
);

const selectZoom = Redux.createSelector(
    selectMap,
    map => map.zoom,
);

const selectCenter = Redux.createSelector(
    selectMap,
    map => map.center,
);

const selectIsMapLoading = Redux.createSelector(
    selectMap,
    map => map.isLoading,
);

const selectSuccessMessage = Redux.createSelector(
    selectMap,
    map => map.successMessage,
);

const selectErrorMessage = Redux.createSelector(
    selectMap,
    map => map.errorMessage,
);

const selectIsShowCurrentLocation = Redux.createSelector(
    selectMap,
    map => map.isShowCurrentLocation,
);