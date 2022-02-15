import { combineReducers } from 'redux';
import loginRedux from './login';
import token from './token';

const rootReducer = combineReducers({
  loginRedux,
  token,
});

export default rootReducer;
