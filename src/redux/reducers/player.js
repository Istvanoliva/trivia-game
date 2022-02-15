import { TYPE_USER_INFOS } from "../actions";

const INITIAL_STATE = {
    name: '',
    assertions: '',
    score: 0,
    gravatarEmail: '',
};

const player = (state = INITIAL_STATE, { type, name, assertions, score, gravatarEmail }) => {
  switch(type) {
    case TYPE_USER_INFOS:
    return {
      ...state,
      name: name,
      assertions: assertions,
      score: score,
      gravatarEmail: gravatarEmail,
    }
    default: return state;
  }
};

export default player;
