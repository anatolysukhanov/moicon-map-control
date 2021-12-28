const ReactReduxApp = ReactRedux.connect(state => {
    return {
        // map: selectMap(state),
        zoom: selectZoom(state),
        center: selectCenter(state),
        geoPosition: selectGeoPosition(state),
        deviceRotation: selectDeviceRotation(state),
        devicePosition: selectDevicePosition(state),
        isMapLoading: selectIsMapLoading(state),
        isShowCurrentLocation: selectIsShowCurrentLocation(state),
        successMessage: selectSuccessMessage(state),
        errorMessage: selectErrorMessage(state),

        drivers: selectDrivers(state),
        isOtherTrucksChecked: selectIsOtherTrucksChecked(state),
        routes: selectRoutes(state),
        route: selectRoute(state),

        panelReports: selectPanelReports(state),
        mapReports: selectMapReports(state),
        clickedReport: selectClickedReport(state),
        addReportForm: selectAddReportForm(state),

        notes: selectNotes(state),
        clickedNote: selectClickedNote(state),
        addNoteForm: selectAddNoteForm(state),

        settings: selectSettings(state),
        profile: selectorProfile(state),
        comments: selectComments(state),
        user: selectUser(state),
    };
})(
    class extends React.Component {
        watcher;

        constructor(props) {
            super(props);
            this.watcher = null;
        }

        onGeoChange = ({coords}) => {
            this.props.dispatch(MAP_GEOPOSITION_CHANGED_ACTION({
                lat: coords.latitude, // + (Math.random() - 0.5) / 1000,
                lng: coords.longitude, // + (Math.random() - 0.5) / 1000,
                speed: coords.speed,
                heading: coords.heading
            }));
        }

        onGeoError = (error) => {
        }

        componentDidMount = () => {
            this.props.dispatch(USER_INITIAL_DATA_LOAD_ACTION());
        }

        componentDidUpdate = (prevProps, prevState) => {
            if (prevProps.user.isDriver === undefined && this.props.user.isDriver === true) {
                if (!navigator.geolocation) {
                    // setGeoError('Geolocation is not supported');
                    return;
                }
                this.watcher = navigator.geolocation.watchPosition(this.onGeoChange, this.onGeoError, {
                    enableHighAccuracy: true,
                    timeout: Infinity,
                    maximumAge: 0,
                });
            } else if (prevProps.user.isDriver === undefined && this.props.user.isDriver === false) {
                if (!navigator.geolocation) {
                    // setGeoError('Geolocation is not supported');
                    return;
                }
                navigator.geolocation.getCurrentPosition(this.onGeoChange, this.onGeoError, {
                    enableHighAccuracy: true,
                    timeout: Infinity,
                    maximumAge: 0,
                });
            }
        }

        componentWillUnmount = () => {
            if (this.watcher) navigator.geolocation.clearWatch(this.watcher);
        }

        render = () => {
            const {
                dispatch, zoom, center, geoPosition, deviceRotation, devicePosition, isMapLoading, isShowCurrentLocation, successMessage, errorMessage,
                drivers, isOtherTrucksChecked, routes, route,
                panelReports, mapReports, clickedReport, addReportForm,
                notes, clickedNote, addNoteForm,
                settings, profile, comments, user,
            } = this.props;

            return (
                <>
                    {
                        user.id !== 0 ?
                            <>
                                <ReactReduxMap
                                    dispatch={dispatch}
                                    zoom={zoom}
                                    center={center}
                                    geoPosition={geoPosition}
                                    deviceRotation={deviceRotation}
                                    devicePosition={devicePosition}
                                    isLoading={isMapLoading}
                                    isShowCurrentLocation={isShowCurrentLocation}
                                    successMessage={successMessage}
                                    errorMessage={errorMessage}
                                    position={{}}
                                    drivers={drivers}
                                    isOtherTrucksChecked={isOtherTrucksChecked}
                                    routes={routes}
                                    route={route}
                                    panelReports={panelReports}
                                    mapReports={mapReports}
                                    clickedReport={clickedReport}
                                    addReportForm={addReportForm}
                                    notes={notes}
                                    clickedNote={clickedNote}
                                    addNoteForm={addNoteForm}
                                    settings={settings}
                                    profile={profile}
                                    user={user}
                                />
                                {
                                    isMapLoading &&
                                    (
                                        <div className="loading-container"><img src={framework.resource('/img/loading.gif')} className="loading"/></div>
                                    )
                                }
                                {
                                    comments.isOpen && (
                                        <ReactReduxComments dispatch={dispatch} report={comments.report}/>
                                    )
                                }
                            </>
                            :
                            <>
                                <div className="loading-container"><img src={framework.resource('/img/loading.gif')} className="loading"/></div>
                            </>
                    }
                </>);
        };
    },
);
