import { combineReducers } from 'redux';
import employees from './employees';
import searchInput from './searchInput';
import detail from './detail';
import directReports from './directReports';
import image from './image';

const reducers = combineReducers({
  employees,
  searchInput,
  detail,
  directReports,
  image
});

export default reducers;