import { TYPE_USER_INFOS } from '../actions';

const INITIAL_STATE = {
  name: '',
  assertions: 0,
  score: 0,
  gravatarEmail: '',
};

const player = (state = INITIAL_STATE, {
  type,
  name,
  assertions,
  score,
  gravatarEmail,
}) => {
  switch (type) {
  case TYPE_USER_INFOS:
    return {
      ...state,
      name,
      assertions,
      score,
      gravatarEmail,
    };
  default: return state;
  }
};

export default player;
