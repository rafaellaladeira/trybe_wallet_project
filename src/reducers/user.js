import { EMAIL } from '../actions/index';

const INITIAL_STATE = {
  user: {
    email: '',
  },
};

const userReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
  case EMAIL:
    return {
      email: action.value,
    };
  default:
    return state;
  }
};

export default userReducer;
