const initState = {
  detail: {
    _id: '',
    name: '',
    title: '',
    sex: '',
    startDate: '',
    officePhone: '',
    cellphone: '',
    SMS: '',
    email: '',
    imageUrl: '',
    managerId: null,
    managerName: ''
  },
  isFetching: false,
  err: ''
};

const detail = (state = initState, action) => {
  switch (action.type) {
    case 'FETCH_DETAIL_REQUEST':
      return {
        ...state,
        isFetching: true
      };
    case 'FETCH_DETAIL_SUCCESS':
      return {
        ...state,
        isFetching: false,
        detail: action.detail,
        err: ''
      };
    case 'FETCH_DETAIL_FAILURE':
      return {
        ...state,
        isFetching: false,
        err: action.err
      };
    case 'CLEAR_DETAILS':
      return initState;
    default:
      return state;
  }
};

export default detail;