class ReactReduxCreateReportDescription extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            description: this.props.description
        }
    }

    handleTextareaChange = description => {
        this.setState({
            description
        });
    }

    closeReport = () => {
        this.props.dispatch(REPORTS_CREATE_STOP_ACTION());
    }

    editType = () => {
        this.props.dispatch(REPORTS_CREATE_EDIT_TYPE_ACTION({
            description: this.state.description
        }));
    }

    addReport = () => {
        this.props.dispatch(REPORT_ADD_ACTION(this.state.description));
    }

    cancelReport = () => {
        this.props.dispatch(REPORTS_CREATE_STOP_ACTION());
    }

    render = () => {
        const {type} = this.props;
        const {description} = this.state;
        return (
            <div className="report-create-container">
                <div className="report-create-type-panel">
                    <div className="report-create-close-btn" onClick={this.closeReport}/>
                    <div className="report-create-finish-photo-gradient"/>
                    <div className="report-create-finish-type-icon"><img src={framework.resource("/img/report-type-" + type + ".png")}/></div>
                    <div className="report-create-finish-type-text"><Translation id={REPORT_TYPES[type]}/></div>
                    <div className="report-create-finish-type-edit" onClick={this.editType}>
                        <div className="report-create-pencil"/>
                        <div className="report-create-button-text edit"><Translation id="Edit"/></div>
                    </div>
                    <div className="report-create-photo"><img src={this.props.image}/></div>
                    <div className="report-create-finish-title"><Translation id="Add description (not required)"/></div>
                    <div className="report-create-finish-description">
                        <textarea {...framework.react.translateAttribute('placeholder', 'Describe situation briefly here...')} onChange={e => {
                            this.handleTextareaChange(e.target.value);
                        }} value={description}/>
                    </div>
                    <div className="report-create-type-buttons">
                        <div className="report-create-type-button" onClick={this.addReport}>
                            <div className="report-create-button-text"><Translation id="Add report"/></div>
                        </div>
                        <div className="report-create-type-button report-create-type-cancel-button" onClick={this.cancelReport}>
                            <div className="report-create-button-text"><Translation id="Cancel"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
