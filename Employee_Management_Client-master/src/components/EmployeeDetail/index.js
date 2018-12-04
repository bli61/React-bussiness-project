import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './style.css';

class EmployeeDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {redirect: false};
  }

  componentDidMount() {
    const { _id, getEmployeeDetail } = this.props;
    getEmployeeDetail(_id);
  }

  componentWillUnmount() {
    this.props.handleClearDetails();
  }

  handleDisableLink = (e, number) => {
    if (number === 0) {
      e.preventDefault();
    }
  }

  onEmployeeDelete = _id => {
    this.props.handleDelete(_id);
    if (!this.props.deleteErr) {
      this.setState({redirect: true});
    }
  };

  render() {
    const detail = this.props.detail;
    const employee = detail.detail;
    if (detail.isFetching) {
      return <p>Loading...</p>
    }
    if (detail.err !== '') {
      return (
        <div>
          <p>There is an error in getting employee detail for id: {employee._id}</p>
        </div>
      );
    }
    if (this.state.redirect) {
      return <Redirect to={{pathname: '/'}}/>
    }
    return (
      <div className="container detail-page">
        <div className="row">
          <div className="col col-sm-4 col-lg-4">
            <Link to="/">Employee List</Link>
          </div>
          <div className="col">
            <Link to={`/edit/${employee._id}`} className="btn btn-primary">Edit</Link>
          </div>
        </div>
        <div>
          <div className="row">
            <div className="col col-sm-3 col-lg-2">
              {employee.imgUrl ? <img src={employee.imgUrl} alt="employee image" /> : (
                <img src="/static/images/default-avatar.png" alt="default avatar" />
              )}
            </div>
            <div className="col">
              <h4>{employee.name}</h4>
              <p>{employee.title}</p>
            </div>
          </div>
        </div>
        <div>
          <ul className="list-group">
            <li className="list-group-item">Manager: {employee.managerName}</li>
            <li className="list-group-item">
              Number of Direct Reports: {employee.numberOfDirectReports} 
              <Link to={`/${employee._id}/directReports`} onClick={e => this.handleDisableLink(e, employee.numberOfDirectReports)}>View</Link>
            </li>
            <li className="list-group-item">Start Date: {new Date(employee.startDate).toLocaleDateString('en-US', {timeZone: 'UTC'})}</li>
            <li className="list-group-item">
              Office Phone: <a href={`tel:${employee.officePhone}`}>{employee.officePhone}</a>
            </li>
            <li className="list-group-item">
              Cell Phone: <a href={`tel:${employee.cellphone}`}>{employee.cellphone}</a>
            </li>
            <li className="list-group-item">
              SMS: <a href={`sms:${employee.SMS}`}>{employee.SMS}</a>
            </li>
            <li className="list-group-item">
              E-mail: <a href={`mailto:${employee.email}`}>{employee.email}</a>
            </li>
          </ul>
        </div>
        <div>
          <button onClick={() => this.onEmployeeDelete(employee._id)} className="btn btn-outline-danger">Detele Employee</button>
        </div>
      </div>
    );
  }

}

export default EmployeeDetail;