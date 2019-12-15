import { CREATE_PROFILE, SET_PROFILE } from "../actions/types";

export default function(state = {}, action) {
  switch (action.type) {
    case CREATE_PROFILE:
    case SET_PROFILE:
      return action.payload || state;
    default:
      return state;
  }
}
