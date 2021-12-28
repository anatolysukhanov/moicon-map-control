class GoogleMapsAPI {

    static getAddress(lat, lng) {
        return new Promise((resolve, reject) => {
            new google.maps.Geocoder().geocode({
                location: {
                    lat,
                    lng
                }
            }, (results, status) => {
                if (status === "OK") {
                    let address = "";
                    const streetAddress = results[0].address_components.filter(c => c.types.includes("street_address"))[0];
                    if (streetAddress !== undefined) {
                        address = streetAddress.short_name;
                    } else {
                        const streetNumber = results[0].address_components.filter(c => c.types.includes("street_number"))[0];
                        const route = results[0].address_components.filter(c => c.types.includes("route"))[0];
                        if (streetNumber !== undefined && route !== undefined) {
                            address = streetNumber.short_name + " " + route.short_name;
                        } else {
                            address = results[0].formatted_address;
                        }
                    }
                    resolve(address);
                } else {
                    resolve("");
                }
            });
        });
    }

    static getRoute(routeChunk) {
        const origin = routeChunk[0].lat + "," + routeChunk[0].lng;
        const destination = routeChunk[routeChunk.length - 1].lat + "," + routeChunk[routeChunk.length - 1].lng;
        return new Promise((resolve, reject) => {
            new google.maps.DirectionsService().route({
                ...routeChunk.length > 2 && {waypoints: routeChunk.slice(1, routeChunk.length - 1).map(w => ({location: w}))},
                origin,
                destination,
                travelMode: "DRIVING"
            }, (response, status) => {
                if (status === "OK") {
                    resolve({
                        path: response.routes[0].overview_path,
                        legs: response.routes[0].legs
                    });
                } else if (status === "OVER_QUERY_LIMIT") {
                    resolve({
                        path: [],
                        legs: []
                    });
                }
            });
        });
    }

    static getDriverRoute(routeChunk) {
        const origin = routeChunk[0].lat + "," + routeChunk[0].lng;
        const destination = routeChunk[routeChunk.length - 1].lat + "," + routeChunk[routeChunk.length - 1].lng;
        return new Promise((resolve, reject) => {
            new google.maps.DirectionsService().route({
                ...routeChunk.length > 2 && {waypoints: routeChunk.slice(1, routeChunk.length - 1).map(w => ({location: w}))},
                origin,
                destination,
                travelMode: "DRIVING"
            }, (response, status) => {
                if (status === "OK") {
                    resolve(response.routes[0].overview_path);
                } else if (status === "OVER_QUERY_LIMIT") {
                    resolve([]);
                }
            });
        });
    }

    static getPath(routeChunks) {
        const promises = routeChunks.map((r, index) => GoogleMapsAPI.getRoute(r, index));
        return Promise.all(promises);
    }

    static getDriverPath(routeChunks) {
        const promises = routeChunks.map((r, index) => GoogleMapsAPI.getDriverRoute(r, index));
        return Promise.all(promises);
    }
}
