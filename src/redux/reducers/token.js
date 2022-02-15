import { TYPE_TOKEN } from '../actions';

const INITIAL_STATE = {
  token: '',
};

const tokenRedux = (state = INITIAL_STATE, { type, payload }) => {
  switch (type) {
  case TYPE_TOKEN:
    return {
      ...state,
      payload,
    };
  default:
    return state;
  }
};

export default tokenRedux;
