import React, { useEffect } from 'react';

import { Container } from 'semantic-ui-react';
//import {Container} from '@plone/components';
import { getContent } from '@plone/volto/actions';
import { UniversalLink } from '@plone/volto/components';
import { expandToBackendURL } from '@plone/volto/helpers';
import jwtDecode from 'jwt-decode';
import { FormattedMessage } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { Table, TableCell, TableHeaderCell, TableRow } from 'semantic-ui-react';
import { Eguna } from '../Eguna';
import { Erreserbatu } from '../Erreserbatu';
import { Mapa } from '../Mapa/Mapa';
import { IgoerarenXehetasunak } from '../NireIgoerak/IgoerarenXehetasunak';
import { RenderMendizaleakComma, egoerak } from '../utils';

export const MendiaDetails = (props) => {
  const { heading = null, item, className = '' } = props;

  const besteIzenakClean = (value) => {
    return value
      ? value
          .split('\n')
          .filter((item) => item)
          .sort()
          .join(', ')
      : '';
  };

  return (
    <>
      {heading && <heading>{item.title}</heading>}
      <ul className={className}>
        {besteIzenakClean(item.beste_izenak) && (
          <li>
            <strong>
              <FormattedMessage
                id="besteIzenak"
                defaultMessage="Beste izenak"
              />
            </strong>
            : <span>{besteIzenakClean(item.beste_izenak)}</span>
          </li>
        )}
        <li>
          <strong>
            <FormattedMessage id="altuera" defaultMessage="Altuera" />
          </strong>
          : <span>{parseInt(item.altuera)}</span>
        </li>
        <li>
          <strong>
            <FormattedMessage id="mendizerra" defaultMessage="Mendizerra" />
          </strong>
          : <span>{item.mendizerra}</span>
        </li>
        <li>
          <strong>
            <FormattedMessage id="sektorea" defaultMessage="Sektorea" />
          </strong>
          : <span>{item.sektorea}</span>
        </li>
      </ul>
    </>
  );
};

export const MendiaView = (props) => {
  const { content } = props;

  const dispatch = useDispatch();
  const fullobjects = true;
  const subrequest = 'subitems';

  const getIgoerak = () => {
    dispatch(
      getContent(
        expandToBackendURL(content['@id']),
        null,
        subrequest,
        null,
        fullobjects,
      ),
    );
  };

  useEffect(() => {
    getIgoerak();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch, content, fullobjects]);

  const token = useSelector((state) => state?.userSession?.token);
  const user = token ? jwtDecode(token) : null;

  const edukiak = useSelector(
    (state) => state.content?.subrequests[subrequest]?.data?.items || [],
  );

  const igoerak = edukiak.filter((item) => item['@type'] === 'Igoera');

  const userData = useSelector((state) => state.userdata.userData);

  return (
    <Container>
      <h1 className="documentFirstHeading">{content.title}</h1>

      <MendiaDetails item={content} />

      <Erreserbatu
        item={content}
        onUpdate={() => {
          getIgoerak();
        }}
      />

      <br />

      <br />

      <Mapa item={content} />

      {igoerak.length > 0 && (
        <Table>
          <Table.Header>
            <TableRow>
              <TableHeaderCell>
                <FormattedMessage
                  id="erreserbaData"
                  defaultMessage="Erreserba data"
                />
              </TableHeaderCell>
              <TableHeaderCell>
                <FormattedMessage id="mendizalea" defaultMessage="Mendizalea" />
              </TableHeaderCell>
              <TableHeaderCell>
                {' '}
                <FormattedMessage id="noiz" defaultMessage="Noiz" />
              </TableHeaderCell>
              <TableHeaderCell>
                <FormattedMessage id="egoera" defaultMessage="Egoera" />
              </TableHeaderCell>
              <TableHeaderCell>
                {' '}
                <FormattedMessage id="oharrak" defaultMessage="Oharrak" />
              </TableHeaderCell>
              <TableHeaderCell>
                {' '}
                <FormattedMessage id="ikusi" defaultMessage="Ikusi" />
              </TableHeaderCell>
            </TableRow>
          </Table.Header>
          <Table.Body>
            {igoerak.map((item, index) => {
              return (
                <Table.Row key={index}>
                  <TableCell>
                    <Eguna date={item?.created} />
                  </TableCell>
                  <TableCell>
                    {userData?.[item.creators[0]] || item.creators[0]}
                  </TableCell>
                  <TableCell>
                    <Eguna date={item?.egindako_eguna || item.eguna} />
                  </TableCell>
                  <TableCell>{egoerak[item.egoera.token]}</TableCell>
                  <TableCell>
                    {item.mendizaleak ? (
                      <RenderMendizaleakComma mendizaleak={item.mendizaleak} />
                    ) : (
                      item.oharrak
                    )}
                  </TableCell>
                  <TableCell>
                    <UniversalLink item={item}>
                      <FormattedMessage id="ikusi" defaultMessage="Ikusi" />
                    </UniversalLink>

                    {item.creators[0] === user?.sub && (
                      <IgoerarenXehetasunak
                        item={item}
                        onlyactions={true}
                        onUpdate={() => {
                          getIgoerak();
                        }}
                      />
                    )}
                  </TableCell>
                </Table.Row>
              );
            })}
          </Table.Body>
        </Table>
      )}
    </Container>
  );
};
