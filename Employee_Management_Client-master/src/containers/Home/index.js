import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import SearchBar from '../../components/SearchBar';
import EmployeeList from '../../components/EmployeeList';
import * as actions from '../../actions';
import './style.css';

class Home extends Component {

  componentDidMount() {
    this.fetchRangeEmployees(0, 10);
  }

  // componentDidUpdate() {
  //   if (this.props.employees.deleteSuccess) {
  //     this.fetchRangeEmployees(0, 9);
  //   }
  // }
  //  can use props.dispatch, no state props passed from App to Home

  fetchEmployees = () => {
    this.props.dispatch(actions.fetchEmployees());
  };

  fetchRangeEmployees = (offset, limit) => {
    this.props.dispatch(actions.fetchRangeEmployees(offset, limit));
  };

  addEmployees = (offset, limit) => {
    this.props.dispatch(actions.addRangeEmployees(offset, limit));
  };

  inputChangeHandler = input => {
    this.props.dispatch(actions.changeInput(input));
  };

  handleSort = (e, key) => {
    e.preventDefault();
    this.props.dispatch(actions.sortEmployees(key));
  };

  fetchDirectReports = _id => {
    this.props.dispatch(actions.fetchDirectReports(_id));
  };

  fetchManager = _id => {
    this.props.dispatch(actions.fetchManager(_id));
  }

  refresh = () => {
    return this.props.employees;
  };

  render() {
    return (
      <div className="wrapped">
        <div className="home-page">
          <div className="row">
            <div className="col col-lg-9 col-md-9 col-sm-9">
              <h2>Employee List</h2>
            </div>
            <div className="col col-lg-3 col-md-3 col-sm-3">
              <Link className="btn btn-primary" to="/newEmployee">Add New Employee</Link>
            </div>
          </div>
          <div className = "searchbar">
          <SearchBar 
            searchInput={this.props.searchInput}
            inputChangeHandler={this.inputChangeHandler}
          />
          </div>
          <EmployeeList
            //detail = {this.props.detail}
            handleDelete={this.props.handleDelete}
            employees={this.props.employees}
            searchInput={this.props.searchInput}
            handleSort={this.handleSort}
            error={this.props.error}
            addEmployees={this.addEmployees}
            fetchEmployees={this.fetchEmployees}
            hasMore={this.props.hasMore}
            refreshFunction={this.refresh}
            fetchDirectReports={this.fetchDirectReports}
            fetchManager={this.fetchManager}
            ascending={this.props.ascending}
          />
        </div>
      </div>

    );

  }
}

const mapStateToProps = state => {
  return {
    employees: state.employees.employees,
    error: state.employees.err,
    hasMore: state.employees.hasMore,// pay attention
    searchInput: state.searchInput,
    ascending: state.employees.ascending,
  };
};

export default connect(mapStateToProps)(Home);