export const TYPE_NAME = 'TYPE_NAME';
export const TYPE_EMAIL = 'TYPE_EMAIL';

export const loginName = (nome) => ({
  type: TYPE_NAME,
  payload: nome,
});

export const loginEmail = (email) => ({
  type: TYPE_EMAIL,
  payload: email,
});
