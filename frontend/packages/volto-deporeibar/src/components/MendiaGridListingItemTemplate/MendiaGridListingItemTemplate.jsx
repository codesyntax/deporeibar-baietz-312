import { UniversalLink, Component } from '@plone/volto/components';
import { egoerak } from '../utils';

import { MendiaDetails } from '../MendiaView/MendiaView';

export const MendiaGridListingItemTemplate = (props) => {
  const { item } = props;
  return (
    <div className="card-container">
      {item.image_field !== '' && (
        <Component
          componentName="PreviewImage"
          item={item}
          alt=""
          className="item-image"
        />
      )}
      <div className="item item-mendia">
        <div className="content">
          {item?.head_title && (
            <div className="headline">{item.head_title}</div>
          )}

          <h2>
            <UniversalLink item={item}>{item.title || item.id}</UniversalLink>
          </h2>

          <MendiaDetails item={item} className="mendia-details" />

          {egoerak[item.egoera_mendia]}

          {!item.hide_description && <p>{item?.description}</p>}
        </div>
      </div>
    </div>
  );
};
