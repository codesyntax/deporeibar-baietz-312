export const GET_USER_DATA = 'GET_USER_DATA';

export function getUserData() {
  return {
    type: GET_USER_DATA,
    request: {
      op: 'get',
      path: '/@user-data',
    },
  };
}
