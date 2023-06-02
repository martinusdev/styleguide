const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (paths, config) => {
  const imageminCfgIcons = config.icons().imageminCfg;

  // add/change custom svgo plugin configs
  const pluginsIcons = imageminCfgIcons.svgo.plugins;
  const customPluginConfigIcons = {
    removeStyleElement: false,
    removeFill: false,
  };

  Object.entries(customPluginConfigIcons).forEach(([name, value]) => {
    // is it in the array?
    const pluginIndexIcons = pluginsIcons.findIndex(p =>
      Object.keys(p).includes(name),
    );
    if (pluginIndexIcons !== -1) {
      // if yes change value to false
      imageminCfgIcons.svgo.plugins[pluginIndexIcons][name] = value;
    } else {
      // if no add it
      imageminCfgIcons.svgo.plugins = [
        ...imageminCfgIcons.svgo.plugins,
        { [name]: value },
      ];
    }
  });

  const imageminCfgImages = config.images().imageminCfg;

  // add/change custom svgo plugin configs
  const pluginsImages = imageminCfgImages.svgo.plugins;
  const customPluginConfigImages = {
    removeDimensions: false,
    removeViewBox: false,
    removeStyleElement: false,
    convertStyleToAttrs: false,
  };

  Object.entries(customPluginConfigImages).forEach(([name, value]) => {
    // is it in the array?
    const pluginIndexImages = pluginsImages.findIndex(p =>
      Object.keys(p).includes(name),
    );
    if (pluginIndexImages !== -1) {
      // if yes change value to false
      imageminCfgImages.svgo.plugins[pluginIndexImages][name] = value;
    } else {
      // if no add it
      imageminCfgImages.svgo.plugins = [
        ...imageminCfgImages.svgo.plugins,
        { [name]: value },
      ];
    }
  });

  return {
    paths: {
      icons: 'icons_',
    },
    exports: {
      plugins: [
        new ESLintWebpackPlugin({}),
      ]
    },
    config: {
      images: {
        src: config.images().src.replace('{gif,png,jpg,svg}', '{gif,png,jpg,svg,webp}'),
        imageminCfg: imageminCfgImages,
      },
      icons: {
        imageminCfg: imageminCfgIcons,
        cheerioCfg: {
          run: $ => {
            $('[fill]').not('[data-keep-fill]').removeAttr('fill');
          },
          parserOptions: {
            xmlMode: true,
          },
        },
      },
      styles: {
        inlineSvgCfg: {
          removeFill: false,
        },
      },
      scripts: {
        module: {
          rules: [],
        }
      }
    },
  };
};
