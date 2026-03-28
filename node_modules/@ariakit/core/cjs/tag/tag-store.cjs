"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _SHOLYDNPcjs = require('../__chunks/SHOLYDNP.cjs');


var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');




var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');



var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/tag/tag-store.ts
function createTagStore(props = {}) {
  var _a;
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, props);
  const initialState = {
    ...composite.getState(),
    inputElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.inputElement, null),
    labelElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.labelElement, null),
    value: _6BYUUR4Mcjs.defaultValue.call(void 0, props.value, syncState == null ? void 0 : syncState.value, props.defaultValue, ""),
    values: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.values,
      syncState == null ? void 0 : syncState.values,
      props.defaultValues,
      []
    )
  };
  const tag = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, props.store);
  _WPBYRKFQcjs.setup.call(void 0, 
    tag,
    () => _WPBYRKFQcjs.sync.call(void 0, tag, ["inputElement", "activeId"], (state) => {
      if (!state.inputElement) return;
      if (state.activeId !== void 0) return;
      tag.setState("activeId", state.inputElement.id);
    })
  );
  const setValues = (values) => {
    const { values: previousValues } = tag.getState();
    _SHOLYDNPcjs.UndoManager.execute(() => {
      let changed = true;
      tag.setState("values", (prev) => {
        const next = _6BYUUR4Mcjs.applyState.call(void 0, values, prev);
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


exports.createTagStore = createTagStore;
