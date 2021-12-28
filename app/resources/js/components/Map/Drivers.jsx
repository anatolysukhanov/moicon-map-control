const ROUTE_POLYLINE_OPTIONS = {
    clickable: false,
    strokeColor: "#626262",
    strokeOpacity: 0.9,
    strokeWeight: 6
};

const DriverInfoWindowStyles = () => {
    return (
        <style type="text/css">
            {`
                .gm-style .gm-style-iw {
                    background-color: #333333 !important;
                    width: 248px;
                    height: 91px;
                    box-shadow: 0px 8px 35px rgba(13, 15, 17, 0.35);
                    border-radius: 14px;
                }
                .gm-style .gm-style-iw-t::after {
                    content: "";
                    position: absolute;
                    height: 20px;
                    width: 20px;
                    left: 0;
                    top: -2px;
                    transform: translate(-50%, -50%) rotate(-45deg);
                    background: #333333;
                    border-radius: 4px;
                    box-shadow: -2px 2px 2px 0 rgba(178, 178, 178, .4);
                }
                .gm-style-iw > button {
                    display: none !important;
                }
                .gm-style-iw-d {
                    overflow: hidden !important;
                }
            `}
        </style>
    )
}

class ReactReduxMapDrivers extends React.Component {
    interval;
    currentRouteStep;
    animationID;
    lastT;

    constructor(props) {
        super(props);
        this.state = {clickedDriverRoute: []};
        this.interval = null;
        this.currentRouteStep = 0;
        this.animationID = null;
        this.lastT = -1;
    }

    updateClickedDriverRoute = () => {
        if (this.currentRouteStep < this.props.clickedDriver.path.length) {
            this.currentRouteStep += framework.config.app.clickedDriverRouteAnimationStep;
            this.setState({
                clickedDriverRoute: this.props.clickedDriver.path.slice(0, this.currentRouteStep)
            });
        } else {
            clearInterval(this.interval);
            this.currentRouteStep = 0;
        }
    }

    updateRotation = t => {
        (() => {
            if (this.lastT < 0) {
                this.lastT = t;
                return;
            }
            const timeMs = ((t - this.lastT) / 1000.0);
            this.lastT = t;
            this.props.dispatch(DRIVERS_ANIMATION_FRAME_ACTION(timeMs));
        })();
        this.animationID = requestAnimationFrame((t) => this.updateRotation(t));
    }

    /*componentDidMount = () => {
        this.animationID = requestAnimationFrame((t) => this.updateRotation(t));
    }*/

    shouldComponentUpdate = (nextProps, nextState) => {
        const {clickedDriverRoute} = this.state;
        const {zoom, isOtherTrucksChecked, user, drivers, clickedDriver} = this.props;
        return nextState.clickedDriverRoute !== clickedDriverRoute ||
            nextProps.zoom !== zoom ||
            nextProps.isOtherTrucksChecked !== isOtherTrucksChecked ||
            nextProps.user !== user ||
            nextProps.drivers !== drivers ||
            nextProps.clickedDriver !== clickedDriver;
    }

    componentDidUpdate = prevProps => {
        const {clickedDriver, drivers} = this.props;
        if (prevProps.clickedDriver !== clickedDriver) {
            if (prevProps.clickedDriver !== undefined && clickedDriver === undefined) {
                this.setState({
                    clickedDriverRoute: []
                });
            } else if (prevProps.clickedDriver !== undefined && clickedDriver !== undefined && (
                prevProps.clickedDriver.path === undefined && clickedDriver.path !== undefined || prevProps.clickedDriver.id !== clickedDriver.id)) {
                this.currentRouteStep = 0;
                this.interval = setInterval(this.updateClickedDriverRoute, 0);
            }
        } else if (prevProps.drivers !== drivers) {
            if (prevProps.drivers.length === 0 && drivers.length > 0) {
                this.animationID = requestAnimationFrame((t) => this.updateRotation(t));
            } else if (prevProps.drivers.length > 0 && drivers.length === 0) {
                cancelAnimationFrame(this.animationID);
                this.animationID = null;
            }
        }
    }

    componentWillUnmount = () => {
        if (this.interval !== null) clearInterval(this.interval);
        if (this.animationID !== null) cancelAnimationFrame(this.animationID);
    }

    render = () => {
        const {clickedDriverRoute} = this.state;
        const {dispatch, zoom, user, drivers, clickedDriver, isOtherTrucksChecked} = this.props;
        const strokeDashArray = clickedDriver ? `${clickedDriver.progress}, 100` : "100, 100";
        const scaledIconSize = (framework.config.app.driverPositionIconSize * 10) / Math.max(7, (30 - zoom));
        return (
            <>
                {
                    clickedDriverRoute.length > 0 && <reactGoogleMapsApi.Polyline
                        path={clickedDriverRoute}
                        options={ROUTE_POLYLINE_OPTIONS}
                    />
                }
                {
                    (!user.isDriver || user.isDriver && isOtherTrucksChecked) && drivers.map(driver => (
                        <reactGoogleMapsApi.Marker
                            key={driver.id}
                            position={driver.position}
                            clickable={true}
                            icon={{
                                url: framework.resource("/img/garbage_truck/" + driver.rotation.toString().padStart(4, "0") + ".png"),
                                // anchor: new google.maps.Point(24, 24),
                                // anchor: new google.maps.Point(72, 72),
                                anchor: new google.maps.Point(scaledIconSize / 2, scaledIconSize / 2),
                                scaledSize: new google.maps.Size(scaledIconSize, scaledIconSize),
                            }}
                            onClick={() =>
                                clickedDriver ? dispatch(DRIVER_CLOSE_ACTION()) : dispatch(DRIVER_CLICK_ACTION(driver))
                            }
                            zIndex={2}
                        />))
                }
                {
                    clickedDriver && (
                        <>
                            <DriverInfoWindowStyles/>
                            <reactGoogleMapsApi.InfoWindow
                                position={clickedDriver.position}
                                onCloseClick={() => {
                                    dispatch(DRIVER_CLOSE_ACTION());
                                }}
                                options={{
                                    pixelOffset: new google.maps.Size(0, -30)
                                }}
                            >
                                <div className="infowindow-driver">
                                    <div className="infowindow-driver-progress">
                                        <div className="infowindow-driver-chart">
                                            <svg viewBox="0 0 36 36" className="infowindow-driver-circular-chart">
                                                <path className="infowindow-driver-circle-bg" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"/>
                                                <path className="infowindow-driver-circle" strokeDasharray={strokeDashArray} d="M18 33.9155 a 15.9155 15.9155 0 0 1 0 -31.831 a 15.9155 15.9155 0 0 1 0 31.831"/>
                                                <text x="18" y="20.35" className="infowindow-driver-percentage">{clickedDriver.progress}%</text>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="infowindow-driver-location"><Translation id="Current Location"/></div>
                                    <div className="infowindow-driver-address">{clickedDriver.address}</div>
                                </div>
                            </reactGoogleMapsApi.InfoWindow>
                        </>)
                }
            </>
        );
    };
}
