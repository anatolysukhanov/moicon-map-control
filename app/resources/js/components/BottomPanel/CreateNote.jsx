class ReactReduxCreateNote extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            lat: undefined,
            lng: undefined,
            address: "",
            message: "",
            expirationDate: ""
        }
        this.autocompleteInput = React.createRef();
        this.autocomplete = null;
        this.handlePlaceChanged = this.handlePlaceChanged.bind(this);
    }

    componentDidMount() {
        this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current, {"types": ["address"]});
        this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
    }

    componentDidUpdate = prevProps => {
        if (this.props.isOpen === false && this.props.isOpen !== prevProps.isOpen) {
            this.setState({
                lat: undefined,
                lng: undefined,
                message: "",
                expirationDate: ""
            });
            this.autocompleteInput.current.value = "";
        }
    }

    handlePlaceChanged() {
        const place = this.autocomplete.getPlace();
        this.setState({
            address: place.formatted_address,
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng()
        });
    }

    handleTextareaChange = message => {
        this.setState({
            message
        });
    }

    handleInputChange = evt => {
        this.setState({
            expirationDate: evt.target.value
        });
    }

    addNote = () => {
        this.props.dispatch(NOTE_CREATE_SAVE_ACTION({
            ...this.state.lat !== undefined && {
                lat: this.state.lat, lng: this.state.lng, address: this.state.address
            },
            message: this.state.message,
            expirationDate: this.state.expirationDate
        }));
    }

    cancelNote = () => {
        this.props.dispatch(NOTE_CREATE_CANCEL_ACTION());
        this.setState({
            message: "",
            expirationDate: ""
        });
    }

    render = () => {
        const {isOpen, note} = this.props;
        const {lat, lng, message, expirationDate} = this.state;

        let panelClass = "note-create-panel";
        if (isOpen) {
            panelClass += " note-create-panel-expanded";
        }

        return (
            <div className="note-create-container">
                <div className={panelClass}>
                    <div className="note-create-header"><Translation id="Add Note"/></div>
                    <div className="note-create-name"><Translation id="Latitude"/></div>
                    <div className="note-create-value">{lat || note.lat}</div>
                    <div className="note-create-name"><Translation id="Longitude"/></div>
                    <div className="note-create-value">{lng || note.lng}</div>
                    <div className="note-create-name"><Translation id="Address"/></div>
                    <div className="note-create-value-address">
                        <input ref={this.autocompleteInput} id="autocomplete" {...framework.react.translateAttribute("placeholder", "Enter your address")} type="search"/>
                    </div>
                    <div className="note-create-name"><Translation id="Description"/></div>
                    <div className="note-create-value">
                        <textarea onChange={e => {
                            this.handleTextareaChange(e.target.value);
                        }} value={message}/>
                    </div>
                    <div className="note-create-name"><Translation id="Expire Date"/></div>
                    <div className="note-create-value">
                        <input type="date" value={this.state.expirationDate} onChange={evt => this.handleInputChange(evt)}/>
                    </div>
                    <div className="note-create-buttons">
                        {message !== "" && expirationDate !== "" ?
                            <div className="note-create-save-button" onClick={this.addNote}>
                                <div className="note-create-button-content">
                                    <div className="note-create-button-text"><Translation id="Save"/></div>
                                </div>
                            </div>
                            :
                            <div className="note-create-save-button-disabled">
                                <div className="note-create-button-content">
                                    <div className="note-create-button-text-disabled"><Translation id="Save"/></div>
                                </div>
                            </div>
                        }
                        <div className="note-create-cancel-button" onClick={this.cancelNote}>
                            <div className="note-create-button-content">
                                <div className="note-create-button-text"><Translation id="Cancel"/></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
