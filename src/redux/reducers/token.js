import { TYPE_NEW_TOKEN, TYPE_TOKEN_SUCCES } from '../actions';

const INITIAL_STATE = '';

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_TOKEN_SUCCES:
    return action.payload;
  case TYPE_NEW_TOKEN:
    return action.payload;
  default:
    return state;
  }
};

export default token;
