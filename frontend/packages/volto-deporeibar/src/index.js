import { NireIgoerakBlockEdit } from './components/Blocks/NireIgoerak/Edit';
import { NireIgoerakBlockView } from './components/Blocks/NireIgoerak/View';
import MendiKontaketakBlockView from './components/Blocks/MendiKontaketa/View';
import { MendiKontaketakBlockEdit } from './components/Blocks/MendiKontaketa/Edit';
import { IgoeraView } from './components/IgoeraView';
import { MendiakMapListingBlockTemplate } from './components/MendiakListingBlockTemplate';
import { MendiaView } from './components/MendiaView/MendiaView';
import sliderSVG from '@plone/volto/icons/slider.svg';
import RightColumnFacets from '@plone/volto/components/manage/Blocks/Search/layout/RightColumnFacets';
import LeftColumnFacets from '@plone/volto/components/manage/Blocks/Search/layout/LeftColumnFacets';
import TopSideFacets from '@plone/volto/components/manage/Blocks/Search/layout/TopSideFacets';

import reducers from './reducers';
import { userdataAsyncPropExtender } from './helpers';
import { defaultStylingSchema } from '@kitconcept/volto-light-theme/components/Blocks/schema';

import SearchBlockSchema from '@plone/volto/components/manage/Blocks/Search/schema';

import { MendiaGridListingItemTemplate } from './components/MendiaGridListingItemTemplate';
import { IgoeraGridListingItemTemplate } from './components/IgoeraGridListingItemTemplate';
import CustomGridTemplate from './components/Blocks/Listing/GridTemplate';
import { flattenToAppURL } from '@plone/volto/helpers';
import { egoeraColors } from './components/utils';

const searchBlockSchemaEnhancer = ({ schema, formData, intl }) => {
  //schema.properties.showSortOn.default = true;
  //schema.fieldsets = schema.fieldsets.filter((item) => item.id !== 'views');

  return schema;
};

const BG_COLORS = [
  { name: 'transparent', label: 'Transparent' },
  { name: 'grey', label: 'Grey' },
];

const applyConfig = (config) => {
  // Extra variations for listing & Search
  config.blocks.blocksConfig.listing.variations = [
    ...config.blocks.blocksConfig.listing.variations,
    {
      id: 'mendiakmap',
      isDefault: false,
      title: 'Mendiak (mapa)',
      template: MendiakMapListingBlockTemplate,
    },
    {
      id: 'customgrid',
      title: 'Grid (custom)',
      template: CustomGridTemplate,
      schemaEnhancer: ({ schema, formData, intl }) => {
        schema.properties.wrapperLink = {
          type: 'boolean',
          title: 'Add a wrapper link?',
        };
        schema.fieldsets[0].fields.push('wrapperLink');
        return schema;
      },
    },
  ];

  // Views
  config.views.contentTypesViews.Mendia = MendiaView;
  config.views.contentTypesViews.Igoera = IgoeraView;

  // Own blocks
  config.blocks.blocksConfig['nireIgoerakBlock'] = {
    id: 'nireIgoerakBlock',
    title: 'Nire Igoerak',
    icon: sliderSVG,
    edit: NireIgoerakBlockEdit, // or simply omit it
    view: NireIgoerakBlockView, // or simply omit it
    common: true,
    // ... the rest of the settings
  };

  config.blocks.blocksConfig['mendiKontaketakBlock'] = {
    id: 'mendiKontaketakBlock',
    title: 'Mendi Kontaketak',
    icon: sliderSVG,
    edit: MendiKontaketakBlockEdit, // or simply omit it
    view: MendiKontaketakBlockView, // or simply omit it
    common: true,
    // ... the rest of the settings
    schemaEnhancer: defaultStylingSchema,
  };

  config.blocks.blocksConfig.search = {
    ...config.blocks.blocksConfig.search,
    schema: SearchBlockSchema,
    schemaEnhancer: searchBlockSchemaEnhancer,

    variations: [
      ...config.blocks.blocksConfig.search.variations,
      {
        id: 'facetsRightSide',
        title: 'Facets on right side',
        view: RightColumnFacets,
        isDefault: false,
      },
      {
        id: 'facetsLeftSide',
        title: 'Facets on left side',
        view: LeftColumnFacets,
        isDefault: false,
      },
      {
        id: 'facetsTopSideOriginal',
        title: 'Facets on top (original)',
        view: TopSideFacets,
        isDefault: false,
      },
    ],
  };

  config.blocks.blocksConfig.gridBlock.allowedBlocks.push('__button');
  config.blocks.blocksConfig.gridBlock.allowedBlocks.push('countUpBlock');

  config.blocks.blocksConfig.columnsBlock.schemaEnhancer = defaultStylingSchema;
  config.blocks.blocksConfig.columnsBlock.colors = BG_COLORS;

  config.blocks.blocksConfig.fullcalendar.contentConverters['Igoera'] = (
    item,
  ) => {
    return {
      title: `${item.igoera_mendia_izena} (${
        item.mendia_igo_duena || item.erreserba_egilea
      })`,
      start: item.egindako_eguna || item.eguna,
      end: item.egindako_eguna || item.eguna,
      url: `${flattenToAppURL(item['@id'])}/../`,
      backgroundColor: egoeraColors[item.egoera_igoera],
      borderColor: egoeraColors[item.egoera_igoera],
      textColor: '#000',
    };
  };
  // Config Volto Light
  config.settings.enableFatMenu = false;

  // Custom template for Grid Variation
  config.registerComponent({
    name: 'GridListingItemTemplate',
    component: MendiaGridListingItemTemplate,
    dependencies: 'Mendia',
  });

  config.registerComponent({
    name: 'GridListingItemTemplate',
    component: IgoeraGridListingItemTemplate,
    dependencies: 'Igoera',
  });

  // Other Volto Settings
  config.settings.isMultilingual = true;
  config.settings.supportedLanguages = ['eu', 'es'];
  config.settings.defaultLanguage = 'eu';
  config.settings.siteTitleFormat = {
    includeSiteTitle: true,
    titleAndSiteTitleSeparator: '-',
  };
  config.experimental.addBlockButton.enabled = true;

  config.addonReducers = {
    ...config.addonReducers,
    ...reducers,
  };

  config.settings.asyncPropsExtenders = [
    ...config.settings.asyncPropsExtenders,
    userdataAsyncPropExtender,
  ];
  return config;
};

export default applyConfig;
