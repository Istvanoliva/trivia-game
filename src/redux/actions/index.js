import fetchAPI from '../../service/fetchAPI';

export const TYPE_NAME = 'TYPE_NAME';
export const TYPE_EMAIL = 'TYPE_EMAIL';
export const TYPE_TOKEN = 'TYPE_TOKEN';
export const TYPE_TOKEN_SUCCES = 'TYPE_TOKEN_SUCCES';
export const TYPE_ERROR = 'TYPE_ERROR';

export const TYPE_USER_INFOS = 'TYPE_USER_INFOS';

export const loginName = (nome) => ({
  type: TYPE_NAME,
  payload: nome,
});

export const loginEmail = (email) => ({
  type: TYPE_EMAIL,
  payload: email,
});

export const tokenAPI = () => ({
  type: TYPE_TOKEN,
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
    const response = await fetchAPI();
    return dispatch(tokenAPISucces(response));
  } catch (error) {
    dispatch(tokenAPIError(error));
  }
};

export const userInfos = ( name, assertions, score, gravatarEmail ) => ({
  type: TYPE_USER_INFOS,
  name,
  assertions,
  score,
  gravatarEmail,
});
