const applyConfig = (config) => {
  config.settings = {
    ...config.settings,
    isMultilingual: false,
    supportedLanguages: ['es'],
    defaultLanguage: 'es',
  };
  return config;
};

export default applyConfig;