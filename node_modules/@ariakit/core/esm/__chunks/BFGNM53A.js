"use client";
import {
  createDialogStore
} from "./KMAUV3TY.js";
import {
  createStore,
  mergeStore,
  omit,
  throwOnConflictingProps
} from "./SXKM4CGU.js";
import {
  defaultValue
} from "./XMCVU3LR.js";

// src/popover/popover-store.ts
function createPopoverStore({
  popover: otherPopover,
  ...props
} = {}) {
  const store = mergeStore(
    props.store,
    omit(otherPopover, [
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  throwOnConflictingProps(props, store);
  const syncState = store == null ? void 0 : store.getState();
  const dialog = createDialogStore({ ...props, store });
  const placement = defaultValue(
    props.placement,
    syncState == null ? void 0 : syncState.placement,
    "bottom"
  );
  const initialState = {
    ...dialog.getState(),
    placement,
    currentPlacement: placement,
    anchorElement: defaultValue(syncState == null ? void 0 : syncState.anchorElement, null),
    popoverElement: defaultValue(syncState == null ? void 0 : syncState.popoverElement, null),
    arrowElement: defaultValue(syncState == null ? void 0 : syncState.arrowElement, null),
    rendered: Symbol("rendered")
  };
  const popover = createStore(initialState, dialog, store);
  return {
    ...dialog,
    ...popover,
    setAnchorElement: (element) => popover.setState("anchorElement", element),
    setPopoverElement: (element) => popover.setState("popoverElement", element),
    setArrowElement: (element) => popover.setState("arrowElement", element),
    render: () => popover.setState("rendered", Symbol("rendered"))
  };
}

export {
  createPopoverStore
};
