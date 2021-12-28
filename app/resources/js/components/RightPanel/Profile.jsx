class ReactReduxMapProfile extends React.Component {

    closeProfile = () => {
        this.props.dispatch(PROFILE_TOGGLE_ACTION());
    }

    logout = () => {
        this.props.dispatch(USER_LOGOUT_ACTION());
    }

    render = () => {
        const {user, profile} = this.props;
        let profileClass = 'profile';
        if (profile.isOpen) profileClass += ' expanded';
        return (
            <div className={profileClass}>
                <div className="grid-table">
                    <div className="icon">
                        <div className="ellipse1"/>
                        <div className="ellipse2"/>
                        <div className="text">{user.initials}</div>
                    </div>
                    <div className="title">{user.name}</div>
                    <div className="close-button" onClick={this.closeProfile}/>
                    <div className="subtitle"><Translation id="Account"/></div>
                    <div className="items">
                        <div className="grid-table">
                            <div className="settings-icon"/>
                            <div className="settings-label label"><Translation id="Profile Settings"/></div>
                            <div className="logout-icon"/>
                            <div className="logout-label label" onClick={this.logout}><Translation id="Log Out"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
