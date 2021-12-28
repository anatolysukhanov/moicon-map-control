class ReactReduxCreateReportRhoto extends React.Component {

    closeReport = () => {
        this.props.dispatch(REPORTS_CREATE_STOP_ACTION());
    }

    okPhoto = () => {
        this.props.dispatch(REPORTS_CREATE_PHOTO_OK_ACTION());
    }

    retakePhoto = () => {
        this.props.dispatch(REPORTS_CREATE_RETAKE_ACTION());
    }

    render = () => {
        return (
            <div className="report-create-container">
                <div className="report-create-photo-panel">
                    <div className="report-create-close-btn" onClick={this.closeReport}/>
                    <div className="report-create-photo"><img src={this.props.image}/></div>
                    <div className="report-create-photo-buttons">
                        <div className="report-create-ok-button" onClick={this.okPhoto}>
                            <div className="report-create-ok-button-tick"/>
                            <div className="report-create-button-text"><Translation id="Photo is OK"/></div>
                        </div>
                        <div className="report-create-retake-button" onClick={this.retakePhoto}>
                            <div className="report-create-button-text"><Translation id="Retake"/></div>
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
