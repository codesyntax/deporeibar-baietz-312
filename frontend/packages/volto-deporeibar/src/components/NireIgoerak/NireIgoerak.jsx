/* eslint-disable react-hooks/exhaustive-deps */
import { searchContent } from '@plone/volto/actions';
import { UniversalLink } from '@plone/volto/components';
import jwtDecode from 'jwt-decode';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import { IgoerarenXehetasunak } from './IgoerarenXehetasunak';
import { FormattedMessage } from 'react-intl';
import { Component } from '@plone/volto/components';

export const NireIgoerak = (props) => {
  const userToken = useSelector((state) => state.userSession.token);
  const userName = userToken ? jwtDecode(userToken).sub : '';

  const userData = useSelector((state) => state.userdata.userData);

  const dispatch = useDispatch();

  const getMyIgoerak = () => {
    dispatch(
      searchContent(
        '/',
        {
          portal_type: 'Igoera',
          Creator: userName,
          fullobjects: true,
          sort_on: 'created',
        },
        userName, // subrequest
      ),
    );
  };

  useEffect(() => {
    userName && getMyIgoerak();
  }, []);

  const igoerak = useSelector(
    (state) => state.search?.subrequests[userName]?.items,
  );

  return (
    <Component componentName="Container">
      {userToken ? (
        <>
          <h2>
            <FormattedMessage id="mendizalea" defaultMessage="Mendizalea" />:{' '}
            {userData[userName]}
          </h2>
          {igoerak && igoerak.length > 0 ? (
            <>
              <h2>
                <FormattedMessage
                  id="zureIgoerak"
                  defaultMessage="Zure igoerak"
                />
              </h2>
              <Component componentName="Container">
                {igoerak.map((item, index) => {
                  return (
                    <IgoerarenXehetasunak
                      key={index}
                      item={item}
                      onUpdate={() => getMyIgoerak()}
                    />
                  );
                })}
              </Component>
            </>
          ) : (
            <FormattedMessage
              id="igoerarikEz"
              defaultMessage="Ez duzu igoerarik"
            />
          )}
        </>
      ) : (
        <Segment>
          <FormattedMessage
            id="sartuIgoerakIkusteko"
            defaultMessage="Zure igoerak ikusteko {sartu} egin behar zara"
            values={{
              sartu: (
                <UniversalLink href="/login">
                  <FormattedMessage id="sartu" defaultMessage="sartu" />
                </UniversalLink>
              ),
            }}
          />
        </Segment>
      )}
    </Component>
  );
};
