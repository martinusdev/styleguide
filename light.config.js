module.exports = (paths, config) => {
  const imageminCfg = config.icons().imageminCfg;

  imageminCfg.svgoPlugins[0].removeStyleElement = false;
  imageminCfg.svgoPlugins[0].removeFill = false;

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
