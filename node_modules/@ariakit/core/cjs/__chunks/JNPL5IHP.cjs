"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _OYTZFOIJcjs = require('./OYTZFOIJ.cjs');


var _WPBYRKFQcjs = require('./WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('./6BYUUR4M.cjs');

// src/menubar/menubar-store.ts
function createMenubarStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const initialState = {
    ...composite.getState()
  };
  const menubar = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, props.store);
  return {
    ...composite,
    ...menubar
  };
}



exports.createMenubarStore = createMenubarStore;
