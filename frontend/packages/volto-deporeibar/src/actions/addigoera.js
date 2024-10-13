import { nestContent } from '@plone/volto/helpers';
export const ADD_IGOERA = 'ADD_IGOERA';

export function addIgoera(url, content, subrequest) {
  return {
    type: ADD_IGOERA,
    subrequest,
    mode: 'serial',

    request: Array.isArray(content)
      ? content.map((item) => ({
          op: 'post',
          path: `${url}/@add-igoera`,
          data: item,
        }))
      : { op: 'post', path: `${url}/@add-igoera`, data: nestContent(content) },
  };
}
