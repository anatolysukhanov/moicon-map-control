class ReactReduxMapRightPanel extends React.Component {

    toggleProfile = () => {
        this.props.dispatch(PROFILE_TOGGLE_ACTION());
    }

    render = () => {
        const {dispatch, profile, user} = this.props;
        return (
            <>
                <div className="map-right-top-panel">
                    <div className="map-right-top-panel-profile">
                        <div className="map-right-top-panel-btn-profile" onClick={this.toggleProfile}/>
                        <div className="map-right-top-panel-profile-letter">{user.initials}</div>
                    </div>
                </div>
                <ReactReduxMapProfile dispatch={dispatch} profile={profile} user={user}/>
            </>
        );
    };
}
