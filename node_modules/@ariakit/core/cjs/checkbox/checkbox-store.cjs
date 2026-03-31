"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/checkbox/checkbox-store.ts
function createCheckboxStore(props = {}) {
  var _a;
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const initialState = {
    value: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.value,
      syncState == null ? void 0 : syncState.value,
      props.defaultValue,
      false
    )
  };
  const checkbox = _WPBYRKFQcjs.createStore.call(void 0, initialState, props.store);
  return {
    ...checkbox,
    setValue: (value) => checkbox.setState("value", value)
  };
}


exports.createCheckboxStore = createCheckboxStore;
