class ReactReduxRouteRecording extends React.Component {

    stopRecording = () => {
        this.props.dispatch(ROUTE_RECORD_STOP_ACTION());
    }

    render = () => {
        const {route} = this.props;
        return (
            <div className="route-recording-panel">
                <div className="route-recording-text"><Translation id="Route recording"/></div>
                <div className="route-recording-stop-button" onClick={this.stopRecording}/>
            </div>
        );
    };
}
