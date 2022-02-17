const URL = 'https://opentdb.com/api_token.php?command=request';
const URL_ASKS = (token) => `https://opentdb.com/api.php?amount=5&token=${token}`;

export const fetchAPI = async () => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  localStorage.setItem('token', response.token);
  return response;
};

export const fetchAPItest = async () => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  return response;
};

export const fetchAsks = async (token) => {
  const fetchAsks2 = await fetch(URL_ASKS(token));
  const response = await fetchAsks2.json();
  return response;
};
