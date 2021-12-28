class ReactReduxRoutes extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchTerm: ""
        }
    }

    closePanel = () => {
        this.props.dispatch(ROUTES_PANEL_TOGGLE_ACTION());
    }

    handleSearch = searchTerm => {
        this.setState({searchTerm})
    }

    toggleMenu = () => {
        this.props.dispatch(ROUTE_MENU_TOGGLE_ACTION());
    }

    clickRoute = route => {
        this.props.dispatch(ROUTE_GET_STARTED_ACTION(route.id));
    }

    addNewRoute = () => {
        // TODO: implement add new route functuionality
    }

    render = () => {
        const {dispatch, user, routes, route} = this.props;
        const {searchTerm} = this.state;

        let routesClass = "routes";
        if (routes.isPanelOpen) routesClass += " expanded";

        const filteredRoutes = searchTerm != "" ? routes.data.filter(r => r.name ? r.name.toLowerCase().includes(searchTerm.toLowerCase()) : false) : routes.data;

        return (
            <>
                <div className="routes-container">
                    <div className={routesClass}>
                        <div className="routes-header">
                            <div className="routes-header-title"><Translation id="Routes"/></div>
                            <div className="routes-header-middle">
                                <div className="routes-header-search"><input type="text" {...framework.react.translateAttribute("placeholder", "Search")} value={searchTerm} onChange={e => {
                                    this.handleSearch(e.target.value)
                                }}/></div>
                                {
                                    user.isDriver === false && <div className="routes-header-add-route-button" onClick={this.addNewRoute}>
                                        <div className="routes-header-add-route-button-icon"/>
                                        <div className="routes-header-add-route-button-text"><Translation id="Add new route"/></div>
                                    </div>
                                }
                            </div>
                            <div className="routes-header-close-button" onClick={this.closePanel}/>
                        </div>
                        <div className="routes-content-container">
                            <div className="routes-content">
                                {filteredRoutes.map(route =>
                                    (<div className="routes-route" key={route.id}>
                                        <div className="routes-route-info">
                                            <div className="routes-route-distance" onClick={() => this.clickRoute(route)}>
                                                <div className="routes-route-distance-info">
                                                    <div className="routes-route-distance-value">{route.name}</div>
                                                    {/*<div className="routes-route-distance-unit"></div>*/}
                                                </div>
                                            </div>
                                            <div className="routes-route-details">
                                                <div className="routes-route-details-from_to">{route.startAddress}&nbsp;<img src={framework.resource("/img/location-arrow.png")}/>&nbsp;{route.endAddress}</div>
                                                <div className="routes-route-details-description">{route.totalLengthKm} <Translation id="points"/></div>
                                            </div>
                                            {
                                                user.isDriver === false && <div className="routes-route-action" onClick={this.toggleMenu}/>
                                            }
                                        </div>
                                    </div>)
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <ReactReduxRouteMenu dispatch={dispatch} isOpen={route.isMenuOpen}/>
                <ReactReduxRouteStart dispatch={dispatch} user={user} route={route}/>
                <ReactReduxRouteHistory dispatch={dispatch} route={route}/>
                <ReactReduxRouteRecordingPopup dispatch={dispatch} isOpen={route.isRecordingPopupOpen}/>
            </>
        );
    };
}

/*
<div className="routes-header-add-route-button"/>
 */