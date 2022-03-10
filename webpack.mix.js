const mix = require('laravel-mix');
const fs = require('fs');
const mergeYaml = require('merge-yaml');
require('laravel-mix-imagemin');

mix.pug = require('laravel-mix-pug-recursive');

const outputPath = 'dist2';

const getFiles = function (dir) {
  // get all 'files' in this directory
  // filter directories
  return fs.readdirSync(dir).filter(file => fs.statSync(`${dir}/${file}`).isFile());
};

getFiles('app/scripts').forEach(filepath => {
  mix.js(`app/scripts/${filepath}`, `${outputPath}/scripts`);
});

getFiles('app/styles').forEach(filepath => {
  if (filepath.startsWith('_')) {
    return;
  }

  mix.sass(`app/styles/${filepath}`, 'styles')
    .options({
      processCssUrls: false
    });
});

const configs = [];

getFiles('app/views/data').forEach(filepath => configs.push(`app/views/data/${filepath}`));
getFiles('app/views/styleguide/data').forEach(filepath => configs.push(`app/views/styleguide/data/${filepath}`));
const config = mergeYaml(configs);

mix.pug('app/views/bookmark.pug', outputPath, {
  excludePath: 'app/views',
  locals: {
    ...config
  }
});

mix.copy('app/fonts', 'dist2/fonts');
mix.copy('app/icons_', 'dist2/icons_');
mix.copy('app/images', 'dist2/images');

mix.setPublicPath(outputPath);

if (!mix.inProduction()) {
  // mix.sourceMaps();
}
