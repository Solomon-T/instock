import axios from 'axios';

export const getReports = reports => {
    return axios.get('api/reports', reports)
};

export const getReport = reportId => {
    return axios.get(`api/reports/${reportId}`)
};

export const postReport = report => {
    return axios.post('api/reports', report)
};

export const getPlaceReports = placeReports => {
    return axios.get(`api/reports/${placeReports}`, placeReports)
};

export const updateApprovals = reportId => {
    return axios.patch('api/reports/update', reportId);
}

export const downDateApprovals = reportId => {
    return axios.patch('api/reports/downDate', reportId);
}