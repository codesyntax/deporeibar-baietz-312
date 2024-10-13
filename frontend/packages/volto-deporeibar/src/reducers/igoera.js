import { map, mapKeys, omit } from 'lodash';

import { flattenToAppURL } from '@plone/volto/helpers';
import { ADD_IGOERA } from '../actions/addigoera';
import { MODIFY_IGOERA } from '../actions/modifyigoera';

const initialState = {
  add: {
    loaded: false,
    loading: false,
    error: null,
  },
  modify: {
    loaded: false,
    loading: false,
    error: null,
  },
  subrequests: {},
};

/**
 * Get request key
 * @function getRequestKey
 * @param {string} actionType Action type.
 * @returns {string} Request key.
 */
function getRequestKey(actionType) {
  return actionType.split('_')[0].toLowerCase();
}

export default function content(state = initialState, action = {}) {
  let { result } = action;
  switch (action.type) {
    case `${ADD_IGOERA}_PENDING`:
    case `${MODIFY_IGOERA}_PENDING`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                ...(state.subrequests[action.subrequest] || {
                  data: null,
                }),
                loaded: false,
                loading: true,
                error: null,
              },
            },
          }
        : {
            ...state,
            [getRequestKey(action.type)]: {
              loading: true,
              loaded: false,
              error: null,
            },
          };
    case `${ADD_IGOERA}_SUCCESS`:
      if (result['@static_behaviors']) {
        map(result['@static_behaviors'], (behavior) => {
          result = {
            ...omit(result, behavior),
            ...mapKeys(result[behavior], (value, key) => `${behavior}.${key}`),
          };
        });
      }
      const data = action.subrequest
        ? Array.isArray(result)
          ? result.map((item) => ({
              ...item,
              url: flattenToAppURL(item['@id']),
            }))
          : {
              ...result,
              items:
                action.result &&
                action.result.items &&
                action.result.items.map((item) => ({
                  ...item,
                  url: flattenToAppURL(item['@id']),
                })),
            }
        : {
            ...result,
            items:
              action.result &&
              action.result.items &&
              action.result.items.map((item) => ({
                ...item,
                url: flattenToAppURL(item['@id']),
              })),
          };
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: null,
                data,
              },
            },
          }
        : {
            ...state,
            data,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: true,
              error: null,
            },
          };
    case `${MODIFY_IGOERA}_SUCCESS`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: true,
                error: null,
              },
            },
          }
        : {
            ...state,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: true,
              error: null,
              sort: {
                on: action.sort?.on,
                order: action.sort?.order,
              },
            },
          };
    case `${ADD_IGOERA}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                data: null,
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            data: null,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: false,
              error: action.error,
            },
          };
    case `${MODIFY_IGOERA}_FAIL`:
      return action.subrequest
        ? {
            ...state,
            subrequests: {
              ...state.subrequests,
              [action.subrequest]: {
                loading: false,
                loaded: false,
                error: action.error,
              },
            },
          }
        : {
            ...state,
            [getRequestKey(action.type)]: {
              loading: false,
              loaded: false,
              error: action.error,
            },
          };
    default:
      return state;
  }
}
