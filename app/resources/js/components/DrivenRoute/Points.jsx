class ReactReduxMapDrivenRoutePoints extends React.PureComponent {

    render = () => {
        const {points} = this.props;
        return (
            <>
                {
                    points.map((point, key) => (
                        <reactGoogleMapsApi.Marker
                            key={key}
                            position={{
                                lat: point.lat,
                                lng: point.lng,
                            }}
                            clickable={false}
                            icon={point.visited ? {
                                url: framework.resource("/img/route-point-visited.png"),
                            } : {
                                url: framework.resource("/img/route-point.png"),
                            }}
                            zIndex={1}
                        />
                    ))
                }
            </>
        );
    };
}
