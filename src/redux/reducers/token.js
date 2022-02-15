import { TYPE_ERROR, TYPE_TOKEN, TYPE_TOKEN_SUCCES } from '../actions';

const INITIAL_STATE = {
  token: '',
  error: '',
};

const token = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_TOKEN:
    return { ...state };
  case TYPE_TOKEN_SUCCES:
    return action.payload;
  case TYPE_ERROR:
    return {
      ...state,
      error: action.payload,
    };
  default:
    return state;
  }
};

export default token;
