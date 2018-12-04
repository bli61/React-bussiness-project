import React, { Component } from 'react';
import { Redirect, Link, withRouter } from 'react-router-dom';

class EditEmployee extends Component {
  constructor(props) {
    super(props);
    this.state = {
      detail: {
        _id: null,
        name: '',
        title: '',
        sex: '',
        managerId: null,
        managerName: '',
        numberOfDirectReports: 0,
        officePhone: '',
        cellphone: '',
        SMS: '',
        email: '',
        imgUrl: ''
      },
      changedDetail: {},
      redirect: false,
      filteredEmployees: [],
      uploaded: false,
      file: null,
    };
  }

  componentDidMount() {
    const { _id, getEmployeeDetail } = this.props;
    this.filterEmployees();
    getEmployeeDetail(_id);
  }

  componentDidUpdate(prevProps) {
    const { detail } = this.props;
    if (!prevProps.detail.detail.name && detail.detail.name && !detail.err) {
      this.setState({ detail: detail.detail });
    }
  }

  componentWillUnmount() {
    this.props.handleClearDetails();
  }

  filterEmployees = () => {
    const result = [];
    this.traverse(this.props._id, result);
    this.setState({filteredEmployees: result});
  };

  traverse = (_id, list) => {
    if (!_id || _id === '') {
      return;
    }
    list.push(_id);
    let directReports = this.getDirectReports(_id);
    for (let dr of directReports) {
      this.traverse(dr, list);
    }
  };

  getDirectReports = _id => {
    let result = [];
    const employees = this.props.employees.employees;
    for (let emp of employees) {
      if (emp.managerId === _id) {
        result.push(emp._id);
      }
    }
    return result;
  };

  onInputChange = (e, key) => {
    e.preventDefault();
    const newObj = {};
    newObj[key] = e.target.value;
    const detail = {
      ...this.state.detail,
      ...newObj
    };
    const changed = {...this.state.changedDetail};
    changed[key] = e.target.value;
    this.setState({ detail, changedDetail: changed });
  };

  onManagerChange = e => {
    let idName = e.target.value.split(' ');
    const managerId = idName[0];
    const managerName = idName[1];
    const newObj = { managerId, managerName };
    const detail = {
      ...this.state.detail,
      ...newObj
    };
    const changed = {...this.state.changedDetail, managerId};
    this.setState({ detail, changedDetail: changed });
  };

  handleSubmit = e => {
    e.preventDefault();
    const { file, uploaded } = this.state;
    let changedDetail;
    if (uploaded) {
      const fileName = Date.now() + '_' + file.name;
      const imgUrl = `/static/images/${fileName}`;
      changedDetail = {...this.state.changedDetail, imgUrl};
      this.props.handleUploadImage(file, fileName);
    } else {
      changedDetail = {...this.state.changedDetail};
    }
    this.props.handleEditEmployee(this.props._id, changedDetail,this.props.history );
    if (uploaded) {
      const fileName = Date.now() + '_' + file.name;
      this.props.handleUploadImage(file, fileName);
    }
    //this.setState({uploaded: false})
    // if (this.props.error === '') {
    //   this.setState({ redirect: true });
    // //gai this.props.history.push('/');
    //   //this.props.setFirstLoading(false);
    // }
  };

  handleFile = (e) => {
    // const file = this.fileInput.current.files[0];
    // const filename = Date.now() + '_' + file.name;
    // this.props.handleUploadImage(file, filename);
    this.setState({ uploaded: true, file: e.target.files[0] });
  };

  renderImage = () => {
    const { detail, uploaded, file } = this.state;
    const style = {
      maxHeight: '50px',
      maxWidth: '50px'
    };
    if (uploaded) {
      const fileURL = URL.createObjectURL(file);
      return <img src={fileURL} alt="employee image" style={style} />;
    }
    
    return detail.imgUrl ? (<img src={detail.imgUrl} alt="employee image" style={style}/>) : (
      <img src="/static/images/default-avatar.png" alt="default avatar" style={style} />
    );
  };

  render() {
    const candidateManagers = this.props.employees.employees.filter(manager => {
      return !this.state.filteredEmployees.includes(manager._id);
    });
    const { detail } = this.state;
    // if (redirect) {
    //   return <Redirect to={{ pathname: '/' }} />
    // }
    return (
      <div className="container">
        <h2>Edit Employee</h2>
        <div>
        {this.renderImage()}
        </div>
        <form onSubmit={this.handleSubmit}>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="name">Name: </label>
            <div className="col col-sm-10 col-lg-4" >
              <input 
                id="name" 
                type="text"
                className="form-control" 
                value={detail.name} 
                onChange={e => this.onInputChange(e, 'name')} 
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="title">Title: </label>
            <div className="col col-sm-10 col-lg-4" >
              <input
                id="title"
                type="text"
                className="form-control"
                value={detail.title}
                onChange={e => this.onInputChange(e, 'title')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="sex">Sex: </label>
            <div className="col col-sm-10 col-lg-4">
            <select 
              className="form-control" 
              id="sex" 
              value={detail.sex}
              onChange={e => this.onInputChange(e, 'sex')}
            >
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
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="manager">Manager: </label>
            <div className="col col-sm-10 col-lg-4">
            <select
              id="manager"
              onChange={this.onManagerChange}
              className="form-control"
            >
              <option value={null}>None Employee is selected</option>
              {candidateManagers.map(employee => {
                return (
                  <option
                    key={employee._id}
                    value={employee._id + " " + employee.name}
                  >
                    {employee.name}
                  </option>
                );
              })}
            </select>
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="officePhone">Office Phone: </label>
            <div className="col col-sm-10 col-lg-4" >
              <input
                id="officePhone"
                type="tel"
                className="form-control"
                value={detail.officePhone}
                onChange={e => this.onInputChange(e, 'officePhone')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="cellphone">Cell Phone: </label>
            <div className="col col-sm-10 col-lg-4" >
              <input
                id="cellphone"
                type="tel"
                className="form-control"
                value={detail.cellphone}
                onChange={e => this.onInputChange(e, 'cellphone')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="SMS">SMS: </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="SMS"
                type="tel"
                className="form-control"
                value={detail.SMS}
                onChange={e => this.onInputChange(e, 'SMS')}
              />
            </div>
          </div>
          <div className="form-group row">
            <label className="col col-sm-2 col-lg-2 col-form-label" htmlFor="email">E-mail: </label>
            <div className="col col-sm-10 col-lg-4">
              <input
                id="email"
                type="email"
                className="form-control"
                value={detail.email}
                onChange={e => this.onInputChange(e, 'email')}
              />
            </div>
          </div>
          <div className="row">
            <div className="col col-sm-4 col-lg-3">
              <button className="btn btn-primary" type="submit">Save</button>
            </div>
            <div className="col">
              <button
                className="btn btn-secondary"
                onClick={() => this.props.history.goBack()}
              >
                Back
              </button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

export default withRouter(EditEmployee);