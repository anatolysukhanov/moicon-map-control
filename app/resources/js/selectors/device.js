const selectDevice = state => state.device;

const selectDeviceRotation = Redux.createSelector(
    selectDevice,
    device => device.rotation,
);

const selectDevicePosition = Redux.createSelector(
    selectDevice,
    device => device.position,
);
