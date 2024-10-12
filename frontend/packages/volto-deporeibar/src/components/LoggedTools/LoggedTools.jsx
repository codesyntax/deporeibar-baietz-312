import { useSelector } from 'react-redux';
import jwtDecode from 'jwt-decode';
import { UniversalLink } from '@plone/volto/components';

import { FormattedMessage } from 'react-intl';
export const LoggedTools = (props) => {
  const token = useSelector((state) => state?.userSession?.token);
  const userData = useSelector((state) => state.userdata?.userData);

  const user = token ? jwtDecode(token) : null;
  return (
    <>
      <p className="hello-fullname">
        <FormattedMessage
          id="kaixo"
          defaultMessage="Kaixo {fullname}"
          values={{ fullname: userData ? userData[user.sub] : user.sub }}
        />
      </p>
      <UniversalLink href="/logout">
        <FormattedMessage id="irten" defaultMessage="Irten" />
      </UniversalLink>
    </>
  );
};
