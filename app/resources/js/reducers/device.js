const deviceReducer = Redux.createReducer(
    {
        position: undefined,
        animationPositionFrom: undefined,
        animationPositionTo: undefined,
        animationPositionFractionStep: undefined,
        timestamp: Date.now(),
        speed: -1,

        orientation: 0,
        heading: 0,
        animationHeading: 0,
        animationHeadingTo: 0,
        animationHeadingFrom: 0,
        rotation: 0
    },
    {
        [MAP_GEOPOSITION_CHANGED_ACTION]: (state, action) => {
            state.speed = action.payload.speed;
            if (action.payload.speed !== null && state.speed >= framework.config.app.minimumSpeedForHeading) {
                let heading = action.payload.heading;
                while (heading < 0) heading += 360;
                state.heading = heading;
                state.animationHeadingTo = Math.round(heading) % 360
            }

            const now = Date.now();
            const newPosition = new google.maps.LatLng(action.payload.lat, action.payload.lng);
            if (state.position !== undefined && (state.position.lat() !== action.payload.lat || state.position.lng() !== action.payload.lng)) {
                state.animationPositionFrom = state.position;
                state.animationPositionTo = newPosition;
                const timeDiff = now - state.timestamp;
                state.animationPositionFractionStep = 1 / (framework.config.app.devicePositionAnimationSmoothing * timeDiff / 16.67);
            } else {
                state.position = newPosition;
            }
            state.timestamp = now;
        },
        [DEVICE_ORIENTATION_CHANGED_ACTION]: (state, action) => {
            if (state.speed < framework.config.app.minimumSpeedForHeading) {
                let heading = (action.payload - state.orientation) + state.heading;
                while (heading < 0) heading += 360;
                state.heading = heading;
                state.animationHeadingTo = Math.round(heading) % 360;
            }
            state.orientation = action.payload;
        },
        [DEVICE_POSITION_ANIMATION_FRAME_ACTION]: (state, action) => {
            const headingSmoothing = framework.config.app.headingAnimationSmoothingPerSecond * action.payload;
            const maxHeadingDif = framework.config.app.headingAnimationMaxDegreesPerSecond * action.payload;
            let headingDif = state.animationHeadingTo - state.animationHeadingFrom;
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
            let heading = state.animationHeadingFrom + headingDif;
            while (heading < 0) {
                heading += 360;
            }
            state.animationHeadingFrom = heading % 360;
            heading = Math.round(heading) % 360;
            if (heading !== state.animationHeading) {
                state.animationHeading = heading;
                state.rotation = (Math.round(heading / framework.config.app.headingAnimationDegreeSteps) * framework.config.app.headingAnimationDegreeSteps) % 360;
            }

            if (state.animationPositionFractionStep) {
                const nextPosition = google.maps.geometry.spherical.interpolate(state.animationPositionFrom, state.animationPositionTo, state.animationPositionFractionStep);
                if (state.animationPositionFractionStep >= 1) {
                    state.animationPositionFrom = undefined;
                    state.animationPositionTo = undefined;
                    state.animationPositionFractionStep = undefined;
                } else {
                    state.position = nextPosition;
                    state.animationPositionFrom = nextPosition;
                }
            }
        },
    },
);
