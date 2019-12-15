import { FETCH_TOOL } from "../actions/types";

export default function(state = [], action) {
  switch (action.type) {
    case FETCH_TOOL:
      return action.payload || state;
    default:
      return state;
  }
}
