"use strict";Object.defineProperty(exports, "__esModule", {value: true});







var _WPBYRKFQcjs = require('./WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('./6BYUUR4M.cjs');

// src/disclosure/disclosure-store.ts
function createDisclosureStore(props = {}) {
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, 
    props.store,
    _WPBYRKFQcjs.omit.call(void 0, props.disclosure, ["contentElement", "disclosureElement"])
  );
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, store);
  const syncState = store == null ? void 0 : store.getState();
  const open = _6BYUUR4Mcjs.defaultValue.call(void 0, 
    props.open,
    syncState == null ? void 0 : syncState.open,
    props.defaultOpen,
    false
  );
  const animated = _6BYUUR4Mcjs.defaultValue.call(void 0, props.animated, syncState == null ? void 0 : syncState.animated, false);
  const initialState = {
    open,
    animated,
    animating: !!animated && open,
    mounted: open,
    contentElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.contentElement, null),
    disclosureElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.disclosureElement, null)
  };
  const disclosure = _WPBYRKFQcjs.createStore.call(void 0, initialState, store);
  _WPBYRKFQcjs.setup.call(void 0, 
    disclosure,
    () => _WPBYRKFQcjs.sync.call(void 0, disclosure, ["animated", "animating"], (state) => {
      if (state.animated) return;
      disclosure.setState("animating", false);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    disclosure,
    () => _WPBYRKFQcjs.subscribe.call(void 0, disclosure, ["open"], () => {
      if (!disclosure.getState().animated) return;
      disclosure.setState("animating", true);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    disclosure,
    () => _WPBYRKFQcjs.sync.call(void 0, disclosure, ["open", "animating"], (state) => {
      disclosure.setState("mounted", state.open || state.animating);
    })
  );
  return {
    ...disclosure,
    disclosure: props.disclosure,
    setOpen: (value) => disclosure.setState("open", value),
    show: () => disclosure.setState("open", true),
    hide: () => disclosure.setState("open", false),
    toggle: () => disclosure.setState("open", (open2) => !open2),
    stopAnimation: () => disclosure.setState("animating", false),
    setContentElement: (value) => disclosure.setState("contentElement", value),
    setDisclosureElement: (value) => disclosure.setState("disclosureElement", value)
  };
}



exports.createDisclosureStore = createDisclosureStore;
