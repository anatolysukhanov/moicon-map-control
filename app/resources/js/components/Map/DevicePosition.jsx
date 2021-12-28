class ReactReduxMapDevicePosition extends React.Component {
    fulltilt;
    animationID;
    lastT;

    constructor(props) {
        super(props);
        this.fulltilt = null;
        this.animationID = null;
        this.lastT = -1;
    }

    updateRotation = t => {
        (() => {
            if (this.lastT < 0) {
                this.lastT = t;
                return;
            }
            const timeMs = ((t - this.lastT) / 1000.0);
            this.lastT = t;
            this.props.dispatch(DEVICE_POSITION_ANIMATION_FRAME_ACTION(timeMs));
        })();
        this.animationID = requestAnimationFrame((t) => this.updateRotation(t));
    }

    componentDidMount = () => {
        const deviceOrientation = FULLTILT.getDeviceOrientation({"type": "world"});
        this.interval = deviceOrientation.interval;
        deviceOrientation.promise.then((fulltilt) => {
            this.animationID = requestAnimationFrame((t) => this.updateRotation(t));
            this.fulltilt = fulltilt;
            this.fulltilt.listen(() => {
                this.props.dispatch(DEVICE_ORIENTATION_CHANGED_ACTION(360 - fulltilt.getScreenAdjustedEuler().alpha));
            });
        }).catch((e) => {
            Logger.error("Device orientation not supported:", e);
        });
    }

    componentWillUnmount = () => {
        if (this.fulltilt !== null) this.fulltilt.stop();
        if (this.animationID !== null) cancelAnimationFrame(this.animationID);
        if (this.interval !== null) clearInterval(this.interval);
    }

    render = () => {
        const scaledIconSize = (framework.config.app.driverPositionIconSize * 10) / Math.max(7, (30 - this.props.zoom));
        return (
            <>
                <reactGoogleMapsApi.Marker
                    position={this.props.position}
                    clickable={false}
                    icon={{
                        url: framework.resource("/img/current-position.png"),
                        anchor: new google.maps.Point(scaledIconSize / 2, scaledIconSize / 2),
                        scaledSize: new google.maps.Size(scaledIconSize, scaledIconSize),
                    }}
                    zIndex={1}/>
                <reactGoogleMapsApi.Marker
                    position={this.props.position}
                    clickable={false}
                    icon={{
                        path: 'M0 17L7 0L14 17L7 14.413L0 17Z',
                        fillColor: '#333333',
                        fillOpacity: 1,
                        strokeWeight: 0,
                        anchor: new google.maps.Point(7, 8.5),
                        scale: scaledIconSize / framework.config.app.driverPositionIconSize,
                        rotation: this.props.rotation
                    }}
                    zIndex={2}/>
            </>
        );
    };
}
