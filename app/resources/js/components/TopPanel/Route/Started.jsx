class ReactReduxRouteStarted extends React.Component {

    goBack = () => {
        this.props.dispatch(ROUTE_GO_BACK_ACTION());
    }

    render = () => {
        const {route} = this.props;
        return (
            <div className="route-started-panel">
                <div className="route-started-name">
                    {route && route.name}
                </div>
                <div className="route-started-info">
                    <div className="route-started-info-from-to">{route && route.startAddress}&nbsp;<img src={framework.resource("/img/location-arrow.png")}/>&nbsp;{route && route.endAddress}</div>
                    <div className="route-started-info-status"><Translation id="Route active"/></div>
                </div>
                <div className="route-started-back-button" onClick={this.goBack}>
                    <div className="route-started-back-button-content">
                        <div className="route-started-button-text"><Translation id="Quit"/></div>
                    </div>
                </div>
            </div>
        );
    };
}

