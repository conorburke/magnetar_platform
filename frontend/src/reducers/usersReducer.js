import { FETCH_USERS, FILTER_USERS, SET_EMAIL } from "../actions/types";

const initialState = {
  usersList: [],
  usersSearch: "",
  email: ""
};

export default function(state = initialState, action) {
  switch (action.type) {
    case FETCH_USERS:
      return { ...state, ...{ usersList: action.payload.data.users } };
    case FILTER_USERS:
      return { ...state, ...{ usersSearch: action.payload } };
    case SET_EMAIL:
      return { ...state, ...{ email: action.payload } };
    default:
      return state;
  }
}
