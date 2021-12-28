const driversReducer = Redux.createReducer(
    {
        userId: 0,
        data: [],
        clickedDriver: undefined,
    },
    {
        [USER_ID_ACTION]: (state, action) => {
            state.userId = Number(action.payload);
        },
        [DRIVER_CLICK_ACTION]: (state, action) => {
            state.clickedDriver = state.clickedDriver && action.payload.id === state.clickedDriver.id ? undefined : action.payload;
        },
        [DRIVER_GET_ROUTE_FINISHED_ACTION]: (state, action) => {
            state.clickedDriver.path = action.payload;
        },
        [DRIVER_CLOSE_ACTION]: state => {
            state.clickedDriver = undefined;
        },
        [DRIVERS_LOAD_ACTION]: (state, action) => {
            state.data = action.payload.filter(d => d.fields.userId !== state.userId).map(d => {
                return {
                    id: d.id,
                    routeId: d.fields.routeId,
                    position: new google.maps.LatLng(d.fields.lat, d.fields.lng),
                    address: d.fields.address,
                    progress: d.fields.routePercentageCompleted.toFixed(0),
                    timestamp: Date.now(),

                    rotation: d.fields.rotation,
                    heading: d.fields.rotation,
                    animationHeading: d.fields.rotation,
                    animationHeadingFrom: d.fields.rotation,
                    animationHeadingTo: d.fields.rotation,
                }
            });
        },
        [DRIVERS_UPDATE_ACTION]: (state, action) => {
            if (action.payload.fields.userId !== state.userId) {
                const index = state.data.findIndex(d => d.id === action.payload.id);
                const position = new google.maps.LatLng(action.payload.fields.lat, action.payload.fields.lng);
                if (index !== -1) {
                    state.data[index].position = position;
                    state.data[index].address = action.payload.fields.address;
                    state.data[index].progress = action.payload.fields.routePercentageCompleted.toFixed(0);
                    state.data[index].timestamp = Date.now();

                    let heading = (action.payload.fields.rotation - state.data[index].rotation) + state.data[index].heading;
                    while (heading < 0) heading += 360;
                    state.data[index].heading = heading;
                    state.data[index].animationHeadingTo = Math.round(heading) % 360;
                } else {
                    state.data.push({
                        id: action.payload.id,
                        routeId: action.payload.fields.routeId,
                        position,
                        address: action.payload.fields.address,
                        progress: action.payload.fields.routePercentageCompleted.toFixed(0),
                        timestamp: Date.now(),

                        rotation: action.payload.fields.rotation,
                        heading: action.payload.fields.rotation,
                        animationHeading: action.payload.fields.rotation,
                        animationHeadingTo: action.payload.fields.rotation,
                        animationHeadingFrom: action.payload.fields.rotation,
                    })
                }

                if (state.clickedDriver !== undefined && state.clickedDriver.id === action.payload.id) {
                    state.clickedDriver.position = position;
                    state.clickedDriver.address = action.payload.fields.address;
                    state.clickedDriver.progress = action.payload.fields.routePercentageCompleted.toFixed(0);
                }
            }
        },
        [DRIVERS_CLIENT_UPDATE_ACTION]: (state, action) => {
            const index = state.data.findIndex(d => d.id === action.payload.routeDrivenId);
            if (index !== -1) {
                state.data[index].progress = action.payload.routePercentageCompleted.toFixed(0);
                const now = Date.now();
                const newPosition = new google.maps.LatLng(action.payload.lat, action.payload.lng);
                if (state.data[index].position.lat() !== action.payload.lat || state.data[index].position.lng() !== action.payload.lng) {
                    state.data[index].animationPositionFrom = state.data[index].position;
                    state.data[index].animationPositionTo = newPosition;
                    const timeDiff = now - state.data[index].timestamp;
                    state.data[index].animationPositionFractionStep = 1 / (framework.config.app.driversPositionAnimationSmoothing * timeDiff / 16.67);
                } else {
                    state.data[index].position = newPosition;
                }
                state.data[index].timestamp = now;

                let heading = (action.payload.rotation - state.data[index].rotation) + state.data[index].heading;
                while (heading < 0) heading += 360;
                state.data[index].heading = heading;
                state.data[index].animationHeadingTo = Math.round(heading) % 360;

                if (state.clickedDriver !== undefined && state.clickedDriver.id === action.payload.routeDrivenId) {
                    state.clickedDriver.position = newPosition;
                    state.clickedDriver.progress = action.payload.routePercentageCompleted.toFixed(0);
                }
            }
        },
        [DRIVERS_ANIMATION_FRAME_ACTION]: (state, action) => {
            state.data.forEach((item, index) => {
                const headingSmoothing = framework.config.app.headingAnimationSmoothingPerSecond * action.payload;
                const maxHeadingDif = framework.config.app.headingAnimationMaxDegreesPerSecond * action.payload;
                let headingDif = item.animationHeadingTo - item.animationHeadingFrom;
                if (headingDif <= -180) {
                    headingDif += 360;
                }
                if (headingDif >= 180) {
                    headingDif -= 360;
                }
                headingDif *= headingSmoothing;
                if (headingDif < (0 - maxHeadingDif)) {
                    headingDif = (0 - maxHeadingDif);
                }
                if (headingDif > maxHeadingDif) {
                    headingDif = maxHeadingDif;
                }

                let heading = item.animationHeadingFrom + headingDif;
                while (heading < 0) heading += 360;
                state.data[index].animationHeadingFrom = heading % 360;
                heading = Math.round(heading) % 360;
                if (heading !== item.animationHeading) {
                    state.data[index].animationHeading = heading;
                    state.data[index].rotation = (Math.round(heading / framework.config.app.headingAnimationDegreeSteps) * framework.config.app.headingAnimationDegreeSteps) % 360;
                }

                if (state.data[index].animationPositionFractionStep) {
                    const nextPosition = google.maps.geometry.spherical.interpolate(state.data[index].animationPositionFrom, state.data[index].animationPositionTo, state.data[index].animationPositionFractionStep);
                    if (state.data[index].animationPositionFractionStep >= 1) {
                        state.data[index].animationPositionFrom = undefined;
                        state.data[index].animationPositionTo = undefined;
                        state.data[index].animationPositionFractionStep = undefined;
                    } else {
                        state.data[index].position = nextPosition;
                        state.data[index].animationPositionFrom = nextPosition;
                    }
                }
            });
        },
        [DRIVERS_DELETE_ACTION]: (state, action) => {
            if (action.payload.fields.userId !== state.userId) {
                const index = state.data.findIndex(d => d.id === action.payload.id);
                if (index !== -1) {
                    state.data.splice(index, 1);
                }
                if (state.clickedDriver !== undefined && state.clickedDriver.id === action.payload.id) {
                    state.clickedDriver = undefined;
                }
            }
        },
        [DRIVERS_CHECK_INACTIVE_ACTION]: state => {
            state.data.forEach((item, index) => {
                if (Date.now() - item.timestamp >= framework.config.app.sendingDriverPositionIntervalInSeconds * 2 * 1000) {
                    state.data.splice(index, 1);
                }
            });
        },
        [REPORT_CLICKED_ACTION]: state => {
            state.clickedDriver = undefined;
        },
        [SETTINGS_OTHER_TRUCKS_TOGGLE_ACTION]: (state, action) => {
            if (action.payload === false) {
                state.clickedDriver = undefined;
            }
        }
    },
);
