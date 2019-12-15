import { SET_RENT_END_DATE, SET_RENT_START_DATE } from "../actions/types";

const initialState = {
  endDate: "",
  startDate: ""
};

export default function(state = initialState, action) {
  console.log("rent reducer", state);
  console.log(action.type);
  switch (action.type) {
    case SET_RENT_END_DATE:
      return { ...state, ...{ endDate: action.payload } };
    case SET_RENT_START_DATE:
      return { ...state, ...{ startDate: action.payload } };
    default:
      return state;
  }
}
