// Esse reducer será responsável por tratar o todas as informações relacionadas as despesas

import { CURRENCIES } from '../actions';

const INITIAL_STATE = {
  wallet: {
    currencies: [],
    expenses: [],
  },
};

const walletReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case CURRENCIES:
    return {
      currencies: action.payload,
    };
  default:
    return state;
  }
};

export default walletReducer;
