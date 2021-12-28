const dataURLtoBlob = dataurl => {
    let arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
    }
    return new Blob([u8arr], {type: mime});
}

class Backend {

    static async call(endpoint, data) {
        return await framework.backend.apiCallWithinStatePromise(endpoint, data);
    }

    /*static async fetchUser() {
        return await Backend.call("GetInitialData", {
            companyId: framework.config.companyId
        });
    }*/

    static async addReport(report) {
        return await Backend.call("AddReport", {
            ...report,
            companyId: framework.config.companyId,
        });
    }

    static async addNote(note) {
        return await Backend.call("AddNote", {
            ...note,
            companyId: framework.config.companyId,
        });
    }

    static async getRoute(routeId) {
        return await Backend.call("GetRoute", {
            companyId: framework.config.companyId,
            routeId
        });
    }

    static async login(username, password) {
        return await Backend.call("Login", {
            username,
            password
        });
    }

    static async reorderRoute(routeId, routePointIds) {
        return await Backend.call("SetRoutePointsOrder", {
            companyId: framework.config.companyId,
            routeId,
            routePointIds
        });
    }

    static async startDrivingRoute(routeId, lat, lng, address, rotation) {
        return await Backend.call("StartDrivingRoute", {
            companyId: framework.config.companyId,
            routeId,
            lat,
            lng,
            address,
            routePercentageCompleted: 0,
            rotation
        });
    }

    static async updateDrivingRoute(routeDrivenId, lat, lng, address, routePercentageCompleted, rotation, hasEnded) {
        return await Backend.call("UpdateDrivingRoute", {
            companyId: framework.config.companyId,
            routeDrivenId,
            lat,
            lng,
            address,
            routePercentageCompleted,
            rotation,
            hasEnded
        });
    }

    static async getRouteDrivenData(routeId) {
        return await Backend.call("GetRouteDrivenData", {
            companyId: framework.config.companyId,
            routeId
        });
    }

    static async generateUploadUrl(name) {
        return await Backend.call("GenerateFileUploadUrl", {
            name
        });
    }

    static uploadImage(url, imageURL) {
        return new Promise((resolve, reject) => {
            framework.backend.uploadFile({
                url,
                data: dataURLtoBlob(imageURL),
                /*onPercentageChanged: (percentage => console.log("% = ", percentage)),*/
                onSuccess: () => {
                    resolve("image uploaded");
                },
                onFail: (res, status, error) => {
                    reject(error);
                },
            });
        });
    }
}
