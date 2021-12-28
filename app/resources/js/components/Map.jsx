class ReactReduxMap extends React.Component {
    reactMap;

    handleLoad = map => {
        this.reactMap = map;
    };

    handleClick = event => {
        this.props.dispatch(MAP_CLICKED_ACTION({
            lat: event.latLng.lat(),
            lng: event.latLng.lng()
        }));
    }

    handleDragEnd = () => {
        if (this.reactMap) {
            this.props.dispatch(MAP_DRAG_END_ACTION(this.reactMap.getCenter().toJSON()));
        }
    }

    handleZoomChanged = () => {
        if (this.reactMap) {
            this.props.dispatch(MAP_ZOOM_CHANGED_ACTION({
                zoom: this.reactMap.getZoom(),
                center: this.reactMap.getCenter().toJSON()
            }));
        }
    }

    /*shouldComponentUpdate = (nextProps, nextState) => {
        const {zoom, center, settings, user, drivers, clickedDriver} = this.props;
        // const {route} = this.state;
        //return nextState.zoom !== zoom || nextState.route !== route || nextProps.settings !== settings || nextProps.user !== user || nextProps.drivers !== drivers || nextProps.clickedDriver !== clickedDriver;
        return nextProps.zoom !== zoom || nextProps.center !== center;
    }*/

    render() {
        const {
            dispatch, zoom, center, geoPosition, deviceRotation, devicePosition, isShowCurrentLocation, successMessage, errorMessage,
            drivers, isOtherTrucksChecked, routes, route,
            panelReports, mapReports, clickedReport, addReportForm,
            notes, clickedNote, addNoteForm,
            settings, profile, user
        } = this.props;

        const styles =
            settings.isRoadNamesChecked ? [
                {
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off"
                        }
                    ]
                },
                {
                    featureType: "road",
                    stylers: [
                        {
                            visibility: "on"
                        }
                    ]
                }] : [
                {
                    elementType: "labels",
                    stylers: [
                        {
                            visibility: "off"
                        }
                    ]
                }
            ];

        return (
            <div>
                <reactGoogleMapsApi.GoogleMap
                    mapContainerClassName="map"
                    center={center}
                    zoom={zoom}
                    options={{
                        disableDefaultUI: true,
                        styles
                    }}
                    onLoad={this.handleLoad}
                    onZoomChanged={this.handleZoomChanged}
                    {

                        ...(user.isDriver ? {
                            onDragEnd: this.handleDragEnd,
                        } : {
                            onClick: this.handleClick,
                        })
                    }
                >
                    <ReactReduxMapDrivenRoute reactMap={this.reactMap} drivenRoute={route.drivenRoute}/>
                    <ReactReduxMapDrivers
                        dispatch={dispatch}
                        zoom={zoom}
                        user={user}
                        drivers={drivers.data}
                        clickedDriver={drivers.clickedDriver}
                        isOtherTrucksChecked={isOtherTrucksChecked}
                    />
                    {
                        user.isDriver && devicePosition && <ReactReduxMapDevicePosition
                            dispatch={dispatch}
                            zoom={zoom}
                            rotation={deviceRotation}
                            position={devicePosition}
                        />
                    }
                    <ReactReduxMapReports
                        dispatch={dispatch}
                        reports={mapReports}
                        clickedReport={clickedReport}
                    />
                    {
                        settings.isNotesChecked && <ReactReduxMapNotes
                            dispatch={dispatch}
                            notes={notes}
                            clickedNote={clickedNote}
                        />
                    }
                </reactGoogleMapsApi.GoogleMap>
                <div className="map-bottom-white-shadow"/>
                <div className="map-logo"/>
                <ReactReduxMapTopPanel
                    dispatch={dispatch}
                    route={route}
                    user={user}
                    isShowCurrentLocation={isShowCurrentLocation}
                    successMessage={successMessage}
                    errorMessage={errorMessage}/>
                <ReactReduxMapLeftPanel
                    dispatch={dispatch}
                    settings={settings}
                    user={user}
                />
                <ReactReduxMapRightPanel
                    dispatch={dispatch}
                    profile={profile}
                    user={user}
                />
                <ReactReduxMapBottomPanel
                    dispatch={dispatch}
                    routes={routes}
                    route={route}
                    panelReports={panelReports}
                    addReportForm={addReportForm}
                    user={user}
                    addNoteForm={addNoteForm}
                    canReportProblem={route.isStartedPanelOpen || route.isRecording}
                    geoPosition={geoPosition}/>
                {
                }
            </div>
        )
    }
}
