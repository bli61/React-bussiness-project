import React, { Component } from 'react';

import './style.css';
import { Redirect, Link, withRouter } from 'react-router-dom';

class NewEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      title: '',
      sex: '',
      managerId: null,
      officePhone: '',
      cellphone: '',
      SMS: '',
      email: '',
      startDate: null,
      startDateStr: '',
      file: null,
      redirect: false,
      filePath: '',
    };
  }

  onInputChange = (e, key) => {
    let newObj = {};
    newObj[key] = e.target.value;
    this.setState(newObj);
  };

  onDateChange = e => {
    const dateStr = e.target.value;
    const date = new Date(dateStr);
    this.setState({ startDateStr: dateStr, startDate: date });
  }

  handleSubmit = e => {
    e.preventDefault();
    let imgUrl = '';
    if (this.state.filePath) {
      const fileName = Date.now() + '_' + this.state.file.name;
      imgUrl = `/static/images/${fileName}`;
      //this.setState({ imgUrl: this.props.image.imgUrl });// ?not necessary :?imgUrl is not in initial state
      const employee = { ...this.state, imgUrl };
      delete employee.startDateStr;
      delete employee.file;
      delete employee.filePath;
      this.props.handleUploadImage(this.state.file, fileName);//  in actions it is axios post => asynchronous should it affect the next setState imageUrl
      this.props.handleAddEmployee(employee, this.props.history);
      /*
      if (this.props.employees.err === '') {
        this.setState({ redirect: true });// imageUrl
        //this.props.setFirstLoading(false);
      }
      */
    } else {
      const employee = { ...this.state, imgUrl };
      delete employee.startDateStr;
      delete employee.file;
      delete employee.filePath;
      this.props.handleAddEmployee(employee);
      if (this.props.employees.err === '') {
        this.setState({ redirect: true });
        //this.props.setFirstLoading(false);
      }
    }
  };

  handleFile = (e) => {
    console.log('target: ', e.target.files);
    const file = e.target.files[0];
    // const filename = Date.now() + '_' + file.name;
    // console.log(file,filename)
    // this.props.handleUploadImage(file, filename);
    console.log('url: ', URL.createObjectURL(file));
    this.setState({
      file,
      filePath: URL.createObjectURL(file),
    });
  };

  render() {
    const candidateManagers = this.props.employees.employees.filter(employee => {
      return true;
    });
    if (this.state.redirect) {
      return <Redirect to={{ pathname: '/' }} />
    }
    return (
      <div className="new-employee">
        <h2>New Employee</h2>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="name">
              Name: (*)
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="name"
                type="text"
                className="form-control"
                required={true}
                value={this.state.name} onChange={e => this.onInputChange(e, 'name')}
              />
            </div>
          </div>
          <div className = "form-group row">
            <label className = "col col-sm-2 col-lg-2 col-form-label" htmlFor="title">
              Title: (*)
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="title"
                type="text"
                required={true}
                className="form-control"
                value={this.state.title}
                onChange={e => this.onInputChange(e, 'title')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="sex">
              Sex:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <select className="form-control" id="sex" onChange={e => this.onInputChange(e, 'sex')}>
                <option value="">---</option>
                <option value="male">male</option>
                <option value="female">female</option>
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="picture">
              Upload Picture:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="picture"
                type="file"
                className="form-control"
                accept=".jpg, .jpeg, .png"
                onChange={this.handleFile}
              />
            </div>
            <div>
              {this.state.filePath && <img src={this.state.filePath}/>}
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="manager">
              Manager:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <select className="form-control" id="manager" onChange={e => this.onInputChange(e, 'managerId')}>
                <option value={null}>Select an employee as a manager</option>
                {candidateManagers.map(employee => {
                  return <option key={employee._id} value={employee._id}>{employee.name}</option>
                })}
              </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="startDate">
              Start Date:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="startDate"
                type="date"
                className="form-control"
                value={this.state.startDateStr}
                onChange={this.onDateChange}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2" htmlFor="officePhone">
              Office Phone:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="officePhone"
                type="tel"
                className="form-control"
                value={this.state.officePhone}
                onChange={e => this.onInputChange(e, 'officePhone')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="cellphone">
              Cell Phone:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="cellphone"
                type="tel"
                className="form-control"
                value={this.state.cellphone}
                onChange={e => this.onInputChange(e, 'cellphone')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="SMS">
              SMS:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="SMS"
                type="tel"
                className="form-control"
                value={this.state.SMS}
                onChange={e => this.onInputChange(e, 'SMS')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="email">
              E-mail:
            </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="email"
                type="email"
                className="form-control"
                value={this.state.email}
                onChange={e => this.onInputChange(e, 'email')}
              />
            </div>
          </div>
          <div>
            <div>
              <button type="submit">Create New Employee</button>
            </div>
            <div>
              <Link to="/">Back</Link>
            </div>
          </div>
        </form>
      </div>
    );
  }
}


export default withRouter(NewEmployee);