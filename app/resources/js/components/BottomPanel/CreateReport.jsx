class ReactReduxCreateReport extends React.Component {

    render = () => {
        const {step, report, dispatch} = this.props;
        return (
            <>
                <div className="report-create-background"/>
                {step === 1 && <ReactReduxCreateReportCamera dispatch={dispatch}/>}
                {step === 2 && <ReactReduxCreateReportRhoto dispatch={dispatch} image={report.imageThumbnailUrl}/>}
                {step === 3 && <ReactReduxCreateReportType dispatch={dispatch} type={report.type} image={report.imageThumbnailUrl}/>}
                {step === 4 && <ReactReduxCreateReportDescription dispatch={dispatch} type={report.type} description={report.description} image={report.imageThumbnailUrl}/>}
            </>
        );
    };
}
