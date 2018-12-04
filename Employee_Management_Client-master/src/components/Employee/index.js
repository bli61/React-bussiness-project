import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from '../../actions';
import detail from '../../reducers/detail';

const Employee = ({handleDelete, employee, fetchRangeEmployees, fetchManager, fetchDirectReports }) => {
  const style = {
    maxHeight: '50px',
    maxWidth: '50px'
  };
  // const handleDisableLink = (e, number) => {
  //   if (number === 0) {
  //     e.preventDefault();
  //   }
  // }
  // const onEmployeeDelete = _id => {
  //   this.props.handleDelete(_id);
  //   if (!this.props.deleteErr) {
  //     this.setState({redirect: true});
  //   }
  // };
  return (
    <tr>
      <td>
        { employee.imgUrl ? (<img src={employee.imgUrl} alt="employee image" style={style}/>) : (
          <img src="/static/images/default-avatar.png" alt="default avatar" style={style} />
        )}
      </td>
      <td>{employee.name}</td>
      <td>{employee.title}</td>
      <td>{employee.sex}</td>
      <td><a href={`tel:${employee.officePhone}`}>{employee.officePhone}</a></td>
      <td><a href={`mailto:${employee.email}`}>{employee.email}</a></td>
      <td>
        <button
          className="btn btn-link"
          onClick={() => fetchManager(employee._id)}
        >
          {employee.manager}
        </button>
      </td>

      
      
      <td>
        <button
          className="btn btn-link"
          disabled={employee.numberOfDirectReports === 0}
          onClick={() => fetchDirectReports(employee._id)}
        >
          {employee.numberOfDirectReports}
        </button>
      </td>
      <td>
        <Link to={`/${employee._id}`}>Detail</Link>
      </td>
      <td><button onClick={() => handleDelete(employee._id)} className="btn btn-outline-danger">Detele</button></td>
      <td>
        <Link to={`/edit/${employee._id}`} className="btn btn-primary">Edit</Link>
      </td>
    </tr>
  );
};

const mapDispatchToProps = {
  fetchRangeEmployees: actions.fetchRangeEmployees,
};
const mapStateToProps = state => {
  return{
    detail : state.detail
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(Employee);
    /*
      <td>{employee.sex}</td>
      <td>{employee.officePhone}</td>
      <td>{employee.email}</td>
      <td>{employee.managerName}</td>

      */