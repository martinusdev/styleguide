import lightGallery from 'lightgallery.js';
import lgFullscreen from 'lg-fullscreen.js';
import lgHash from 'lg-hash.js';
import lgThumbnail from 'lg-thumbnail.js';
import lgVideo from 'lg-video.js';
import lgZoom from 'lg-zoom.js';

window.addEventListener('DOMContentLoaded', () => {
  window.myApp = window.myApp || {};
  window.myApp.lightGallery = lightGallery;
  window.myApp.lgModules = window.myApp.lgModules || {};
  window.myApp.lgModules.lgFullscreen = lgFullscreen;
  window.myApp.lgModules.lgHash = lgHash;
  window.myApp.lgModules.lgThumbnail = lgThumbnail;
  window.myApp.lgModules.lgVideo = lgVideo;
  window.myApp.lgModules.lgZoom = lgZoom;
});
