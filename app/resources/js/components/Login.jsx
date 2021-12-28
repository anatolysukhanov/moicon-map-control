class Login extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            password: "",
            usernameError: "",
            passwordError: ""
        }
    }

    handleUsernameChange = username => {
        this.setState({
            ...this.state,
            username
        })
    }

    handlePasswordChange = password => {
        this.setState({
            ...this.state,
            password
        })
    }

    handleLogin = async () => {
        const {username, password} = this.state;
        if (!username && !password) {
            this.setState({
                ...this.state,
                usernameError: "Please enter username",
                passwordError: "Please enter password"
            });
        } else if (!username) {
            this.setState({
                ...this.state,
                usernameError: "Please enter username",
                passwordError: ""
            });
        } else if (!password) {
            this.setState({
                ...this.state,
                usernameError: "",
                passwordError: "Please enter password"
            });
        } else {
            try {
                await Backend.login(username, password);
            } catch (error) {
                if (error.message.includes("invalid password")) {
                    this.setState({
                        ...this.state,
                        usernameError: "",
                        passwordError: "Password incorrect"
                    });
                } else if (error.message.includes("doesn\'t exist")) {
                    this.setState({
                        ...this.state,
                        usernameError: "Account doesn't exist",
                        passwordError: ""
                    });
                } else {
                    Logger.error(error.message);
                }
            }
        }
    }

    render = () => {
        const {username, password, usernameError, passwordError} = this.state;
        return (
            <div className="login-grid-table">
                <div className="horisont-logo"/>
                <div className="login-form-container">
                    <form className="login-form" onSubmit={function(){ Logger.log(this); }}>
                        <div className="login-username">
                            <input type="text" name="username" placeholder="Username" autoComplete="username" className={"login-input-text" + (usernameError ? " error" : "")} value={username} onKeyPress={(e)=>{if(e.key==='Enter'){this.handleLogin();}}} onChange={e => {
                                this.handleUsernameChange(e.target.value)
                            }}/>
                        </div>
                        {usernameError && <div className="login-error-text">{usernameError}</div>}
                        <div className="login-password">
                            <input type="password" name="password" placeholder="Password" autoComplete="current-password" className={"login-input-text" + (passwordError ? " error" : "")} value={password} onKeyPress={(e)=>{if(e.key==='Enter'){this.handleLogin();}}} onChange={e => {
                                this.handlePasswordChange(e.target.value)
                            }}/>
                        </div>
                        {passwordError && <div className="login-error-text">{passwordError}</div>}
                        <div className="login-button" onClick={this.handleLogin}/>
                    </form>
                </div>
                <a className="hiks-logo" href="https://www.hiks.no/" target="_blank"/>
                <a className="moicon-logo" href="http://www.moicon.net/" target="_blank"/>
            </div>
        );
    };
}
