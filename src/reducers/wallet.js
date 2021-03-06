// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCIES, EXPENSES } from '../actions';

const INITIAL_STATE = {
  currencies: [],
  expenses: [],
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      ...state,
      currencies: action.payload,
    };
  case EXPENSES:
    return {
      ...state,
      expenses: [...state.expenses, action.value],
    };
  default:
    return state;
  }
};

export default walletReducer;
