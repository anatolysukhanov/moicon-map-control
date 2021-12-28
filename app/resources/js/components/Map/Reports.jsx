const ReportInfoWindowStyles = () => {
    return (
        <style type="text/css">
            {`
                .gm-style .gm-style-iw {
                    background: #FFFFFF !important;
                    box-shadow: 0px -8px 60px rgba(13, 15, 17, 0.15);
                    border-radius: 0px;
                }

                .gm-style .gm-style-iw-c {
                    overflow: visible !important;
                    padding: 0px !important;
                }

                .gm-style .gm-style-iw {
                    overflow: visible !important;
                }

                .gm-style-iw > button > img {
                    display: none !important;
                }

                .gm-style-iw > button {
                    opacity: 1 !important;
                    top: 6px !important;
                    right: 6px !important;
                    width: 38px !important;
                    height: 38px !important;
                    background: url("${framework.resource("/img/btn-comments-close.png")}") no-repeat !important;
                }

                .gm-style-iw > button:hover {
                    background: url("${framework.resource("/img/btn-close-hover.png")}") no-repeat !important;
                }

                .gm-style-iw-d {
                    overflow: hidden !important;
                }
            `}
        </style>
    )
}

class ReactReduxMapReports extends React.Component {

    showMore = () => {
        this.props.dispatch(COMMENTS_TOGGLE_ACTION({...this.props.clickedReport}));
    }

    render = () => {
        const {dispatch, reports, clickedReport} = this.props;
        return (
            <>
                {
                    reports.reverse().map(report => (
                        <reactGoogleMapsApi.Marker
                            key={report.id}
                            position={{
                                lat: report.lat,
                                lng: report.lng,
                            }}
                            clickable={true}
                            icon={{
                                url: framework.resource("/img/report-type-" + report.type + ".png"),
                                anchor: new google.maps.Point(24, 24),
                            }}
                            onClick={marker => {
                                dispatch(REPORT_CLICKED_ACTION(report.id));
                            }}
                        />))
                }
                {
                    clickedReport && (
                        <>
                            <ReportInfoWindowStyles/>
                            <reactGoogleMapsApi.InfoWindow
                                position={{
                                    lat: clickedReport.lat,
                                    lng: clickedReport.lng,
                                }}
                                onCloseClick={() => {
                                    dispatch(REPORT_CLOSE_ACTION());
                                }}
                                options={{
                                    pixelOffset: new google.maps.Size(-5, -30)
                                }}
                            >
                                <div className="infowindow-report">
                                    <div className="infowindow-report-image">
                                        <img src={clickedReport.imageThumbnailUrl ? clickedReport.imageThumbnailUrl : framework.resource("/img/no-thumbnail.png")}/>
                                    </div>
                                    <div className="infowindow-report-details">
                                        <div className="infowindow-report-type-image"><img src={framework.resource("/img/report-type-" + clickedReport.type + ".png")}/></div>
                                        <div className="infowindow-report-info">
                                            <div className="infowindow-report-type"><Translation id={REPORT_TYPES[clickedReport.type]}/></div>
                                            <div className="infowindow-report-address">{clickedReport.address ? clickedReport.address : clickedReport.lat + "/" + clickedReport.lng}</div>
                                        </div>
                                        <div className="report-show-more" onClick={this.showMore}>
                                            <div className="report-show-more-content">
                                                <div className="report-show-more-text"><Translation id="Show more"/></div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </reactGoogleMapsApi.InfoWindow>
                        </>)
                }

            </>
        );
    };
}
