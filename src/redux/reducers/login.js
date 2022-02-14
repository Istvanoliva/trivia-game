import { TYPE_EMAIL, TYPE_NAME } from '../actions';

const INITIAL_STATE = {
  nome: '',
  email: '',
};

const loginRedux = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case TYPE_NAME:
    return {
      ...state,
      nome: payload,
    };
  case TYPE_EMAIL:
    return {
      ...state,
      email: payload,
    };
  default:
    return state;
  }
};

export default loginRedux;
