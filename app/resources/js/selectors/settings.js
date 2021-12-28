const selectSettings = state => state.settings;

const selectIsOtherTrucksChecked = Redux.createSelector(
    selectSettings,
    settings => settings.isOtherTrucksChecked,
);