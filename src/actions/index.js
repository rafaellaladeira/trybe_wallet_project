// Coloque aqui suas actions

export const EMAIL = 'EMAIL';
export const CURRENCIES = 'CURRENCIES';

export const emailForm = (value) => (
  {
    type: EMAIL,
    value,
  });

export const currenciesForm = (payload) => (
  {
    type: CURRENCIES,
    payload,
  }
);

export const fetchCurrencies = async (dispatch) => {
  const response = await fetch('https://economia.awesomeapi.com.br/json/all');
  const data = await response.json();
  const keys = Object.keys(data);
  keys.splice(1, 1);
  dispatch(currenciesForm(keys));
};

export const fetchAPI = () => fetchCurrencies;
