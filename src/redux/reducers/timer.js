import { TIME_COUNT_DOWN } from '../actions';

const INITIAL_STATE = {
  timer: 30,
  isDisabled: false,
};

const timeDown = (state = INITIAL_STATE, { type, timer, isDisabled }) => {
  switch (type) {
  case TIME_COUNT_DOWN:
    return {
      ...state,
      timer,
      isDisabled,
    };
  default: return state;
  }
};

export default timeDown;
