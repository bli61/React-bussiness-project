import React, { Component } from 'react';
import Employee from '../Employee';
import InfiniteScroll from 'react-infinite-scroll-component';

class EmployeeList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchInput: '',
      filteredList: [],
      sortBy: '',
    }
    console.log(this.props);
  }
  componentDidMount() {
    const { handleDelete, searchInput, fetchDirectReports, fetchManager,
      handleSort, error, addEmployees, fetchEmployees, hasMore, refreshFunction, ascending } = this.props;
    this.setState({
      filteredList: this.props.employees,
    })
    console.log(this.props);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.employees != this.props.employees) {
      this.setState({ filteredList: this.props.employees });
    }
    // console.log(this.state.filteredList);
    // console.log(prevProps);
  }
  // componentWillUpdate() {
  //   console.log(this.props.employees);
  // }
  render() {
    const { handleDelete, searchInput, fetchDirectReports, fetchManager,
      handleSort, error, addEmployees, fetchEmployees, hasMore, refreshFunction, ascending } = this.props;
    let { filteredList } = this.state;
    console.log(filteredList);
    console.log(this.props);
    if (this.searchInput !== '') {
      filteredList = filteredList.filter(employee => {
        for (let key in employee) {
          if (typeof employee[key] === 'string') {
            //console.log(this.st);
            const input = this.state.searchInput.toLowerCase();
            const value = employee[key].toLowerCase();
            if (value.indexOf(input) === 0) {
              return true;
            }
          }
        }
        return false;
      });
    }
    // if (this.error !== '') {
    //   return <p>There is an error in getting employees.</p>
    // }
    var sort = <i></i>;
    var arrow = ascending ? <i className="fas fa-arrow-up"></i> : <i className="fas fa-arrow-down"></i>;
    // filteredList = this.state.filteredList;
    // var handleSort = this.handleSort;
    var sortBy = this.state.sortBy;
    console.log(filteredList);
    let empUI;
    if (filteredList.length === 0) {
      // console.log("****");
      empUI = <p>Loading....</p>
    } else if (filteredList.length > 0) {
      // console.log("LARGER");
      empUI = (
        <div>
          <InfiniteScroll
            pullDownToRefresh={true}
            dataLength={filteredList.length}
            next={() => addEmployees(filteredList.length, 5)}
            hasMore={hasMore}
            loader={<div>Loading...</div>}
            refreshFunction={refreshFunction}
            endMessage={<p>End</p>}
            children={<tbody></tbody>}
          >
            <table className="table table-striped table-bordered">
              <thead>
                <tr>
                  <th>List</th>
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'name'), this.setState({ sortBy: 'name' }))}> Name {sortBy == 'name' ? arrow : sort}</a>
                  </th>
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'title'), this.setState({ sortBy: 'title' }))}>Title{sortBy == 'title' ? arrow : sort}</a>
                  </th>
  
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'sex'), this.setState({ sortBy: 'sex' }))}>Sex{sortBy == 'sex' ? arrow : sort}</a>
                  </th>
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'officePhone'), this.setState({ sortBy: 'officePhone' }))}>Phone{sortBy == 'officePhone' ? arrow : sort}</a>
                  </th>
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'email'), this.setState({ sortBy: 'email' }))}>Email{sortBy == 'email' ? arrow : sort}</a>
                  </th>
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'manager'), this.setState({ sortBy: 'manager' }))}>Manager{sortBy == 'manager' ? arrow : sort}</a>
                  </th>
  
  
                  <th>
                    <a href="#" onClick={e => (handleSort(e, 'numberOfDirectReports'), this.setState({ sortBy: 'numberOfDirectReports' }))}># of DR{sortBy == 'numberOfDirectReports' ? arrow : sort}</a>
                  </th>
                  <th>Detail</th>
  
  
                  <th>Delete</th>
                  <th>Edit</th>
  
                </tr>
              </thead>
  
              <tbody>
                {filteredList.map(employee => {
                  return (
                    <Employee
                      handleDelete={handleDelete}
                      key={employee._id}
                      employee={employee}
                      fetchManager={fetchManager}
                      fetchDirectReports={fetchDirectReports}
                    />
                  );
                })}
              </tbody>
            </table>
          </InfiniteScroll>
        </div>
      );
    }

    return (     
      <div className="wrapped-table">
        {empUI}
      </div>
    );
  }
}

export default EmployeeList;
/*
<InfiniteScroll
        pullDownToRefresh={true}
        dataLength={filteredList.length}
        next={() => addEmployees(filteredList.length, 5)}
        hasMore={hasMore}
        loader={<div>Loading...</div>}
        refreshFunction={refreshFunction}
        endMessage={<p>End</p>}
        children={<tbody></tbody>}
      >

      </InfiniteScroll>*/

      /*
              <th>
                <a href="#" onClick={e => handleSort(e, 'sex')}>Sex</a>
              </th>
              <th>
                <a href="#" onClick={e => handleSort(e, 'phone')}>Phone</a>
              </th>
              <th>
                <a href="#" onClick={e => handleSort(e, 'email')}>Email</a>
              </th>
              <th>
                <a href="#" onClick={e => handleSort(e, 'manager')}>Manager</a>
              </th>
      */