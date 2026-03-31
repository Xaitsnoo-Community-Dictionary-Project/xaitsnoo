"use client";
import {
  UndoManager
} from "../__chunks/7LM4Q2XB.js";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import {
  createStore,
  setup,
  sync
} from "../__chunks/SXKM4CGU.js";
import {
  applyState,
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/tag/tag-store.ts
function createTagStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = createCompositeStore(props);
  const initialState = {
    ...composite.getState(),
    inputElement: defaultValue(syncState == null ? void 0 : syncState.inputElement, null),
    labelElement: defaultValue(syncState == null ? void 0 : syncState.labelElement, null),
    value: defaultValue(props.value, syncState == null ? void 0 : syncState.value, props.defaultValue, ""),
    values: defaultValue(
      props.values,
      syncState == null ? void 0 : syncState.values,
      props.defaultValues,
      []
    )
  };
  const tag = createStore(initialState, composite, props.store);
  setup(
    tag,
    () => sync(tag, ["inputElement", "activeId"], (state) => {
      if (!state.inputElement) return;
      if (state.activeId !== void 0) return;
      tag.setState("activeId", state.inputElement.id);
    })
  );
  const setValues = (values) => {
    const { values: previousValues } = tag.getState();
    UndoManager.execute(() => {
      let changed = true;
      tag.setState("values", (prev) => {
        const next = applyState(values, prev);
        if (next === prev) {
          changed = false;
        }
        return next;
      });
      if (!changed) return;
      return () => {
        var _a2;
        tag.setState("values", previousValues);
        composite.move((_a2 = tag.getState().inputElement) == null ? void 0 : _a2.id);
      };
    });
  };
  return {
    ...composite,
    ...tag,
    setInputElement: (inputElement) => tag.setState("inputElement", inputElement),
    setLabelElement: (labelElement) => tag.setState("labelElement", labelElement),
    setValue: (value) => tag.setState("value", value),
    resetValue: () => tag.setState("value", initialState.value),
    setValues,
    addValue: (value) => {
      setValues((values) => {
        if (values.includes(value)) return values;
        return [...values, value];
      });
    },
    removeValue: (value) => setValues((values) => values.filter((v) => v !== value))
  };
}
export {
  createTagStore
};
