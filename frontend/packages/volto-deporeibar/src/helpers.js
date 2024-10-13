import { GET_USER_DATA } from './actions/getuserdata';
import { getUserData } from './actions/getuserdata';

const userdataAsyncPropExtender = {
  path: '/',
  extend: (dispatchActions) => {
    if (
      dispatchActions.filter((asyncAction) => asyncAction.key === GET_USER_DATA)
        .length === 0
    ) {
      dispatchActions.push({
        key: GET_USER_DATA,
        promise: ({ location, store: { dispatch } }) =>
          __SERVER__ && dispatch(getUserData()),
      });
    }
    return dispatchActions;
  },
};

export { userdataAsyncPropExtender };
