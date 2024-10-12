// SemanticUI-free pre-@plone/components
import { defineMessages, useIntl } from 'react-intl';
import { useSelector } from 'react-redux';
import config from '@plone/volto/registry';
import { UniversalLink } from '@plone/volto/components';
import { toBackendLang } from '@plone/volto/helpers';
import LogoImage from '@plone/volto/components/theme/Logo/Logo.svg';
import { flattenToAppURL } from '@plone/volto/helpers';

const messages = defineMessages({
  site: {
    id: 'Baietz 312 mendi!',
    defaultMessage: 'Baietz 312 mendi!',
  }
});

const Logo = () => {
  const { settings } = config;
  const lang = useSelector((state) => state.intl.locale);
  const intl = useIntl();
  const site = useSelector((state) => state.site.data);

  const logoUrl =
    settings.defaultLanguage === lang
      ? flattenToAppURL('/')
      : flattenToAppURL(`/${toBackendLang(lang)}`);

  return (
    <UniversalLink href={logoUrl} title={intl.formatMessage(messages.site)}>
      <img
        src={
          site['plone.site_logo']
            ? flattenToAppURL(site['plone.site_logo'])
            : LogoImage
        }
        alt={intl.formatMessage(messages.site)}
        title={intl.formatMessage(messages.site)}
      />
    </UniversalLink>
  );
};

export default Logo;
