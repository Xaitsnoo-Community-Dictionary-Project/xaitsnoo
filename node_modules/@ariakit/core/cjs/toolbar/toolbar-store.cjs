"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');
require('../__chunks/WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/toolbar/toolbar-store.ts
function createToolbarStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  return _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
}


exports.createToolbarStore = createToolbarStore;
