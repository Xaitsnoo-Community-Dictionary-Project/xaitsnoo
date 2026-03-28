"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _AOXAROPFcjs = require('../__chunks/AOXAROPF.cjs');


var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');


var _GDZQUFNPcjs = require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/T247D7JS.cjs');
require('../__chunks/MJNGPYVQ.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');








var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/select/select-store.ts
function createSelectStore({
  combobox,
  ...props
} = {}) {
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, 
    props.store,
    _WPBYRKFQcjs.omit.call(void 0, combobox, [
      "value",
      "items",
      "renderedItems",
      "baseElement",
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, store);
  const syncState = store.getState();
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    store,
    virtualFocus: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.virtualFocus,
      syncState.virtualFocus,
      true
    ),
    includesBaseElement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.includesBaseElement,
      syncState.includesBaseElement,
      false
    ),
    activeId: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.activeId,
      syncState.activeId,
      props.defaultActiveId,
      null
    ),
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState.orientation,
      "vertical"
    )
  });
  const popover = _AOXAROPFcjs.createPopoverStore.call(void 0, {
    ...props,
    store,
    placement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.placement,
      syncState.placement,
      "bottom-start"
    )
  });
  const initialValue = new String("");
  const initialState = {
    ...composite.getState(),
    ...popover.getState(),
    value: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.value,
      syncState.value,
      props.defaultValue,
      initialValue
    ),
    setValueOnMove: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.setValueOnMove,
      syncState.setValueOnMove,
      false
    ),
    labelElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState.labelElement, null),
    selectElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState.selectElement, null),
    listElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState.listElement, null)
  };
  const select = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, popover, store);
  _WPBYRKFQcjs.setup.call(void 0, 
    select,
    () => _WPBYRKFQcjs.sync.call(void 0, select, ["value", "items"], (state) => {
      if (state.value !== initialValue) return;
      if (!state.items.length) return;
      const item = state.items.find(
        (item2) => !item2.disabled && item2.value != null
      );
      if ((item == null ? void 0 : item.value) == null) return;
      select.setState("value", item.value);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    select,
    () => _WPBYRKFQcjs.sync.call(void 0, select, ["mounted"], (state) => {
      if (state.mounted) return;
      select.setState("activeId", initialState.activeId);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    select,
    () => _WPBYRKFQcjs.sync.call(void 0, select, ["mounted", "items", "value"], (state) => {
      if (combobox) return;
      if (state.mounted) return;
      const values = _GDZQUFNPcjs.toArray.call(void 0, state.value);
      const lastValue = values[values.length - 1];
      if (lastValue == null) return;
      const item = state.items.find(
        (item2) => !item2.disabled && item2.value === lastValue
      );
      if (!item) return;
      select.setState("activeId", item.id);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    select,
    () => _WPBYRKFQcjs.batch.call(void 0, select, ["setValueOnMove", "moves"], (state) => {
      const { mounted, value, activeId } = select.getState();
      if (!state.setValueOnMove && mounted) return;
      if (Array.isArray(value)) return;
      if (!state.moves) return;
      if (!activeId) return;
      const item = composite.item(activeId);
      if (!item || item.disabled || item.value == null) return;
      select.setState("value", item.value);
    })
  );
  return {
    ...composite,
    ...popover,
    ...select,
    combobox,
    setValue: (value) => select.setState("value", value),
    setLabelElement: (element) => select.setState("labelElement", element),
    setSelectElement: (element) => select.setState("selectElement", element),
    setListElement: (element) => select.setState("listElement", element)
  };
}


exports.createSelectStore = createSelectStore;
