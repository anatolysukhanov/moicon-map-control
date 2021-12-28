class ReactReduxRouteMenu extends React.Component {

    handleCloseRoute = () => {
        this.props.dispatch(ROUTE_MENU_TOGGLE_ACTION());
    }

    render = () => {
        const {isOpen} = this.props;
        let routeClass = "route-menu";
        let routeBackgroundClass = "route-menu-background";
        if (isOpen) {
            routeClass += " expanded";
            routeBackgroundClass += " expanded";
        }
        return (
            <>
                <div className="route-menu-container">
                    <div className={routeBackgroundClass}/>
                    <div className={routeClass}>
                        <div className="route-menu-items">
                            <div className="route-menu-item">
                                <div className="route-menu-edit-button"/>
                            </div>
                            <div className="route-menu-item route-menu-col-2">
                                <Translation id="Edit"/>
                            </div>
                            <div className="route-menu-item">
                                <div className="route-menu-delete-button"/>
                            </div>
                            <div className="route-menu-item route-menu-col-2">
                                <Translation id="Delete"/>
                            </div>
                            <div className="route-menu-item">
                                <div className="route-menu-cancel-button" onClick={this.handleCloseRoute}/>
                            </div>
                            <div className="route-menu-item route-menu-col-2" onClick={this.handleCloseRoute}>
                                <Translation id="Cancel"/>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        );
    };
}
