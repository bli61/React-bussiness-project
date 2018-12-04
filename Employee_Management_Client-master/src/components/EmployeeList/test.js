<div>
<InfiniteScroll
  pullDownToRefresh={true}
  dataLength={filteredList.length}
  next={() => this.addEmployees(filteredList.length, 5)}
  hasMore={this.hasMore}
  loader={<div>Loading...</div>}
  refreshFunction={this.refreshFunction}
  endMessage={<p>End</p>}
  children={<tbody></tbody>}
>
  <table className="table table-striped table-bordered">
    <thead>
      <tr>
        <th>List</th>
        <th>
          <a href="#" onClick={e => (this.handleSort(e, 'name'), this.setState({sortBy :'name'}))}> Name {sortBy == 'name' ? arrow : sort}</a>
        </th>
        <th>
          <a href="#" onClick={e => (handleSort(e, 'title'), this.setState({sortBy :'title'}))}>Title{sortBy == 'title' ? arrow : sort}</a>
        </th>

        <th>
          <a href="#" onClick={e => (handleSort(e, 'sex'), this.setState({sortBy :'sex'}))}>Sex{sortBy == 'sex' ? arrow : sort}</a>
        </th>
        <th>
          <a href="#" onClick={e => (handleSort(e, 'officePhone'), this.setState({sortBy :'officePhone'}))}>Phone{sortBy == 'officePhone' ? arrow : sort}</a>
        </th>
        <th>
          <a href="#" onClick={e => (handleSort(e, 'email'), this.setState({sortBy :'email'}))}>Email{sortBy == 'email' ? arrow : sort}</a>
        </th>
        <th>
          <a href="#" onClick={e => (handleSort(e, 'manager'), this.setState({sortBy :'manager'}))}>Manager{sortBy == 'manager' ? arrow : sort}</a>
        </th>


        <th>
          <a href="#" onClick={e => (handleSort(e, 'numberOfDirectReports'), this.setState({sortBy :'numberOfDirectReports'}))}>Number of Direct Reports{sortBy == 'numberOfDirectReports' ? arrow : sort}</a>
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
            handleDelete={this.handleDelete}
            key={employee._id}
            employee={employee}
            fetchManager={this.fetchManager}
            fetchDirectReports={this.fetchDirectReports}
          />
        );
      })}
    </tbody>
  </table>
</InfiniteScroll>
</div>