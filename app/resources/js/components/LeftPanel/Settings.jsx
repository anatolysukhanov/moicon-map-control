class ReactReduxMapSettings extends React.Component {

    closeSettings = () => {
        this.props.dispatch(SETTINGS_PANEL_TOGGLE_ACTION());
    }

    toggleRoadNames = (e) => {
        this.props.dispatch(SETTINGS_ROAD_NAMES_TOGGLE_ACTION(e.target.checked));
    }

    toggleNotes = (e) => {
        this.props.dispatch(SETTINGS_MESSAGES_TOGGLE_ACTION(e.target.checked));
    }

    toggleOtherTrucks = (e) => {
        this.props.dispatch(SETTINGS_OTHER_TRUCKS_TOGGLE_ACTION(e.target.checked));
    }

    render = () => {
        const {settings, user} = this.props;
        const settingsClass = settings.isOpen ? "settings expanded" : "settings";
        return (
            <div className={settingsClass}>
                <div className="grid-table">
                    <div className="title"><Translation id="Map layers"/></div>
                    <div className="close-button" onClick={this.closeSettings}/>
                    <div className="subtitle"><Translation id="Show on the map"/></div>
                    <div className="road-names">
                        <div className="item">
                            <div className="toggle">
                                <input type="checkbox" id="road-names" className="checkbox" onChange={this.toggleRoadNames} defaultChecked={settings.isRoadNamesChecked}/>
                                <label htmlFor="road-names" className="switch"/>
                            </div>
                            <div className="label"><Translation id="Road names"/></div>
                        </div>
                    </div>
                    <div className="messages">
                        <div className="item">
                            <div className="toggle">
                                <input type="checkbox" id="messages" className="checkbox" onChange={this.toggleNotes} defaultChecked={settings.isNotesChecked}/>
                                <label htmlFor="messages" className="switch"/>
                            </div>
                            <div className="label"><Translation id="Notes"/></div>
                        </div>
                    </div>
                    {
                        user.isDriver &&
                        <div className="other-trucks">
                            <div className="item">
                                <div className="toggle">
                                    <input type="checkbox" id="other-trucks" className="checkbox" onChange={this.toggleOtherTrucks} defaultChecked={settings.isOtherTrucksChecked}/>
                                    <label htmlFor="other-trucks" className="switch"/>
                                </div>
                                <div className="label"><Translation id="Other trucks"/></div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        );
    };
}
