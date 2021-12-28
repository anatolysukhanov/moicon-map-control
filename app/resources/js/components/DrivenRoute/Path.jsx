const SELECTED_ROUTE_POLYLINE_OPTIONS = {
    clickable: false,
    strokeColor: "#FFCC33",
    strokeOpacity: 0.9,
    strokeWeight: 11
};

class ReactReduxMapDrivenRoutePath extends React.PureComponent {

    render = () => {
        const {path} = this.props;
        return (
            <reactGoogleMapsApi.Polyline
                path={path}
                options={SELECTED_ROUTE_POLYLINE_OPTIONS}
            />
        );
    };
}
