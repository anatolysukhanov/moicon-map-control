const REPORT_TYPES = [
    "Incorrectly Sorted Trash", "Damaged Bin", "Not Accessible Bin", "Other"
];

const REPORTS_CREATE_STEP_PHOTO = "REPORTS_CREATE_STEP_PHOTO";
const REPORTS_CREATE_STEP_TYPE = "REPORTS_CREATE_STEP_TYPE";
const REPORTS_CREATE_STEP_DESCRIPTION = "REPORTS_CREATE_STEP_DESCRIPTION";

const REPORTS_CREATE_STEPS = [REPORTS_CREATE_STEP_PHOTO, REPORTS_CREATE_STEP_TYPE, REPORTS_CREATE_STEP_DESCRIPTION];

const DEFAULT_ADD_REPORT_FORM = {
    isActive: false,
    step: 0,
    report: {
        routeId: undefined,
        pointId: undefined,
        lng: undefined,
        lat: undefined,
        imageUrl: undefined,
        imageThumbnailUrl: undefined,
        type: undefined,
        description: "",
    }
};

const findNearestPoint = ({geoPosition, points}) => {
    let minDistance = Number.POSITIVE_INFINITY, nearestPoint = undefined;
    const geoPositionLatLng = new google.maps.LatLng(geoPosition.lat, geoPosition.lng);
    points.forEach(point => {
        let distance = google.maps.geometry.spherical.computeDistanceBetween(geoPositionLatLng, new google.maps.LatLng(point.lat, point.lng));
        if (distance < minDistance) {
            minDistance = distance;
            // nearestPoint = pointLatLng;
            nearestPoint = point;
        }
    });
    return nearestPoint;
}

const reportsReducer = Redux.createReducer(
    {
        userId: 0,
        panel: {
            isOpen: false,
            searchTerm: "",
            day: "",
        },
        addReportForm: DEFAULT_ADD_REPORT_FORM,
        data: [],
        clickedReportId: 0
    },
    {
        [USER_ID_ACTION]: (state, action) => {
            state.userId = Number(action.payload);
        },
        [USER_INITIAL_DATA_LOADED_ACTION]: (state, action) => {
            state.data = action.payload.reports.map(r => {
                const {
                    point,
                    commentIds,
                    creationDate,
                    ...fields
                } = r.fields;
                return {
                    ...fields,
                    ...point.fields,
                    id: r.id,
                    creationDate
                }
            });
        },
        /* reports panel */
        [REPORTS_PANEL_TOGGLE_ACTION]: state => {
            state.panel.isOpen = !state.panel.isOpen;
        },
        [REPORTS_SEARCH_ACTION]: (state, action) => {
            state.panel.searchTerm = action.payload;
        },
        [REPORTS_SELECT_DAY_ACTION]: (state, action) => {
            state.panel.day = action.payload;
        },
        [ROUTE_GET_SUCCEEDED_ACTION]: (state, action) => {
            state.addReportForm.report.routeId = action.payload.route.id;
        },
        [ROUTE_CANCEL_ACTION]: state => {
            state.addReportForm.report.routeId = undefined;
        },
        [ROUTE_CLOSE_ACTION]: state => {
            state.addReportForm.report.routeId = undefined;
        },
        /* create new report */
        [REPORTS_CREATE_START_ACTION]: (state, action) => {
            state.addReportForm.isActive = true;
            state.addReportForm.step = 1;
            const point = findNearestPoint(action.payload);
            state.addReportForm.report.pointId = point.id;
            state.addReportForm.report.lng = point.lng;
            state.addReportForm.report.lat = point.lat;

        },
        [REPORTS_CREATE_STOP_ACTION]: state => {
            state.addReportForm = {
                ...DEFAULT_ADD_REPORT_FORM,
                report: {
                    ...DEFAULT_ADD_REPORT_FORM.report,
                    routeId: state.addReportForm.report.routeId,
                }
            };
        },
        [REPORTS_CREATE_SAVE_SCREENSHOT_ACTION]: (state, action) => {
            state.addReportForm.report.imageUrl = action.payload.imageUrl;
            state.addReportForm.report.imageThumbnailUrl = action.payload.imageThumbnailUrl;
            state.addReportForm.step++;
        },
        [REPORTS_CREATE_PHOTO_OK_ACTION]: state => {
            state.addReportForm.step++;
        },
        [REPORTS_CREATE_RETAKE_ACTION]: state => {
            state.addReportForm.report.imageUrl = undefined;
            state.addReportForm.report.imageThumbnailUrl = undefined;
            state.addReportForm.step--;
        },
        [REPORTS_CREATE_NEXT_ACTION]: (state, action) => {
            state.addReportForm.report.type = action.payload.type;
            state.addReportForm.step++;
        },
        [REPORTS_CREATE_EDIT_TYPE_ACTION]: (state, action) => {
            state.addReportForm.report.description = action.payload.description;
            state.addReportForm.step--;
        },
        [REPORT_ADD_SUCCEEDED_ACTION]: (state, action) => {
            state.data.push({
                ...state.addReportForm.report,
                id: action.payload
            });
            state.addReportForm = {
                isActive: false,
                step: 0,
                report: {
                    routeId: state.addReportForm.report.routeId,
                    pointId: undefined,
                    lng: undefined,
                    lat: undefined,
                    imageUrl: undefined,
                    imageThumbnailUrl: undefined,
                    type: undefined,
                    description: "",
                }
            };
        },
        [REPORT_ADD_FAILED_ACTION]: (state, action) => {
            Logger.log("REPORT_ADD_FAILED_ACTION:", action.payload);
            state.addReportForm = {
                ...DEFAULT_ADD_REPORT_FORM,
                report: {
                    ...DEFAULT_ADD_REPORT_FORM.report,
                    routeId: state.addReportForm.report.routeId,
                }
            };
        },
        [DRIVER_CLICK_ACTION]: state => {
            state.clickedReportId = 0;
        },
        [REPORT_CLICKED_ACTION]: (state, action) => {
            state.clickedReportId = action.payload === state.clickedReportId ? 0 : action.payload;
        },
        [REPORT_CLOSE_ACTION]: state => {
            state.clickedReportId = 0;
        },
        [REPORT_ADDED_ACTION]: (state, action) => {
            if (action.payload.fields.userId !== state.userId) {
                state.data.push({
                    ...action.payload.fields,
                    id: action.payload.id,
                    lng: action.payload.fields.point.fields.lng,
                    lat: action.payload.fields.point.fields.lat,
                });
            }
        },
        [REPORT_DELETED_ACTION]: (state, action) => {
            const index = state.data.findIndex(r => r.id === action.payload.id);
            if (index !== -1) {
                state.data.splice(index, 1);
            }
        }
    },
);
