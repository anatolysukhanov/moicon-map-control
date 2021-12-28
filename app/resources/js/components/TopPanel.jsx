class ReactReduxMapTopPanel extends React.Component {

    showCurrentLocation = () => {
        this.props.dispatch(MAP_SHOW_CURRENT_LOCATION_ACTION());
    }

    render = () => {
        const {
            dispatch, route: {
                isStartedPanelOpen,
                isRecording,
                drivenRoute
            }, user: {
                isDriver
            },
            isShowCurrentLocation,
            successMessage,
            errorMessage
        } = this.props;
        let containerClass = "map-top-panel-container";
        if (isStartedPanelOpen || isRecording || isShowCurrentLocation || successMessage || errorMessage) {
            containerClass += " expanded";
        }
        return (
            <div className={containerClass}>
                <div className="map-top-panel">
                    {
                        isStartedPanelOpen && <ReactReduxRouteStarted dispatch={dispatch} route={drivenRoute}/>
                    }
                    {
                        isRecording && <ReactReduxRouteRecording dispatch={dispatch}/>
                    }
                    {
                        isDriver && isShowCurrentLocation &&
                        <div className="show-current-location" onClick={this.showCurrentLocation}>
                            <div className="show-current-location-icon"/>
                            <div className="show-current-location-text"><Translation id="Show my current location"/></div>
                        </div>
                    }
                    {
                        successMessage !== "" &&
                        <div className="map-message map-success-message">
                            <div className="map-success-message-icon"/>
                            <div className="map-message-text">{successMessage}</div>
                        </div>
                    }
                    {
                        errorMessage !== "" &&
                        <div className="map-message map-error-message">
                            <div className="map-error-message-icon"/>
                            <div className="map-message-text">{errorMessage}</div>
                        </div>
                    }
                </div>
            </div>
        );
    };
}
