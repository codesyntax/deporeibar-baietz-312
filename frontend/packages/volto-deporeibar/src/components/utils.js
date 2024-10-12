import { Label } from 'semantic-ui-react';

import eginGabePNG from '../icons/marker-blue.png';
import egindaPNG from '../icons/marker-green.png';
import zainPNG from '../icons/marker-gold.png';
import proposatutakoaPNG from '../icons/marker-red.png';

import { FormattedMessage } from 'react-intl';
export const egoerak = {
  'egin-gabe': (
    <Label color="red" as="button">
      <FormattedMessage id="eginGabe" defaultMessage="Egin gabe" />
    </Label>
  ),
  eginda: (
    <Label color="green" as="button">
      {' '}
      <FormattedMessage id="eginda" defaultMessage="Eginda" />
    </Label>
  ),
  zain: (
    <Label color="teal" as="button">
      <FormattedMessage id="zain" defaultMessage="Zain" />
    </Label>
  ),
  'bertan-behera': (
    <Label color="violet" as="button">
      <FormattedMessage id="bertanBehera" defaultMessage="Bertan behera" />
    </Label>
  ),
  proposatutakoa: (
    <Label color="orange" as="button">
      <FormattedMessage id="propossatutakoa" defaultMessage="Proposatutakoa" />
    </Label>
  ),
  'proposatutakoa-eginda': (
    <Label color="olive" as="button">
      <FormattedMessage
        id="propossatutakoaEginda"
        defaultMessage="Proposatutakoa eginda"
      />
    </Label>
  ),
  'eginda-baliogabe': (
        <Label color="brown" as="button">
      <FormattedMessage
        id="egindaBaliogabe"
        defaultMessage="Eginda balio gabe"
      />
    </Label>
  )
};

export const icons = {
  'egin-gabe': eginGabePNG,
  eginda: egindaPNG,
  zain: zainPNG,
  proposatutakoa: proposatutakoaPNG,
  'proposatutakoa-eginda': proposatutakoaPNG,
};

export const mapStyle = {
  version: 8,
  sources: {
    osm: {
      type: 'raster',
      tiles: ['https://a.tile.openstreetmap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; OpenStreetMap Contributors | Kartendarstellung &copy; OpenTopoMap (CC-BY-SA)',
      maxzoom: 19,
    },
    topo: {
      type: 'raster',
      tiles: ['https://a.tile.opentopomap.org/{z}/{x}/{y}.png'],
      tileSize: 256,
      attribution:
        '&copy; OpenStreetMap Contributors | Kartendarstellung &copy; OpenTopoMap (CC-BY-SA)',
      maxzoom: 19,
    },
  },
  layers: [
    {
      id: 'osm',
      type: 'raster',
      source: 'osm', // This must match the source key above
    },
  ],
};

export const DEFAULT_ONE_ITEM_ZOOM = 5;

export const egoeraColors = {
  zain: '#ffd326',
  eginda: '#33b02c',
};

export const RenderMendizaleakP = ({ mendizaleak }) => {
  return mendizaleak ? (
    <p>
      {mendizaleak.split('\n').map((mendizalea) => {
        return (
          <>
            <span>{mendizalea}</span>
            <br />
          </>
        );
      })}
    </p>
  ) : (
    <span>Ez dago daturik</span>
  );
};

export const RenderMendizaleakList = ({ mendizaleak }) => {
  return mendizaleak ? (
    <ul>
      {mendizaleak.split('\n').map((mendizalea) => {
        return <li>{mendizalea}</li>;
      })}
    </ul>
  ) : (
    <span>Ez dago daturik</span>
  );
};

export const RenderMendizaleakComma = ({ mendizaleak }) => {
  return mendizaleak ? (
    mendizaleak.split('\n').join(', ')
  ) : (
    <span>Ez dago daturik</span>
  );
};
