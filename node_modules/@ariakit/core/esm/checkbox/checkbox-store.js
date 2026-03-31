"use client";
import {
  createStore,
  throwOnConflictingProps
} from "../__chunks/SXKM4CGU.js";
import {
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/checkbox/checkbox-store.ts
function createCheckboxStore(props = {}) {
  var _a;
  throwOnConflictingProps(props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const initialState = {
    value: defaultValue(
      props.value,
      syncState == null ? void 0 : syncState.value,
      props.defaultValue,
      false
    )
  };
  const checkbox = createStore(initialState, props.store);
  return {
    ...checkbox,
    setValue: (value) => checkbox.setState("value", value)
  };
}
export {
  createCheckboxStore
};
