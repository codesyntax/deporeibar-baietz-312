import React from 'react';

import { egoerak } from '../../utils';

import { FormattedMessage } from 'react-intl';

const MountainRow = ({ item }) => {
  return (
    <tr>
      <td>
        <a href={item['@id']}>{item.Title}</a>
      </td>
      <td>{item.mendizerra}</td>
      <td>{item.altuera}</td>
      <td>{item.mendizaleak}</td>
      <td>{item.igoera_data}</td>
      <td>{egoerak[item.egoera]}</td>
    </tr>
  );
};

export const MountainTable = ({ items }) => {
  return (
    <table className="climbings-table table">
      <thead>
        <tr>
          <th>
            <FormattedMessage id="mendia" defaultMessage="Mendia" />
          </th>
          <th>
            <FormattedMessage id="mendizerra" defaultMessage="Mendizerra" />
          </th>
          <th>
            <FormattedMessage id="altuera" defaultMessage="Altuera" />
          </th>
          <th>
            <FormattedMessage id="mendizalea" defaultMessage="Mendizalea" />
          </th>
          <th>
            <FormattedMessage id="igoeraEguna" defaultMessage="Igoera eguna" />
          </th>
          <th>
            <FormattedMessage id="egoera" defaultMessage="Egoera" />
          </th>
        </tr>
      </thead>
      <tbody>
        {items.map((item) => {
          return <MountainRow item={item} />;
        })}
      </tbody>
    </table>
  );
};
