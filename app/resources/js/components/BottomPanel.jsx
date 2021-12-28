class ReactReduxMapBottomPanel extends React.Component {

    clickRoutes = () => {
        this.props.dispatch(ROUTES_PANEL_TOGGLE_ACTION());
    }

    clickReports = () => {
        this.props.dispatch(REPORTS_PANEL_TOGGLE_ACTION());
    }

    createReport = () => {
        this.props.dispatch(REPORTS_CREATE_START_ACTION({
            geoPosition: this.props.geoPosition,
            points: this.props.route.drivenRoute.points
        }));
    }

    render = () => {
        const {
            dispatch, routes, route, user, canReportProblem, addNoteForm, panelReports, addReportForm
        } = this.props;

        return (
            <>
                {
                    canReportProblem ? (
                        <div className="map-bottom-container">
                            <div className="map-bottom">
                                <div className="map-bottom-button-container">
                                    <div className="map-bottom-button-image map-bottom-button-image-report" onClick={this.createReport}></div>
                                    <div className="map-bottom-button-text"><Translation id="Report problem"/></div>
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className="map-bottom-container">
                            <div className="map-bottom">
                                <div className="map-bottom-button-container">
                                    <div className="map-bottom-button-image map-bottom-button-image-routes" onClick={this.clickRoutes}></div>
                                    <div className="map-bottom-button-text"><Translation id="Routes"/></div>
                                </div>
                                {
                                    /*<div className="map-bottom-button-container">
                                        <div className="map-bottom-button-image map-bottom-button-image-note"></div>
                                        <div className="map-bottom-button-text"><Translation id="Leave note"/></div>
                                    </div>*/
                                }
                                <div className="map-bottom-button-container">
                                    <div className="map-bottom-button-image map-bottom-button-image-reports" onClick={this.clickReports}></div>
                                    <div className="map-bottom-button-text"><Translation id="Reports"/></div>
                                </div>
                            </div>
                        </div>
                    )
                }
                <ReactReduxReports dispatch={dispatch} isOpen={panelReports.isOpen} reportsByDay={panelReports.reports} searchTerm={panelReports.searchTerm} day={panelReports.day}/>
                {
                    addReportForm.isActive && (
                        <ReactReduxCreateReport dispatch={dispatch} step={addReportForm.step} report={addReportForm.report}/>
                    )
                }
                <ReactReduxRoutes dispatch={dispatch} routes={routes} route={route} user={user}/>
                <ReactReduxCreateNote dispatch={dispatch} isOpen={addNoteForm.isOpen} note={addNoteForm.note}/>
            </>
        );
    };
}
