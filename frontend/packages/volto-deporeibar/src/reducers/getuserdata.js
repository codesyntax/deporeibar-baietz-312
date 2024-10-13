import { GET_USER_DATA } from '../actions/getuserdata';

const initialState = {
  userData: {},
};

export default function users(state = initialState, action = {}) {
  switch (action.type) {
    case `${GET_USER_DATA}_PENDING`:
      return {
        ...state,
        userdata: {
          loading: true,
          loaded: false,
          error: null,
        },
      };
    case `${GET_USER_DATA}_SUCCESS`:
      return {
        ...state,
        userData: action.result,
        userdata: {
          loading: false,
          loaded: true,
          error: null,
        },
      };
    case `${GET_USER_DATA}_FAIL`:
      return {
        ...state,
        userData: {},
        userdata: {
          loading: false,
          loaded: false,
          error: action.error,
        },
      };
    default:
      return state;
  }
}
