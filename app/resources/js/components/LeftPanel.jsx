class ReactReduxMapLeftPanel extends React.Component {

    toggleSettings = () => {
        this.props.dispatch(SETTINGS_PANEL_TOGGLE_ACTION());
    }

    zoomIn = () => {
        this.props.dispatch(MAP_ZOOM_IN_ACTION());
    }

    zoomOut = () => {
        this.props.dispatch(MAP_ZOOM_OUT_ACTION());
    }

    render = () => {
        const {dispatch, settings, user} = this.props;
        return (
            <>
                <div className="map-left-top-panel">
                    <div className="map-left-top-panel-btn-settings" onClick={this.toggleSettings}/>
                    <div className="map-left-top-panel-btn-zoom-in" onClick={this.zoomIn}>
                        <img src={framework.resource("/img/plus.png")}/>
                    </div>
                    <div className="map-left-top-panel-btn-zoom-out" onClick={this.zoomOut}>
                        <img src={framework.resource("/img/minus.png")}/>
                    </div>
                </div>
                <ReactReduxMapSettings dispatch={dispatch} settings={settings} user={user}/>
            </>
        );
    };
}
