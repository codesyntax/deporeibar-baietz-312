import React, { useEffect } from 'react';
import { searchContent } from '@plone/volto/actions';
import { useSelector, useDispatch } from 'react-redux';
import { Segment } from 'semantic-ui-react';
import CountUp from 'react-countup';
import { withBlockExtensions } from '@plone/volto/helpers';
import cx from 'classnames';
import { defineMessages, useIntl } from 'react-intl';

const messages = defineMessages({
  zain: {
    id: 'Zain',
    defaultMessage: 'Zain',
  },
  eginda: {
    id: 'eginda',
    defaultMessage: 'Eginda',
  },
  eginGabe: {
    id: 'eginGabe',
    defaultMessage: 'Egin gabe',
  },
  proposatutakoak: {
    id: 'proposatutakoak',
    defaultMessage: 'Proposatutakoak',
  },
  besteak: {
    id: 'besteak',
    defaultMessage: 'Beste igoerak',
  },
});

const MendiKontaketakBlockView = ({ className }) => {
  const dispatch = useDispatch();
  const intl = useIntl();
  const search = useSelector((state) => state.search.items);

  useEffect(() => {
    dispatch(searchContent('/', { portal_type: 'Mendia', b_size: 999 , review_state: 'published'}));
  }, [dispatch]);

  const zain = search.filter((item) => item.egoera_mendia === 'zain' && item['@id'].includes('/mendiak'));
  const eginda = search.filter((item) => item.egoera_mendia === 'eginda' && item['@id'].includes('/mendiak'));
  const eginGabe = search.filter((item) => item.egoera_mendia === 'egin-gabe' && item['@id'].includes('/mendiak'));
  const proposatutakoak = search.filter((item) =>
    ['proposatutakoa', 'proposatutakoa-eginda'].includes(item.egoera_mendia),
  );
  const besteak = search.filter((item) => item.egoera_mendia === 'eginda' && !item['@id'].includes('/mendiak'));

  const MyCounter = (props) => {
    const { delay = 0, duration = 6, end, title } = props;

    return (
      <div className="counter">
        <Segment basic circular>
          <div className="counter-wrapper">
            <div className="counter-inner">
              <CountUp delay={delay} duration={duration} start={0} end={end} />
              <br />
              <h2>{title}</h2>
            </div>
          </div>
        </Segment>
      </div>
    );
  };

  return (
    <div className={cx('block counters', className)}>
      <MyCounter
        end={zain.length}
        title={intl.formatMessage(messages.zain)}
        description="XXXX"
      />
      <MyCounter
        end={eginda.length}
        title={intl.formatMessage(messages.eginda)}
        description="XXXX"
      />
      <MyCounter
        end={eginGabe.length}
        title={intl.formatMessage(messages.eginGabe)}
        description="XXXX"
      />
      <MyCounter
        end={proposatutakoak.length}
        title={intl.formatMessage(messages.proposatutakoak)}
        description="XXXX"
      />
          <MyCounter
        end={besteak.length}
        title={intl.formatMessage(messages.besteak)}
        description="XXXX"
      />
    </div>
  );
};

export default withBlockExtensions(MendiKontaketakBlockView);
