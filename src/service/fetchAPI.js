const URL = 'https://opentdb.com/api_token.php?command=request';

const fetchAPI = async () => {
  const fetchURL = await fetch(URL);
  const response = await fetchURL.json();
  const { token } = response;
  return token;
};

export default fetchAPI;
