import { combineReducers } from 'redux';
import loginRedux from './login';
import token from './token';
import player from './player';
import timeDown from './timer';

const rootReducer = combineReducers({
  loginRedux,
  token,
  player,
  timeDown,
});

export default rootReducer;
