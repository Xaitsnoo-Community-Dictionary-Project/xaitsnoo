"use client";
import {
  createPopoverStore
} from "./BFGNM53A.js";
import {
  createStore
} from "./SXKM4CGU.js";
import {
  defaultValue
} from "./XMCVU3LR.js";

// src/hovercard/hovercard-store.ts
function createHovercardStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const popover = createPopoverStore({
    ...props,
    placement: defaultValue(
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom"
    )
  });
  const timeout = defaultValue(props.timeout, syncState == null ? void 0 : syncState.timeout, 500);
  const initialState = {
    ...popover.getState(),
    timeout,
    showTimeout: defaultValue(props.showTimeout, syncState == null ? void 0 : syncState.showTimeout),
    hideTimeout: defaultValue(props.hideTimeout, syncState == null ? void 0 : syncState.hideTimeout),
    autoFocusOnShow: defaultValue(syncState == null ? void 0 : syncState.autoFocusOnShow, false)
  };
  const hovercard = createStore(initialState, popover, props.store);
  return {
    ...popover,
    ...hovercard,
    setAutoFocusOnShow: (value) => hovercard.setState("autoFocusOnShow", value)
  };
}

export {
  createHovercardStore
};
