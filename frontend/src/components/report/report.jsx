import React, { Component } from "react";
import { InfoWindow } from "react-google-maps";
import { MarkerWithLabel } from 'react-google-maps/lib/components/addons/MarkerWithLabel';
import './report.css';

class Report extends Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedReport: false,
      minutesSinceReported: this.minutesSinceReported()
    };

    this.updateReport = this.updateReport.bind(this);
    this.downdateReport = this.downdateReport.bind(this);
  }

  componentDidMount() {
    this.setState({
      selectedReport: this.props.searchedReport === this.props.report
    });
  }

  minutesSinceReported = () => {
    // Milliseconds elapsed since the UNIX epoch represented as integer
    const currentDateTime = Date.now();
    const reportDateTime = Date.parse(this.props.report.date);
    // millisecondsDiff/1000 => seconds; seconds/60 => minutes; 
    //minutes/60 => hours; hours/24 => days; days/7 => weeks;
    const millisecondsDiff = Math.floor((currentDateTime - reportDateTime) / 1000 / 60);

    if (millisecondsDiff < 60) {
      return `${millisecondsDiff} minutes ago`;
    } else if (millisecondsDiff < 120) {
      return `about ${Math.floor(millisecondsDiff/60)} hour ago`;
    } else if (millisecondsDiff < 4320) {
      return `about ${Math.floor(millisecondsDiff/60)} hours ago`;
    } else if (millisecondsDiff < 10080) {
      return `about ${Math.floor(millisecondsDiff/60/24) } days ago`;
    } else if (millisecondsDiff <= 20160) {
      return `about ${Math.floor(millisecondsDiff/60/24/7)} weeks ago`;
    } else {
      return `more than two weeks ago`
    }
  };

  updateReport = (e) => {
    e.preventDefault();
    this.props.updateReport({ "id": this.props.report._id });
  };

  downdateReport = (e) => {
    e.preventDefault();
    if (this.props.report.approvals === 0) return;
    this.props.downDateReport({ "id": this.props.report._id });
  }

  render () {
    const { report, icon, labelAnchor } = this.props;

    return (
      <>
        <MarkerWithLabel
          position={{
            lat: report.vendorLat,
            lng: report.vendorLng,
          }}
          onClick={() => {
            this.setState({
              selectedReport: true
            });
          }}
          icon={icon}
          labelAnchor={labelAnchor}
        >
          <div className="marker-badge"><i className="far fa-thumbs-up"></i>{report.approvals}</div>
        </MarkerWithLabel>
        {this.state.selectedReport && (<InfoWindow
          position={{
            lat: report.vendorLat,
            lng: report.vendorLng,
          }}
          onCloseClick={() => {
            this.setState({
              selectedReport: false
            });
          }}
        >
          <div>
            <h2 className="map-report-name">
              {report.vendorName}
            </h2>
            <p>{report.vendorAddress}</p>
            <a href={"tel:+1" + report.vendorPhone}>{report.vendorPhone}</a>
            <p>
              Reported by <strong>{report.reporterName}</strong>
            </p>
            <p>
              Reported <strong>{this.state.minutesSinceReported}</strong>
            </p>
            <p className="instock-verification">
              <span><strong>In stock? </strong></span>
              <button onClick={this.updateReport}><i className="far fa-thumbs-up"></i></button>
              <button onClick={this.downdateReport}><i className="far fa-thumbs-down"></i></button>
            </p>
          </div>
        </InfoWindow>)}
      </>
    );
  }
}

export default Report;