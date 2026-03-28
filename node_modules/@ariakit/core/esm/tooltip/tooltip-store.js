"use client";
import {
  createHovercardStore
} from "../__chunks/TIQDSBWP.js";
import "../__chunks/BFGNM53A.js";
import "../__chunks/KMAUV3TY.js";
import "../__chunks/75BJEVSH.js";
import {
  createStore
} from "../__chunks/SXKM4CGU.js";
import {
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/tooltip/tooltip-store.ts
function createTooltipStore(props = {}) {
  var _a;
  if (process.env.NODE_ENV !== "production") {
    if (props.type === "label") {
      console.warn(
        "The `type` option on the tooltip store is deprecated.",
        "Render a visually hidden label or use the `aria-label` or `aria-labelledby` attributes on the anchor element instead.",
        "See https://ariakit.org/components/tooltip#tooltip-anchors-must-have-accessible-names"
      );
    }
  }
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const hovercard = createHovercardStore({
    ...props,
    placement: defaultValue(
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "top"
    ),
    hideTimeout: defaultValue(props.hideTimeout, syncState == null ? void 0 : syncState.hideTimeout, 0)
  });
  const initialState = {
    ...hovercard.getState(),
    type: defaultValue(props.type, syncState == null ? void 0 : syncState.type, "description"),
    skipTimeout: defaultValue(props.skipTimeout, syncState == null ? void 0 : syncState.skipTimeout, 300)
  };
  const tooltip = createStore(initialState, hovercard, props.store);
  return {
    ...hovercard,
    ...tooltip
  };
}
export {
  createTooltipStore
};
