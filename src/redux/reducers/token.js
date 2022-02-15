import { TYPE_ERROR, TYPE_TOKEN, TYPE_TOKEN_SUCCES } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenRedux = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case TYPE_TOKEN:
    return { ...state };
  case TYPE_TOKEN_SUCCES:
    return action.payload.token;
  case TYPE_ERROR:
    return {
      ...state,
      token: action.payload,
    };
  default:
    return state;
  }
};

export default tokenRedux;
