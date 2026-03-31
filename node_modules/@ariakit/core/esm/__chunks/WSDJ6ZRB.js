"use client";
import {
  createCompositeStore
} from "./RVTIKFRL.js";
import {
  createStore
} from "./SXKM4CGU.js";
import {
  defaultValue
} from "./XMCVU3LR.js";

// src/menubar/menubar-store.ts
function createMenubarStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = createCompositeStore({
    ...props,
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const initialState = {
    ...composite.getState()
  };
  const menubar = createStore(initialState, composite, props.store);
  return {
    ...composite,
    ...menubar
  };
}

export {
  createMenubarStore
};
