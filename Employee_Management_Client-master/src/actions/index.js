import axios from 'axios';

const API_URL = '/api/employees/';

const fetchEmployeesRequest = () => {
  return {
    type: 'FETCH_EMPLOYEES_REQUEST'
  };
};

const fetchEmployeesSuccess = (employees, hasMore = false) => {
  return {
    type: 'FETCH_EMPLOYEES_SUCCESS',
    employees,
    hasMore,
  };
};

const fetchEmployeesFailure = err => {
  return {
    type: 'FETCH_EMPLOYEES_FAILURE',
    err
  };
};

export const fetchEmployees = () => {
  return (dispatch, getState) => {
    dispatch(fetchEmployeesRequest());
    axios({
      method: 'get',
      url: API_URL
    })
      .then(response => {
        dispatch(fetchEmployeesSuccess(response.data.employees));
      })
      .catch(err => {
        dispatch(fetchEmployeesFailure(err));
      });
  }
};



export const fetchRangeEmployees = (offset, limit) => {
  return dispatch => {
    dispatch(fetchEmployeesRequest());
    axios({
      method: 'get',
      url: API_URL + `range/${offset}/${limit}`
    })
      .then(response => {
        const employees = response.data.employees;
        const hasMore = employees.length >= limit;
        dispatch(fetchEmployeesSuccess(employees, hasMore));
      })
      .catch(err => {
        dispatch(fetchEmployeesFailure(err));
      });
  };
};
/*
export const fetchRangeEmployees = (offset, limit) => {
  return dispatch => {
    dispatch(fetchEmployeeRequest());
    axios({
      method: get,
      url: API + `range/${offset}/${limit}`
    })
      .then(response => {
        const employees = response.data.employees;
        const hasMore = employees.length >= limit;
        dispatch(fetchEmployeesSuccess(employees, hasMore));
      })
      .catch(err => {
        dispatch(fetchEmployeesFailure(err));
      })
  }
}
*/

const addEmployeeRequest = () => {
  return {
    type: 'ADD_EMPLOYEE_REQUEST'
  };
};

const addEmployeeSuccess = newEmployee => {
  return {
    type: 'ADD_EMPLOYEE_SUCCESS',
    newEmployee
  };
};

const addEmployeeFailure = err => {
  return {
    type: 'ADD_EMPLOYEE_FAILURE',
    err
  };
};

export const addEmployee = (employee, history) => {
  return (dispatch, getState) => {
    dispatch(addEmployeeRequest());
    axios({
      method: 'post',
      url: API_URL,
      data: employee
    })
      .then(response => {
        dispatch(addEmployeeSuccess(response.data.employee));
        history.push('/');
      })
      .catch(err => {
        dispatch(addEmployeeFailure(err))
      });
  };
};

const addRangeEmployeesRequest = () => {
  return {
    type: 'ADD_RANGE_EMPLOYEES_REQUEST'
  };
};

const addRangeEmployeesSuccess = (employees, hasMore) => {
  return {
    type: 'ADD_RANGE_EMPLOYEES_SUCCESS',
    employees,
    hasMore
  };
};

const addRangeEmployeesFailure = err => {
  return {
    type: 'ADD_RANGE_EMPLOYEES_FAILURE',
    err
  };
};

export const addRangeEmployees = (offset, limit) => {
  return dispatch => {
    dispatch(addRangeEmployeesRequest());
    axios({
      method: 'get',
      url: API_URL + `range/${offset}/${limit}`
    })
      .then(response => {
        const employees = response.data.employees;
        const hasMore = employees.length >= limit;
        dispatch(addRangeEmployeesSuccess(employees, hasMore));
      })
      .catch(err => {
        dispatch(addRangeEmployeesFailure(err));
      });
  };
};

const editEmployeeRequest = () => {
  return {
    type: 'EDIT_EMPLOYEE_REQUEST'
  };
};

const editEmployeeSuccess = (_id, employee) => {
  return {
    type: 'EDIT_EMPLOYEE_SUCCESS',
    _id,
    employee
  };
};

const editEmployeeFailure = err => {
  return {
    type: 'EDIT_EMPLOYEE_FAILURE',
    err
  };
};

export const editEmployee = (_id, employee, history) => {
  return (dispatch, getState) => {
    dispatch(editEmployeeRequest());
    axios({
      method: 'put',
      url: API_URL + _id,
      data: employee
    })
      .then(response => {
        dispatch(editEmployeeSuccess(_id, response.data.employee));
        history.push('/');
        //dispatch(fetchEmployees);
      })
      .catch(err => {
        dispatch(editEmployeeFailure(err));
      });
  };
};

const deleteEmployeeRequest = () => {
  return {
    type: 'DELETE_EMPLOYEE_REQUEST'
  };
};

const deleteEmployeeSuccess = _id => {
  return {
    type: 'DELETE_EMPLOYEE_SUCCESS',
    _id
  };
};

const deleteEmployeeFailure = err => {
  return {
    type: 'DELETE_EMPLOYEE_FAILURE',
    err
  };
};

export const deleteEmployee = _id => {
  return (dispatch, getState) => {
    dispatch(deleteEmployeeRequest());
    axios({
      method: 'delete',
      url: API_URL + _id
    })
      .then(response => {
        //dispatch(deleteEmployeeSuccess(_id));
        dispatch(fetchEmployeesRequest());
        axios({
        method: 'get',
        url: API_URL + `range/0/9`
        })
          .then(response => {
            const employees = response.data.employees;
            const hasMore = employees.length >= 9;
            dispatch(fetchEmployeesSuccess(employees, hasMore));
          })
          .catch(err => {
            dispatch(fetchEmployeesFailure(err));
          });
      })
      .catch(err => {
        dispatch(deleteEmployeeFailure(err));
      });
  };
};

export const sortEmployees = key => {
  return {
    type: 'SORT_EMPLOYEES',
    key
  };
};

export const changeInput = input => {
  return {
    type: 'CHANGE_INPUT',
    input
  };
};

const fetchDetailRequest = () => {
  return {
    type: 'FETCH_DETAIL_REQUEST'
  };
};

const fetchDetailSuccess = detail => {
  return {
    type: 'FETCH_DETAIL_SUCCESS',
    detail
  };
};

const fetchDetailFailure = err => {
  return {
    type: 'FETCH_DETAIL_FAILURE',
    err
  };
};

export const fetchDeatil = _id => {
  return (dispatch, getState) => {
    dispatch(fetchDetailRequest());
    axios({
      method: 'get',
      url: API_URL + _id
    })
      .then(response => {
        dispatch(fetchDetailSuccess(response.data));
      })
      .catch(err => {
        dispatch(fetchDetailFailure(err));
      });
  };
};

export const clearDetails = () => ({
  type: 'CLEAR_DETAILS',
});

const fetchDirectReportsRequest = () => {
  return {
    type: 'FETCH_DIRECT_REPORTS_REQUEST'
  };
};

const fetchDirectReportsSuccess = directReports => {
  return {
    type: 'FETCH_DIRECT_REPORTS_SUCCESS',
    directReports
  };
};

const fetchDirectReportsFailure = err => {
  return {
    type: 'FETCH_DIRECT_REPORTS_FAILURE',
    err
  };
};

export const fetchDirectReports = _id => {
  return (dispatch, getState) => {
    dispatch(fetchDirectReportsRequest());
    dispatch(fetchEmployeesRequest());
    axios({
      method: 'get',
      url: API_URL + _id + '/directReports'
    })
      .then(response => {
        dispatch(fetchDirectReportsSuccess(response.data.employees));
        dispatch(fetchEmployeesSuccess(response.data.employees));
      })
      .catch(err => {
        dispatch(fetchDirectReportsFailure(err));
        dispatch(fetchEmployeesFailure(err));
      });
  };
};

export const fetchManager = _id => {
  return (dispatch) => {
    dispatch(fetchEmployeesRequest());
    axios({
      method: 'get',
      url: `${API_URL}/${_id}/manager`
    })
      .then(response => {
        dispatch(fetchEmployeesSuccess(response.data.employees));
      })
      .catch(err => {
        dispatch(fetchEmployeesFailure(err));
      });
  }
}

const uploadImageRequest = () => {
  return {
    type: 'UPLOAD_IMAGE_SUCCESS'
  };
};

const uploadImageSuccess = (image, filename, imgUrl) => {
  return {
    type: 'UPLOAD_IMAGE_SUCCESS',
    image,
    filename,
    imgUrl
  };
};

const uploadImageFailure = err => {
  return {
    type: 'UPLOAD_IMAGE_FAILURE',
    err
  };
};

export const uploadImage = (image, filename) => {
  let data = new FormData();
  data.append('image', image);
  data.append('filename', filename);
  return (dispatch, getState) => {
    dispatch(uploadImageRequest());
    axios({
      method: 'post',
      url: API_URL + 'image',
      data: data
    })
      .then(response => {
        dispatch(uploadImageSuccess(image, filename, response.data.imgUrl));
      })
      .catch(err => {
        dispatch(uploadImageFailure(err));
      });
  }
};