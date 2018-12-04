const initState = {
  employees: [],
  isFetching: false,
  isEditing: false,
  isDeleting: false,
  err: '',
  deleteErr: false,
  hasMore: true,
  deleteSuccess: false,
  ascending: true,
};

const employees = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_EMPLOYEES_REQUEST':
      return {
        ...state,
        isFetching: true,
        deleteSuccess: false,
      };
    case 'FETCH_EMPLOYEES_SUCCESS':
      return {
        ...state,
        employees: action.employees,
        err: '',
        isFetching: false,
        hasMore: action.hasMore,//  ?? hasMore
      };
    case 'FETCH_EMPLOYEES_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'ADD_EMPLOYEE_REQUEST':
      return {
        ...state,
        isFetching: true,
        //deleteSuccess: false,
      };
    case 'ADD_EMPLOYEE_SUCCESS': {
      const newEmployees = [...state.employees, action.newEmployee];
      return {
        ...state,
        employees: newEmployees,
        isFetching: false,
        err: '',
        deleteErr: true
      };
    }
    case 'ADD_EMPLOYEE_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'ADD_RANGE_EMPLOYEES_REQUEST':
      return {
        ...state,
        isFetching: true,
        deleteSuccess: false,
      };
    case 'ADD_RANGE_EMPLOYEES_SUCCESS': {
      const newEmployees = [...state.employees, ...action.employees];
      return {
        ...state,
        isFetching: false,
        err: '',
        employees: newEmployees,
        hasMore: action.hasMore
      };
    }
    case 'ADD_RANGE_EMPLOYEES_FAILURE': 
      return {
        ...state,
        isFetching: false,
        err: action.err,
      }
    case 'EDIT_EMPLOYEE_REQUEST': {
      return {
        ...state,
        isEditing: true,
        deleteSuccess: false, // deleteSuccess?
      };
    }
    case 'EDIT_EMPLOYEE_SUCCESS': {
      const editedEmployees = state.employees.map(employee => {
        if (employee._id === action._id) {
          return action.employee;
        } else {
          return employee;
        }
      });
      return {
        ...state,
        employees: editedEmployees,
        isEditing: false,
        err: ''
      };
    }
    case 'EDIT_EMPLOYEE_FAILURE':
      return {
        ...state,
        isEditing: false,
        err: action.err,
        deleteErr: true    // ?
      };
    case 'DELETE_EMPLOYEE_REQUEST':
      return {
        ...state,
        isDeleting: true,
        deleteSuccess: false,  //?
      };
    case 'DELETE_EMPLOYEE_SUCCESS': {
      let index = 0;
      const { employees } = state;
      for (let i = 0; i < employees.length; i++) {
        if (employees[i]._id === action._id) {
          index = i;
          break;
        }
      }
      const deletedEmployees = [employees.slice(0, index), employees.slice(index + 1)];
      return {
        ...state,
        isDeleting: false,
        employees: deletedEmployees,
        err: '',
        deleteSuccess: true,
      };
    }
    case 'DELETE_EMPLOYEES_FAILURE':
      return {
        ...state,
        isDeleting: false,
        err: action.err,
        deleteSuccess: false, // deleteSuccess?
      };
    case 'SORT_EMPLOYEES': {
      const employees = [...state.employees];
      const key = action.key;
      if (state.ascending) {
        employees.sort((employee1, employee2) => {
          if (employee1[key] === employee2[key]) {
            return 0;
          }
          return employee1[key] < employee2[key] ? -1 : 1;
        });
      } else {
        employees.sort((employee1, employee2) => {
          if (employee1[key] === employee2[key]) {
            return 0;
          }
          return employee1[key] > employee2[key] ? -1 : 1;
        });
      }
      return {
        ...state,
        employees,
        ascending: !state.ascending,
      };
    }
    default:
      return state;
  }
};

export default employees;