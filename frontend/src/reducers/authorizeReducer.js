import { AUTHORIZE_USER } from '../actions/types';

export default function(state = false, action) {
  switch (action.type) {
    case AUTHORIZE_USER:
      if (action.payload === false) {
        return false;
      }
      return action.payload || state;
    default:
      return state;
  }
}
