"use client";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import "../__chunks/SXKM4CGU.js";
import {
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/toolbar/toolbar-store.ts
function createToolbarStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  return createCompositeStore({
    ...props,
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
}
export {
  createToolbarStore
};
