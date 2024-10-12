import { MapLibre } from '@codesyntax/volto-maplibre-block/components';
import { UniversalLink } from '@plone/volto/components';
import { egoerak } from '../utils';
import { icons } from '../utils';

const decorate = (item, zoom = null) => {
  let data = {
    latitude: parseFloat(item.lat),
    longitude: parseFloat(item.lon),
    title: (
      <>
        <UniversalLink item={item}>{item.title}</UniversalLink> <br />
        {egoerak[item.egoera || item.egoera_mendia]}
      </>
    ),
    marker: icons[item.egoera || item.egoera_mendia],
  };

  return zoom ? { ...data, zoom: zoom } : data;
};

export const Mapa = (props) => {
  const { items = [], item = null } = props;

  const center = {
    latitude: 39.91395,
    longitude: -3.707886,
    zoom: 5,
  };

  const markers = items.map(decorate);

  const mapLibreOptions = {
    ...(markers.length > 0 && { markers: markers }),
    ...(markers.length === 0 && item && { marker: decorate(item, 12) }),
  };

  return (
    <MapLibre
      {...mapLibreOptions}
      center={markers.length > 1 ? center : item ? decorate(item, 12) : center}
      fitBounds={true}
    />
  );
};
