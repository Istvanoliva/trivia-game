import { combineReducers } from 'redux';
import loginRedux from './login';
import tokenRedux from './token';

const rootReducer = combineReducers({
  loginRedux,
  tokenRedux,
});

export default rootReducer;
