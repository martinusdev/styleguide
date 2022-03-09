const mix = require('laravel-mix');
const fs = require('fs');

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

  mix.sass(`app/styles/${filepath}`, `${outputPath}/styles`)
    .options({
      processCssUrls: false
    });
});

mix.pug('app/views/*.pug', outputPath, {
  locals: {
    datas: JSON.parse()
  }
});

mix.setPublicPath(outputPath);

if (!mix.inProduction()) {
  // mix.sourceMaps();
}
