import { RECEIVE_CURRENT_USER } from '../actions/auth';

const _nullUser = {currentUser: null};

export default (state = _nullUser, action) => {
  Object.freeze(state);

  switch (action.type) {
    case RECEIVE_CURRENT_USER:
      const currentUser = action.user;
      return {currentUser};
    default:
      return state;
  }
};
