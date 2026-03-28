"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _UROTDZFKcjs = require('../__chunks/UROTDZFK.cjs');
require('../__chunks/AOXAROPF.cjs');


var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/T247D7JS.cjs');
require('../__chunks/MJNGPYVQ.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');








var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');



var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/menu/menu-store.ts
function createMenuStore({
  combobox,
  parent,
  menubar,
  ...props
} = {}) {
  const parentIsMenubar = !!menubar && !parent;
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, 
    props.store,
    _WPBYRKFQcjs.pick.call(void 0, parent, ["values"]),
    _WPBYRKFQcjs.omit.call(void 0, combobox, [
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
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState.orientation,
      "vertical"
    )
  });
  const hovercard = _UROTDZFKcjs.createHovercardStore.call(void 0, {
    ...props,
    store,
    placement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.placement,
      syncState.placement,
      "bottom-start"
    ),
    timeout: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.timeout,
      syncState.timeout,
      parentIsMenubar ? 0 : 150
    ),
    hideTimeout: _6BYUUR4Mcjs.defaultValue.call(void 0, props.hideTimeout, syncState.hideTimeout, 0)
  });
  const initialState = {
    ...composite.getState(),
    ...hovercard.getState(),
    initialFocus: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState.initialFocus, "container"),
    values: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.values,
      syncState.values,
      props.defaultValues,
      {}
    )
  };
  const menu = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, hovercard, store);
  _WPBYRKFQcjs.setup.call(void 0, 
    menu,
    () => _WPBYRKFQcjs.sync.call(void 0, menu, ["mounted"], (state) => {
      if (state.mounted) return;
      menu.setState("activeId", null);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    menu,
    () => _WPBYRKFQcjs.sync.call(void 0, parent, ["orientation"], (state) => {
      menu.setState(
        "placement",
        state.orientation === "vertical" ? "right-start" : "bottom-start"
      );
    })
  );
  return {
    ...composite,
    ...hovercard,
    ...menu,
    combobox,
    parent,
    menubar,
    hideAll: () => {
      hovercard.hide();
      parent == null ? void 0 : parent.hideAll();
    },
    setInitialFocus: (value) => menu.setState("initialFocus", value),
    setValues: (values) => menu.setState("values", values),
    setValue: (name, value) => {
      if (name === "__proto__") return;
      if (name === "constructor") return;
      if (Array.isArray(name)) return;
      menu.setState("values", (values) => {
        const prevValue = values[name];
        const nextValue = _6BYUUR4Mcjs.applyState.call(void 0, value, prevValue);
        if (nextValue === prevValue) return values;
        return {
          ...values,
          [name]: nextValue !== void 0 && nextValue
        };
      });
    }
  };
}


exports.createMenuStore = createMenuStore;
