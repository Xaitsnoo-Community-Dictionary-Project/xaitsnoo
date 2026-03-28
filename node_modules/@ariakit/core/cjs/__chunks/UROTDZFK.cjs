"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _AOXAROPFcjs = require('./AOXAROPF.cjs');


var _WPBYRKFQcjs = require('./WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('./6BYUUR4M.cjs');

// src/hovercard/hovercard-store.ts
function createHovercardStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const popover = _AOXAROPFcjs.createPopoverStore.call(void 0, {
    ...props,
    placement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom"
    )
  });
  const timeout = _6BYUUR4Mcjs.defaultValue.call(void 0, props.timeout, syncState == null ? void 0 : syncState.timeout, 500);
  const initialState = {
    ...popover.getState(),
    timeout,
    showTimeout: _6BYUUR4Mcjs.defaultValue.call(void 0, props.showTimeout, syncState == null ? void 0 : syncState.showTimeout),
    hideTimeout: _6BYUUR4Mcjs.defaultValue.call(void 0, props.hideTimeout, syncState == null ? void 0 : syncState.hideTimeout),
    autoFocusOnShow: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.autoFocusOnShow, false)
  };
  const hovercard = _WPBYRKFQcjs.createStore.call(void 0, initialState, popover, props.store);
  return {
    ...popover,
    ...hovercard,
    setAutoFocusOnShow: (value) => hovercard.setState("autoFocusOnShow", value)
  };
}



exports.createHovercardStore = createHovercardStore;
