"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _4ITB54ITcjs = require('./4ITB54IT.cjs');

// src/utils/platform.ts
function isTouchDevice() {
  return _4ITB54ITcjs.canUseDOM && !!navigator.maxTouchPoints;
}
function isApple() {
  if (!_4ITB54ITcjs.canUseDOM) return false;
  return /mac|iphone|ipad|ipod/i.test(navigator.platform);
}
function isSafari() {
  return _4ITB54ITcjs.canUseDOM && isApple() && /apple/i.test(navigator.vendor);
}
function isFirefox() {
  return _4ITB54ITcjs.canUseDOM && /firefox\//i.test(navigator.userAgent);
}
function isMac() {
  return _4ITB54ITcjs.canUseDOM && navigator.platform.startsWith("Mac") && !isTouchDevice();
}







exports.isTouchDevice = isTouchDevice; exports.isApple = isApple; exports.isSafari = isSafari; exports.isFirefox = isFirefox; exports.isMac = isMac;
