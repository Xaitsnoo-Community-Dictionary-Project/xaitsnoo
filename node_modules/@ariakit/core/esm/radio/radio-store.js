"use client";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import {
  createStore
} from "../__chunks/SXKM4CGU.js";
import {
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/radio/radio-store.ts
function createRadioStore({
  ...props
} = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = createCompositeStore({
    ...props,
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const initialState = {
    ...composite.getState(),
    value: defaultValue(
      props.value,
      syncState == null ? void 0 : syncState.value,
      props.defaultValue,
      null
    )
  };
  const radio = createStore(initialState, composite, props.store);
  return {
    ...composite,
    ...radio,
    setValue: (value) => radio.setState("value", value)
  };
}
export {
  createRadioStore
};
