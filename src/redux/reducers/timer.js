import { TIME_COUNT_DOWN } from '../actions';

const INITIAL_STATE = {
  isTimeOver: false,
  isDisabled: false,
};

const timeDown = (state = INITIAL_STATE, { type, isTimeOver, isDisabled }) => {
  switch (type) {
  case TIME_COUNT_DOWN:
    return {
      ...state,
      isTimeOver,
      isDisabled,
    };
  default: return state;
  }
};

export default timeDown;
