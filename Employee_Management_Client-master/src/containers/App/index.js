import React, { Component } from 'react';
import { BrowserRouter, Route, Switch, Redirect,withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from '../Home';
import EmployeeDetail from '../../components/EmployeeDetail';
import DirectReports from '../../components/DirectReports';
import NewEmployee from '../../components/NewEmployee';
import EditEmployee from '../../components/EditEmployee';
import * as actions from '../../actions';

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    //this.state = {firstLoading: true}
  }

  getEmployeeDetail = _id => {
    this.props.dispatch(actions.fetchDeatil(_id));
  };

  handleDelete = _id => {
    this.props.dispatch(actions.deleteEmployee(_id));
  };

  fetchDirectReports = _id => {
    this.props.dispatch(actions.fetchDirectReports(_id));
  };

  handleAddEmployee = (employee, history) => {
    this.props.dispatch(actions.addEmployee(employee, history));
  };

  handleEditEmployee = (_id, employee, history) => {
    this.props.dispatch(actions.editEmployee(_id, employee,history));
  };

  handleUploadImage = (file, filename) => {
    this.props.dispatch(actions.uploadImage(file, filename));
  };

  handleClearDetails = () => this.props.dispatch(actions.clearDetails());

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact={true} path="/" render={({ match }) =>
            <Home 
              handleDelete={this.handleDelete}
              detail = {this.props.detail}
            />
          } />
          <Route path="/newEmployee" render={() =>
            <NewEmployee
              handleAddEmployee={this.handleAddEmployee}
              employees={this.props.employees}
              handleUploadImage={this.handleUploadImage}
              image={this.props.image}
              //setFirstLoading={this.setFirstLoading}
            />
          } />
          <Route path="/edit/:employeeId" render={({ match }) =>
            <EditEmployee
              _id={match.params.employeeId}
              getEmployeeDetail={this.getEmployeeDetail}
              detail={this.props.detail}
              employees={this.props.employees}
              handleEditEmployee={this.handleEditEmployee}
              error={this.props.employees.err}
              handleUploadImage={this.handleUploadImage}
              image={this.props.image}
              handleClearDetails={this.handleClearDetails}
              //setFirstLoading={this.setFirstLoading}
            />
          } />
          <Route
            exact={true}
            path="/:employeeId"
            render={({ match }) =>
              <EmployeeDetail
                _id={match.params.employeeId}
                detail={this.props.detail}
                getEmployeeDetail={this.getEmployeeDetail}
                handleDelete={this.handleDelete}
                deleteErr={this.props.employees.deleteErr}
                handleClearDetails={this.handleClearDetails}
                //setFirstLoading={this.setFirstLoading}
              />
            }
          />
          <Route path="/:employeeId/directReports" render={({ match }) =>
            <DirectReports
              _id={match.params.employeeId}
              directReports={this.props.directReports}
              fetchDirectReports={this.fetchDirectReports}
            />
          } />


        </Switch>
      </BrowserRouter>
    );
  }
}

const mapStateToProps = state => {
  return {
    detail: state.detail,
    directReports: state.directReports,
    employees: state.employees,
    image: state.image
  };
};

export default connect(mapStateToProps)(App);
