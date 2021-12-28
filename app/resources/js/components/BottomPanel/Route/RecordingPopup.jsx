class ReactReduxRouteRecordingPopup extends React.Component {

    clickYes = () => {
        this.props.dispatch(ROUTE_RECORD_YES_ACTION());
    }

    clickNo = () => {
        this.props.dispatch(ROUTE_RECORD_NO_ACTION());
    }

    render = () => {
        const {isOpen} = this.props;
        let containerClass = "route-recording-popup-container";
        if (isOpen) {
            containerClass += " route-recording-popup-container-expanded";
        }
        return (
            <div className={containerClass}>
                <div className="route-recording-popup-panel">
                    <div className="route-recording-popup-text"><Translation id="Are you sure you want to enter Record mode?"/></div>
                    <div className="route-recording-popup-buttons">
                        <div className="route-recording-popup-yes-btn" onClick={this.clickYes}>
                            <div className="route-recording-popup-yes-btn-content">
                                <div className="route-recording-popup-btn-text"><Translation id="Yes"/></div>
                            </div>
                        </div>
                        <div className="route-recording-popup-no-btn" onClick={this.clickNo}>
                            <div className="route-recording-popup-no-btn-content">
                                <div className="route-recording-popup-btn-text"><Translation id="No"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
