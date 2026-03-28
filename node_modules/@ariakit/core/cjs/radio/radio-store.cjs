"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');


var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/radio/radio-store.ts
function createRadioStore({
  ...props
} = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    focusLoop: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const initialState = {
    ...composite.getState(),
    value: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.value,
      syncState == null ? void 0 : syncState.value,
      props.defaultValue,
      null
    )
  };
  const radio = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, props.store);
  return {
    ...composite,
    ...radio,
    setValue: (value) => radio.setState("value", value)
  };
}


exports.createRadioStore = createRadioStore;
