import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Report from '../Report';

class DirectReports extends Component {

  componentDidMount() {
    const { fetchDirectReports, _id } = this.props;
    fetchDirectReports(_id);
  }

  render() {
    const { directReports, _id } = this.props;
    if (directReports.isFetching) {
      return <p>Loading...</p>
    }
    if (directReports.err !== '') {
      return <p>There is an error in loading direct reports!</p>
    }
    return (
      <div className="container">
        <h3>Direct Reports</h3>
        <div>
          <Link to={`/${_id}`}>Back</Link>
        </div>
        <div>
          <ul className="list-group">
            {directReports.directReports.map(report => {
              return <Report key={report._id} report={report} />
            })}
          </ul>
        </div>
      </div>
    );
  }
}

export default DirectReports;