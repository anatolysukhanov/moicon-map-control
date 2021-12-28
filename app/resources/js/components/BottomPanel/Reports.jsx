class ReactReduxReports extends React.Component {

    closeReports = () => {
        this.props.dispatch(REPORTS_PANEL_TOGGLE_ACTION());
    }

    handleSearch = searchTerm => {
        this.props.dispatch(REPORTS_SEARCH_ACTION(searchTerm));
    }

    selectDay = (day) => {
        this.props.dispatch(REPORTS_SELECT_DAY_ACTION(day));
    }

    showMore = (report) => {
        this.props.dispatch(COMMENTS_TOGGLE_ACTION({...report}));
    }

    componentDidMount = () => {
        const today = checkDate(formatDate());
        this.props.dispatch(REPORTS_SELECT_DAY_ACTION(today));
    }

    /*openRoute = () => {
        this.props.dispatch(ROUTE_MENU_TOGGLE_ACTION());
    }*/

    render = () => {
        const {isOpen, reportsByDay, searchTerm, day} = this.props;

        let reportsPanelClassName = 'reports-panel';

        if (isOpen) reportsPanelClassName += ' reports-panel-expanded';

        return (
            <div className="reports-container">
                <div className={reportsPanelClassName}>
                    <div className="reports-header">
                        <div className="reports-header-item reports-title"><Translation id="Reports"/></div>
                        <div className="reports-header-item reports-search">
                            <div className="reports-search-input"><input type="text" {...framework.react.translateAttribute("placeholder", "Search")} value={searchTerm} onChange={e => {
                                this.handleSearch(e.target.value)
                            }}/></div>
                            <div className="reports-close-button" onClick={this.closeReports}/>
                        </div>
                    </div>
                    <div className="reports-content-container">
                        <div className="reports-content">
                            {
                                reportsByDay.map((group, key) =>
                                    (
                                        <div key={key} className="report-day">
                                            <div className="report-date">{group.day}</div>
                                            <div className="report-qty"><Translation id="{{_param.amount}} Report(s)" data={{amount: group.reports.length}}/></div>
                                            {
                                                day && group.day === day ?
                                                    <div className="report-info"><Translation id="Currently displayed on the map"/></div> :
                                                    <div className="report-info report-show-on-map" onClick={() => this.selectDay(group.day)}>
                                                        <div className="report-show-on-map-text"><Translation id="Show on the map"/></div>
                                                    </div>
                                            }
                                            <div className="reports">
                                                {
                                                    group.reports.map(report =>
                                                        (<div key={report.id} className="report">
                                                            <div className="report-image">
                                                                <img src={report.imageThumbnailUrl ? report.imageThumbnailUrl : framework.resource("/img/no-thumbnail.png")}/>
                                                            </div>
                                                            <div className="report-details">
                                                                <div className="report-details-type-image"><img src={framework.resource("/img/report-type-" + report.type + ".png")}/></div>
                                                                <div className="report-details-info">
                                                                    <div className="report-type"><Translation id={REPORT_TYPES[report.type]}/></div>
                                                                    <div className="report-address">{report.address ? report.address : report.lat + "/" + report.lng}</div>
                                                                </div>
                                                                <div className="report-show-more" onClick={() => this.showMore(report)}>
                                                                    <div className="report-show-more-content">
                                                                        <div className="report-show-more-text"><Translation id="Show more"/></div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>))
                                                }
                                            </div>
                                        </div>
                                    )
                                )}
                        </div>
                    </div>
                </div>
            </div>
        );
    };
}
