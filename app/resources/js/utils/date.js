const nth = function (d) {
    if (d > 3 && d < 21) return 'th';
    switch (d % 10) {
        case 1:
            return "st";
        case 2:
            return "nd";
        case 3:
            return "rd";
        default:
            return "th";
    }
}

const formatDate = key => {
    const date = key ? new Date(key) : new Date();
    const day = date.getDate();
    const month = date.toLocaleString(undefined, {month: 'short'});
    const year = date.toLocaleString(undefined, {year: 'numeric'});
    return day + nth(day) + " " + month + " " + year;
}

const formatDrivenRouteDate = key => {
    const date = new Date(key);
    const day = date.toLocaleString(undefined, {day: '2-digit'});
    const month = date.toLocaleString(undefined, {month: '2-digit'});
    const year = date.toLocaleString(undefined, {year: 'numeric'});
    return day + "." + month + "." + year;
}

const checkDate = date => {
    const today = formatDate();
    if (today === date) {
        return "Today " + date;
    } else {
        const yesterday = formatDate(new Date().getTime() - 86400000);
        if (yesterday === date) {
            return "Yesterday " + date;
        } else {
            return date;
        }
    }
}

const checkDateTranslated = date => {
    const today = formatDate();
    if (today === date) {
        return framework.translate("Today") + " " + date;
    } else {
        const yesterday = formatDate(new Date().getTime() - 86400000);
        if (yesterday === date) {
            return framework.translate("Yesterday") + " " + date;
        } else {
            return date;
        }
    }
}

const formatTime = key => {
    const date = key ? new Date(key) : new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    //const ampm = hours > 12 ? "PM" : "AM";
    //return hours + ":" + (minutes < 10 ? "0" + minutes : minutes) + " " + ampm;
    return (hours < 10 ? "0" : "") + hours + ":" + (minutes < 10 ? "0" : "") + minutes;
}
