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
    config: {
      images: {
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
      // react support - uncomment for future use
      /*scripts: {
        module: {
          rules: [
            {
              test: /.jsx?$/,
              exclude: /node_modules|bower_components|scripts\/pluginsIcons/,
              use: {
                loader: 'babel-loader',
                query: {
                  presets: ['es2016', 'react'],
                },
              },
            },
          ],
        },
      },*/
    },
  };
};
