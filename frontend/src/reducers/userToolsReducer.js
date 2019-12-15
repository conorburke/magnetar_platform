import { FETCH_USER_TOOLS } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_USER_TOOLS:
      return action.payload || state;
    default:
      return state;
  }
}
