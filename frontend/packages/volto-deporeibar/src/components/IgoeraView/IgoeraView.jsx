import React from 'react';

import { Container } from 'semantic-ui-react';

import { useSelector } from 'react-redux';
import { Eguna } from '../Eguna';

import ImageGalleryTemplate from '@plone/volto/components/manage/Blocks/Listing/ImageGallery';
import { RenderMendizaleakList } from '../utils';
import { FormattedMessage } from 'react-intl';

export const IgoeraView = (props) => {
  const { content } = props;

  const userData = useSelector((state) => state.userdata.userData);

  return (
    <Container>
      <h1 className="documentFirstHeading">{content.parent.title}</h1>

      {content.egindako_eguna ? (
        <p>
          <strong>
            {' '}
            <FormattedMessage id="igoeraEguna" defaultMessage="Igoera eguna" />
          </strong>
          : <Eguna date={content.egindako_eguna} />
        </p>
      ) : (
        <p>
          <strong>
            {' '}
            <FormattedMessage
              id="erreserbatutakoEguna"
              defaultMessage="Erreserbatutako eguna"
            />
          </strong>
          : <Eguna date={content.eguna} />
        </p>
      )}

      {content.mendizaleak ? (
        <p>
          <strong>
            {' '}
            <FormattedMessage id="mendizaleak" defaultMessage="Mendizaleak" />
          </strong>
          <RenderMendizaleakList mendizaleak={content.mendizaleak} />
        </p>
      ) : (
        <p>
          <strong>
            {' '}
            <FormattedMessage
              id="erreserbaEginDuena"
              defaultMessage="Erreserba egin duena"
            />
          </strong>
          : {userData[content.creators[0]]}
        </p>
      )}

      {content.oharrak && (
        <p>
          <strong>
            {' '}
            <FormattedMessage id="oharrak" defaultMessage="Oharrak" />:
          </strong>{' '}
          {content.oharrak}
        </p>
      )}

      {content.items && <ImageGalleryTemplate items={content.items} />}
    </Container>
  );
};
