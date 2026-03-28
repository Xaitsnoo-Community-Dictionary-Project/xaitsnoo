"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _UROTDZFKcjs = require('../__chunks/UROTDZFK.cjs');
require('../__chunks/AOXAROPF.cjs');
require('../__chunks/T247D7JS.cjs');
require('../__chunks/MJNGPYVQ.cjs');


var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');


var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

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
  const hovercard = _UROTDZFKcjs.createHovercardStore.call(void 0, {
    ...props,
    placement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "top"
    ),
    hideTimeout: _6BYUUR4Mcjs.defaultValue.call(void 0, props.hideTimeout, syncState == null ? void 0 : syncState.hideTimeout, 0)
  });
  const initialState = {
    ...hovercard.getState(),
    type: _6BYUUR4Mcjs.defaultValue.call(void 0, props.type, syncState == null ? void 0 : syncState.type, "description"),
    skipTimeout: _6BYUUR4Mcjs.defaultValue.call(void 0, props.skipTimeout, syncState == null ? void 0 : syncState.skipTimeout, 300)
  };
  const tooltip = _WPBYRKFQcjs.createStore.call(void 0, initialState, hovercard, props.store);
  return {
    ...hovercard,
    ...tooltip
  };
}


exports.createTooltipStore = createTooltipStore;
