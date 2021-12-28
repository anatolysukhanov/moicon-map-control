class ReactReduxComments extends React.Component {

    closeComments = () => {
        this.props.dispatch(COMMENTS_TOGGLE_ACTION());
    }

    render = () => {
        const {report} = this.props;
        return (
            <div className="comments-container">
                <div className="comments-panel">
                    <div className="comments-report">
                        <div className="comments-report-type-image"><img src={framework.resource("/img/report-type-" + report.type + ".png")}/></div>
                        <div className="comments-report-type"><Translation id={REPORT_TYPES[report.type]}/></div>
                        <div className="comments-report-location">
                            <div className="comments-report-location-image"><img src={framework.resource("/img/position.png")}/></div>
                            <div className="comments-report-location-text">{report.address}</div>
                        </div>
                        <div className="comments-report-date"><Translation id="Reported {{_param.date}}" data={{date: checkDateTranslated(formatDate(report.creationDate))}}/></div>
                        <div className="comments-report-description">{report.description}</div>
                    </div>
                    <div className="comments-content-title"><Translation id="Comments"/></div>
                    <div className="comments-content">
                        <div className="comments">
                            {
                                report.comments && report.comments.map((comment, key) => (
                                    <ReactReduxComment key={key} comment={comment}/>
                                ))
                            }
                        </div>
                    </div>
                    <div className="comments-footer">
                        <div className="comments-message-input">
                            <input type="text" {...framework.react.translateAttribute("placeholder", "Leave message here")} className="comments-message-input-text"/>
                        </div>
                    </div>
                </div>
                <div className="comments-image">
                    <img className="comments-image-div" src={(report.imageUrl ? report.imageUrl : framework.resource("/img/new-report-big.png"))}/>
                    <div className="comments-close-btn" onClick={this.closeComments}/>
                </div>
            </div>
        );
    };
}
