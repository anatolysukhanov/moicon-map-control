const SELECTED_ROUTE_POLYLINE_OPTIONS = {
    clickable: false,
    strokeColor: "#FFCC33",
    strokeOpacity: 0.9,
    strokeWeight: 11
};

class ReactReduxMapDrivenRoute extends React.PureComponent {

    componentDidUpdate = prevProps => {
        if (this.props.drivenRoute.points.length !== prevProps.drivenRoute.points.length && this.props.drivenRoute.points.length > 0) {
            let bounds = new google.maps.LatLngBounds();
            for (let point of this.props.drivenRoute.points) {
                bounds.extend(point);
            }
            this.props.reactMap.fitBounds(bounds);
        }
    }

    render = () => {
        const {drivenRoute} = this.props;
        return (
            <>
                <ReactReduxMapDrivenRoutePoints points={drivenRoute.points}/>
                <ReactReduxMapDrivenRoutePath path={drivenRoute.path}/>
            </>
        );
    };
}
