'use strict';

var _ = require('lodash');
var glob = require('glob');
var fs = require('fs');
var path = require('path');

function getItemById(id, item) {
  var index =  _.findIndex(item, { id: id });
  if (index < 0) {
    throw new Error(id + ' not defined');
  }

  return {
    index: index,
    item: item[index]
  }
}

function getPageIds(ids, sitemap) {
  var parsedIds = ids.split('.');

  var ret = {};

  if (parsedIds[0]) {
    var category = getItemById(parsedIds[0], sitemap);
    ret.category = category.index;
  }

  if (parsedIds[1]) {
    var page = getItemById(parsedIds[1], category.item.topics);
    ret.page = page.index;
  }

  if (parsedIds[2]) {
    var subPage = getItemById(parsedIds[2], page.item.sub);
    ret.subPage = subPage.index;
  }

  return ret;
}

function readFile(iconPath) {
  return fs.readFileSync(iconPath, 'utf8');
}

function getStyleguideIcons() {
  const iconPaths = glob.sync(path.join(__dirname, './../../../icons_/styleguide/*.svg'));

  return iconPaths.map(iconPath => path.basename(iconPath, '.svg'));
}

function getAppIcons() {
  const iconPaths = glob.sync(path.join(__dirname, './../../../icons_/app/*.svg'));

  return iconPaths.map(iconPath => path.basename(iconPath, '.svg'));
}

module.exports.helpers = {
  getPageIds: getPageIds,
  readFile: readFile,
  getStyleguideIcons: getStyleguideIcons,
  getAppIcons: getAppIcons,
};
