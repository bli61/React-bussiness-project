import React from 'react';
import Employee from '../Employee';
import InfiniteScroll from 'react-infinite-scroll-component';

const EmployeeList = props => {
  const { handleDelete, employees, searchInput, fetchDirectReports, fetchManager,
    handleSort, error, addEmployees, fetchEmployees, hasMore, refreshFunction,ascending } = props;
  let filteredList = employees;
  
  if (searchInput !== '') {
    filteredList = filteredList.filter(employee => {
      for (let key in employee) {
        if (typeof employee[key] === 'string') {
          const input = searchInput.toLowerCase();
          const value = employee[key].toLowerCase();
          if (value.indexOf(input) === 0) {
            return true;
          }
        }
      }
      return false;
    });
  }
  if (error !== '') {
    return <p>There is an error in getting employees.</p>
  }
  let sort = <i></i>;
  let arrow = this.aschending? <i class="fas fa-arrow-up"></i>:<i class="fas fa-arrow-down"></i>;
  return (
    
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
                <a href="#" onClick={e => (handleSort(e, 'name'), this.sortBy = 'name')}>Name{this.sortBy =='name'? arrow: sort}</a>
              </th>
              <th>
                <a href="#" onClick={e => (handleSort(e, 'title'), this.sortBy = 'title')}>Title{this.sortBy =='title'? arrow: sort}</a>
              </th>

              <th>
                <a href="#" onClick={e => (handleSort(e, 'sex'), this.sortBy = 'sex')}>Sex{this.sortBy =='sex'? arrow: sort}</a>
              </th>
              <th>
                <a href="#" onClick={e => (handleSort(e, 'officePhone'), this.sortBy = 'officePhone')}>Phone{this.sortBy =='officePhone'? arrow: sort}</a>
              </th>
              <th>
                <a href="#" onClick={e => (handleSort(e, 'email'), this.sortBy = 'email')}>Email{this.sortBy =='email'? arrow: sort}</a>
              </th>
              <th>
                <a href="#" onClick={e => (handleSort(e, 'manager'), this.sortBy = 'manager')}>Manager{this.sortBy =='manager'? arrow: sort}</a>
              </th>


              <th>
                <a href="#" onClick={e => (handleSort(e, 'numberOfDirectReports'), this.sortBy = 'numberOfDirectReports')}>Number of Direct Reports{this.sortBy =='numberOfDirectReports'? arrow: sort}</a>
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
};

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