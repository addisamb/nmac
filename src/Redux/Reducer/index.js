import {combineReducers} from 'redux';
import AuthReducer from './AuthReducer';
import HomeReducer from './HomeReducer';
import CourseReducer from './CourseReducer';
import SearchReducer from './SearchReducer';

export default combineReducers({
  AuthReducer,
  HomeReducer,
  CourseReducer,
  SearchReducer
});
