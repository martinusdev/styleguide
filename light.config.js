module.exports = (paths, config) => {
  const imageminCfg = config.icons().imageminCfg;

  // add/change custom svgo plugin configs
  const plugins = imageminCfg.svgo.plugins;
  const customPluginConfig = {
    removeStyleElement: false,
    removeFill: false,
  };
  
  Object.entries(customPluginConfig).forEach(([name, value]) => {
    // is it in the array?
    const pluginIndex = plugins.findIndex(p => Object.keys(p).includes(name));
    if(pluginIndex !== -1) {
      // if yes change value to false
      imageminCfg.svgo.plugins[pluginIndex][name] = value;
    } else {
      // if no add it
      imageminCfg.svgo.plugins = [...imageminCfg.svgo.plugins, {[name]: value}];
    }
  })

  return {
    paths: {
      icons: 'icons_',
    },
    config: {
      icons: {
        imageminCfg,
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
              exclude: /node_modules|bower_components|scripts\/plugins/,
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
