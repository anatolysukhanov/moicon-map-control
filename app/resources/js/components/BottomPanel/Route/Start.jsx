class ReactReduxRouteStart extends React.Component {

    startRoute = () => {
        this.props.dispatch(ROUTE_START_ACTION(this.props.route.drivenRoute.id));
    }

    cancelRoute = () => {
        this.props.dispatch(ROUTE_CANCEL_ACTION(this.props.route.drivenRoute.id));
    }

    recordRoute = () => {
        this.props.dispatch(ROUTE_RECORD_CLICKED_ACTION());
    }

    handleCloseRoute = () => {
        this.props.dispatch(ROUTE_CLOSE_ACTION(this.props.route.drivenRoute.id));
    }

    showHistory = () => {
        this.props.dispatch(ROUTE_SHOW_HISTORY_ACTION(this.props.route.drivenRoute.id));
    }

    render = () => {
        const {
            user, route: {
                isStartPanelOpen,
                drivenRoute
            }
        } = this.props;
        let routeStartClass = "route-start";
        if (isStartPanelOpen) {
            routeStartClass += " route-start-expanded";
        }
        return (
            <div className="route-start-container">
                <div className={routeStartClass}>
                    <div className="route-start-info">
                        <div className="route-start-distance">
                            <div className="route-start-distance-value">{drivenRoute && drivenRoute.name}</div>
                            <div className="route-start-distance-unit"/>
                        </div>
                        <div className="route-start-route">
                            <div className="route-start-from-to">
                                {drivenRoute && drivenRoute.startAddress}&nbsp;<img src={framework.resource("/img/location-arrow.png")}/>&nbsp;{drivenRoute && drivenRoute.endAddress}
                            </div>
                            {
                                drivenRoute &&
                                (
                                    <div className="route-start-description">{drivenRoute.totalLengthKm} <Translation id="points"/></div>
                                )
                            }
                        </div>
                        <div className="route-start-close-button" onClick={this.handleCloseRoute}/>
                    </div>
                    {
                        user.isDriver ? <div className="route-start-buttons three-buttons">
                            <div className="route-start-start-button" onClick={this.startRoute}>
                                <div className="route-start-start-button-content">
                                    <div className="route-start-start-button-arrow"/>
                                    <div className="route-start-button-text"><Translation id="Start"/></div>
                                </div>
                            </div>
                            <div className="route-start-cancel-button" onClick={this.cancelRoute}>
                                <div className="route-start-cancel-button-content">
                                    <div className="route-start-button-text"><Translation id="Cancel"/></div>
                                </div>
                            </div>
                            <div className="route-start-record-button" onClick={this.recordRoute}>
                                <div className="route-start-record-button-content">
                                    <div className="route-start-record-button-circle"/>
                                    <div className="route-start-button-text"><Translation id="Record"/></div>
                                </div>
                            </div>
                        </div> : <div className="route-start-buttons two-buttons">
                            <div className="route-start-history-button" onClick={this.showHistory}>
                                <div className="route-start-history-button-content">
                                    <div className="route-start-button-text"><Translation id="Route history"/></div>
                                </div>
                            </div>
                            <div className="route-start-cancel-button" onClick={this.cancelRoute}>
                                <div className="route-start-cancel-button-content">
                                    <div className="route-start-button-text"><Translation id="Cancel"/></div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
}
