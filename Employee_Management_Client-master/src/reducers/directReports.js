const initState = {
  directReports: [],
  isFetching: false,
  err: ''
};

const directReports = (state = initState, action) => {
  switch(action.type) {
    case 'FETCH_DIRECT_REPORTS_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_DIRECT_REPORTS_SUCCESS':
      return {
        ...state,
        isFetching: false,
        directReports: action.directReports,
        err: ''
      };
    case 'FETCH_DIRECT_REPORTS_FAILURE': 
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    default:
      return state;
  }
};

export default directReports;