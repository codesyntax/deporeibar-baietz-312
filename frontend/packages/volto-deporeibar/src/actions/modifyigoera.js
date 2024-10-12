import { nestContent } from '@plone/volto/helpers';
export const MODIFY_IGOERA = 'MODIFY_IGOERA';

export function modifyIgoera(urls, content, headers = {}, subrequest) {
  return {
    type: MODIFY_IGOERA,
    request:
      typeof urls === 'string'
        ? {
            op: 'patch',
            path: `${urls}/@modify-igoera`,
            data: nestContent(content),
            headers: headers,
          }
        : urls.map((url, index) => ({
            op: 'patch',
            path: `${url}/@modify-igoera`,
            data: nestContent(content[index]),
            headers: headers,
          })),
    subrequest: subrequest,
  };
}
