import { fetchAPI } from '../../service/fetchAPI';

export const TYPE_NAME = 'TYPE_NAME';
export const TYPE_EMAIL = 'TYPE_EMAIL';
export const TYPE_TOKEN = 'TYPE_TOKEN';
export const TYPE_TOKEN_SUCCES = 'TYPE_TOKEN_SUCCES';
export const TYPE_ERROR = 'TYPE_ERROR';
export const TYPE_NEW_TOKEN = 'TYPE_NEW_TOKEN';
export const TYPE_SAVE_SCORE = 'TYPE_SAVE_SCORE';
export const TYPE_USER_INFOS = 'TYPE_USER_INFOS';
export const TIME_COUNT_DOWN = 'TIME_COUNT_DOWN';

export const newTokenRedux = (newToken) => ({
  type: TYPE_NEW_TOKEN,
  payload: newToken,
});

export const loginName = (nome) => ({
  type: TYPE_NAME,
  payload: nome,
});

export const loginEmail = (email) => ({
  type: TYPE_EMAIL,
  payload: email,
});

export const tokenAPISucces = (token) => ({
  type: TYPE_TOKEN_SUCCES,
  payload: token,
});

export const tokenAPIError = (error) => ({
  type: TYPE_ERROR,
  payload: error,
});

export const tokenThunk = () => async (dispatch) => {
  try {
    const getStorageToken = localStorage.getItem('token');
    if (getStorageToken) {
      dispatch(tokenAPISucces(getStorageToken));
    } else {
      const response = await fetchAPI();
      dispatch(tokenAPISucces(response.token));
    }
  } catch (error) {
    dispatch(tokenAPIError(error));
  }
};

export const userInfos = (name, assertions, score, gravatarEmail) => ({
  type: TYPE_USER_INFOS,
  name,
  assertions,
  score,
  gravatarEmail,
});

export const timeCountDown = (isTimeOver, isDisabled) => ({
  type: TIME_COUNT_DOWN,
  isTimeOver,
  isDisabled,
});
