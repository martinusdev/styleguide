const ESLintWebpackPlugin = require('eslint-webpack-plugin');

module.exports = (paths, config) => {

  // add/change custom svgo plugin configs
  const imageminCfgIcons = config.icons().imageminCfg;

  const customPluginConfigIcons = {
    removeStyleElement: false,
  };

  const finalSvgoIconsPlugins = [];
  const existingSvgoIconsPluginNames = new Set();

  imageminCfgIcons.svgo.plugins.forEach(plugin => {
    const pluginName = Object.keys(plugin)[0];
    existingSvgoIconsPluginNames.add(pluginName);

    const isActive = customPluginConfigIcons.hasOwnProperty(pluginName) ?
      customPluginConfigIcons[pluginName] :
      plugin[pluginName];

    finalSvgoIconsPlugins.push({
      name: pluginName,
      active: isActive
    });
  });

  for (const [pluginName, isActive] of Object.entries(customPluginConfigIcons)) {
    if (!existingSvgoIconsPluginNames.has(pluginName)) {
      finalSvgoIconsPlugins.push({
        name: pluginName,
        active: isActive
      });
    }
  }

  imageminCfgIcons.svgo.plugins = finalSvgoIconsPlugins;

  // add/change custom svgo plugin configs
  const imageminCfgImages = config.images().imageminCfg;

  const customPluginConfigImages = {
    removeDimensions: false,
    removeViewBox: false,
    removeStyleElement: false,
    convertStyleToAttrs: false,
  };

  const finalSvgoImagesPlugins = [];
  const existingSvgoImagesPluginNames = new Set();

  imageminCfgImages.svgo.plugins.forEach(plugin => {
    const pluginName = Object.keys(plugin)[0];

    // Remove wrong plugin - should be fixed in light-scripts config
    if (pluginName === 'removeViewbox') {
      return;
    }

    existingSvgoImagesPluginNames.add(pluginName);

    const isActive = customPluginConfigImages.hasOwnProperty(pluginName) ?
      customPluginConfigImages[pluginName] :
      plugin[pluginName];

    finalSvgoImagesPlugins.push({
      name: pluginName,
      active: isActive
    });
  });

  for (const [pluginName, isActive] of Object.entries(customPluginConfigImages)) {
    if (!existingSvgoImagesPluginNames.has(pluginName)) {
      finalSvgoImagesPlugins.push({
        name: pluginName,
        active: isActive
      });
    }
  }

  imageminCfgImages.svgo.plugins = finalSvgoImagesPlugins;

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
      },
      serve: {
        // Don't try to open browser in headless Docker environment
        open: false,
      }
    },
  };
};
