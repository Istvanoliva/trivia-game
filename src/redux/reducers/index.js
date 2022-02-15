import { combineReducers } from 'redux';
import loginRedux from './login';
import token from './token';
import player from './player';

const rootReducer = combineReducers({
  loginRedux,
  token,
  player,
});

export default rootReducer;
