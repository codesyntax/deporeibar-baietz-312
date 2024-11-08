import { getContent } from '@plone/volto/actions';
import { Component, UniversalLink } from '@plone/volto/components';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Dimmer, Loader } from 'semantic-ui-react';
import { Eguna } from '../Eguna';
//import ImageGalleryTemplate from '@plone/volto/components/manage/Blocks/Listing/ImageGallery';
import loadable from '@loadable/component';
import { flattenToAppURL } from '@plone/volto/helpers';
import config from '@plone/volto/registry';
import 'react-image-gallery/styles/css/image-gallery.css';
import { FormattedMessage } from 'react-intl';

import { MendiaDetails } from '../MendiaView/MendiaView';

const ImageGallery = loadable(() => import('react-image-gallery'));

export const ImageGalleryTemplate = ({ items, showThumbnails = false }) => {
  const { settings } = config;
  const renderItems = items.filter(
    (content) =>
      settings.imageObjects.includes(content['@type']) && content.image_field,
  );
  const imagesInfo = renderItems.map((item) => {
    return {
      original: `${flattenToAppURL(item['@id'])}/@@images/${
        item.image_field
      }/large`,
      thumbnail: `${flattenToAppURL(item['@id'])}/@@images/${
        item.image_field
      }/thumb`,
    };
  });

  return (
    renderItems.length > 0 && (
      <ImageGallery
        items={imagesInfo}
        lazyLoad={true}
        showFullscreenButton={false}
        showThumbnails={false}
        showPlayButton={false}
      />
    )
  );
};

export const IgoeraGridListingItemTemplate = (props) => {
  const { item } = props;

  const dispatch = useDispatch();
  const searchSubrequests = useSelector((state) => state.content.subrequests);
  const search = searchSubrequests?.[item.UID];
  const userData = useSelector((state) => state.userdata.userData);

  useEffect(() => {
    dispatch(getContent(item['@id'], '', item.UID));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fullItem = search?.loaded ? search.data : {};

  return fullItem && fullItem?.parent ? (
    <div className="card-container">
      {item.image_field !== '' && (
        <Component
          componentName="PreviewImage"
          item={item}
          alt=""
          className="item-image"
        />
      )}
      <div className="item item-mendia-igoera">
        <div className="content">
          <h2>
            <UniversalLink href={fullItem.parent['@id']}>
              {fullItem.parent.title}
            </UniversalLink>
          </h2>
          <div className="detail-wrapper">
            <MendiaDetails item={fullItem.parent} className="mendia-details" />

            <ul className="igoera-details">
              <li>
                <strong>
                  <FormattedMessage
                    id="mendizalea"
                    defaultMessage="Mendizalea"
                  />
                  :{' '}
                </strong>
                {userData[item.creators[0]] || item.creators[0]}
              </li>
              <li>
                <strong>
                  <FormattedMessage id="noiz" defaultMessage="Noiz" />:{' '}
                </strong>
                <Eguna date={item.eguna} />
              </li>
            </ul>
            {fullItem.oharrak && (
              <p className="igoera-details-oharrak">{fullItem.oharrak}</p>
            )}

            <ImageGalleryTemplate items={fullItem.items} />
          </div>
        </div>
      </div>
    </div>
  ) : (
    <Dimmer active>
      <Loader />
    </Dimmer>
  );
};
