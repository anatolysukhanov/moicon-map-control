const selectAddReportForm = state => state.reports.addReportForm;

const selectReports = state => state.reports.data;
/*.map(r => ({
   ...r,
   lng: Number(r.lng),
   lat: Number(r.lat),
   type: Number(r.type),
}));*/

const selectClickedReportId = state => state.reports.clickedReportId;

const selectClickedReport = Redux.createSelector(
    selectClickedReportId,
    selectReports,
    (clickedReportId, reports) => clickedReportId !== 0 ? reports.filter(r => r.id === clickedReportId)[0] : undefined
);

const selectReportsPanelIsOpen = state => state.reports.panel.isOpen;
const selectReportsPanelSearchTerm = state => state.reports.panel.searchTerm;
const selectReportsPanelDay = state => state.reports.panel.day;

const groupReportsByDay = reports => reports.sort((a, b) => Date.parse(b.creationDate) - Date.parse(a.creationDate)).reduce((acc, obj) => {
    const day = checkDate(formatDate(obj.creationDate));
    const index = acc.findIndex(a => a.day === day);
    if (index === -1) {
        acc.push({
            day,
            reports: [obj]
        });
    } else {
        acc[index].reports.push(obj);
    }
    return acc;
}, []);

const selectReportsPanelFilteredReports = Redux.createSelector(
    selectReports,
    selectReportsPanelSearchTerm,
    (reports, searchTerm) => reports.filter(r => r.description.toLowerCase().includes(searchTerm.toLowerCase()) || r.address.toLowerCase().includes(searchTerm.toLowerCase()))
);

const selectPanelReports = Redux.createSelector(
    selectReportsPanelIsOpen,
    selectReportsPanelSearchTerm,
    selectReportsPanelDay,
    selectReportsPanelFilteredReports,
    (isOpen, searchTerm, day, reports) => ({
        isOpen,
        searchTerm,
        day,
        reports: groupReportsByDay(reports)
    })
);

const selectMapReports = Redux.createSelector(
    selectReports,
    selectReportsPanelDay,
    (reports, day) => {
        const reportsByDay = groupReportsByDay(reports);
        const index = reportsByDay.findIndex(r => r.day === day);
        return index !== -1 ? reportsByDay[index].reports : [];
    }
);
