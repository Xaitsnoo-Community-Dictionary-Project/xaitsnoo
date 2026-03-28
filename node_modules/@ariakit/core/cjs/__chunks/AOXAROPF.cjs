"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _T247D7JScjs = require('./T247D7JS.cjs');





var _WPBYRKFQcjs = require('./WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('./6BYUUR4M.cjs');

// src/popover/popover-store.ts
function createPopoverStore({
  popover: otherPopover,
  ...props
} = {}) {
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, 
    props.store,
    _WPBYRKFQcjs.omit.call(void 0, otherPopover, [
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, store);
  const syncState = store == null ? void 0 : store.getState();
  const dialog = _T247D7JScjs.createDialogStore.call(void 0, { ...props, store });
  const placement = _6BYUUR4Mcjs.defaultValue.call(void 0, 
    props.placement,
    syncState == null ? void 0 : syncState.placement,
    "bottom"
  );
  const initialState = {
    ...dialog.getState(),
    placement,
    currentPlacement: placement,
    anchorElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.anchorElement, null),
    popoverElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.popoverElement, null),
    arrowElement: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.arrowElement, null),
    rendered: Symbol("rendered")
  };
  const popover = _WPBYRKFQcjs.createStore.call(void 0, initialState, dialog, store);
  return {
    ...dialog,
    ...popover,
    setAnchorElement: (element) => popover.setState("anchorElement", element),
    setPopoverElement: (element) => popover.setState("popoverElement", element),
    setArrowElement: (element) => popover.setState("arrowElement", element),
    render: () => popover.setState("rendered", Symbol("rendered"))
  };
}



exports.createPopoverStore = createPopoverStore;
