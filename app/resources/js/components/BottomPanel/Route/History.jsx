class ReactReduxRouteHistory extends React.Component {

    closePanel = () => {
        this.props.dispatch(ROUTE_CLOSE_HISTORY_ACTION());
    }

    render = () => {
        const {
            route: {
                isHistoryPanelOpen,
                drivenRoute,
                drivenData
            }
        } = this.props;

        const routeHistoryClass = isHistoryPanelOpen ? "route-history-panel expanded" : "route-history-panel";

        return (
            <div className="route-history-container">
                <div className={routeHistoryClass}>
                    <div className="route-history-header">
                        <div className="route-history-header-title"><Translation id="Route history"/></div>
                        <div className="route-history-header-close-button" onClick={this.closePanel}/>
                    </div>
                    <div className="route-history-content-container">
                        <div className="route-history-content">
                            <div className="route-history-content-route">
                                <div className="route-history-content-route-name">
                                    <div className="route-history-content-route-name-value">{drivenRoute.name}</div>
                                </div>
                                <div className="route-history-content-route-details">
                                    <div className="route-history-content-route-details-from-to">
                                        {drivenRoute.startAddress}&nbsp;<img src={framework.resource("/img/location-arrow.png")}/>&nbsp;{drivenRoute.endAddress}
                                    </div>
                                    <div className="route-history-content-route-details-distance">{drivenRoute.totalLengthKm} <Translation id="points"/></div>
                                </div>
                            </div>
                            <div className="route-history-content-history">
                                <div className="route-history-content-history-row">
                                    <div className="route-history-content-history-header"><Translation id="Date"/></div>
                                    <div className="route-history-content-history-header"><Translation id="Total time"/></div>
                                    <div className="route-history-content-history-header"><Translation id="Percentage"/></div>
                                    <div className="route-history-content-history-header"><Translation id="Driver name"/></div>
                                </div>
                                {drivenData.map(d =>
                                    (
                                        <div className="route-history-content-history-row" key={d.id}>
                                            <div>{d.startDate}</div>
                                            <div>{d.totalTime}</div>
                                            <div>{d.routePercentageCompleted}</div>
                                            <div>{d.userName}</div>
                                        </div>
                                    )
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
