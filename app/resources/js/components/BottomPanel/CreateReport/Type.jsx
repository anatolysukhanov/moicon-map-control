class ReactReduxCreateReportType extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            selectedType: props.type !== -1 ? props.type : -1
        }
    }

    closeReport = () => {
        this.props.dispatch(REPORTS_CREATE_STOP_ACTION());
    }

    selectType = (type) => {
        this.setState({
            selectedType: type
        });
    }

    moveNext = () => {
        this.props.dispatch(REPORTS_CREATE_NEXT_ACTION({
            type: this.state.selectedType
        }));
    }

    cancelReport = () => {
        this.props.dispatch(REPORTS_CREATE_STOP_ACTION());
    }

    render = () => {
        const {selectedType} = this.state;
        return (
            <div className="report-create-container">
                <div className="report-create-type-panel">
                    <div className="report-create-close-btn" onClick={this.closeReport}/>
                    <div className="report-create-photo"><img src={this.props.image}/></div>
                    <div className="report-create-type-title"><Translation id="Select type"/></div>
                    <div className="report-create-types">
                        {
                            REPORT_TYPES.map((type, i) =>
                                <div key={i} className={i === selectedType ? "report-create-types-type report-create-types-type-selected" : "report-create-types-type"}>
                                    <img src={framework.resource("/img/report-create-type-" + i + ".png")} onClick={() => this.selectType(i)}/>
                                    <div className="report-create-types-type-title"><Translation id={type}/></div>
                                </div>)
                        }
                    </div>
                    <div className="report-create-type-buttons">
                        <div className={selectedType !== undefined ? "report-create-type-button" : "report-create-type-button disabled"} onClick={this.moveNext}>
                            <div className={selectedType !== undefined ? "report-create-button-text" : "report-create-button-text disabled"}><Translation id="OK"/></div>
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
