"use client";
import {
  createHovercardStore
} from "../__chunks/TIQDSBWP.js";
import "../__chunks/BFGNM53A.js";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import "../__chunks/KMAUV3TY.js";
import "../__chunks/75BJEVSH.js";
import "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import {
  createStore,
  mergeStore,
  omit,
  pick,
  setup,
  sync,
  throwOnConflictingProps
} from "../__chunks/SXKM4CGU.js";
import {
  applyState,
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/menu/menu-store.ts
function createMenuStore({
  combobox,
  parent,
  menubar,
  ...props
} = {}) {
  const parentIsMenubar = !!menubar && !parent;
  const store = mergeStore(
    props.store,
    pick(parent, ["values"]),
    omit(combobox, [
      "arrowElement",
      "anchorElement",
      "contentElement",
      "popoverElement",
      "disclosureElement"
    ])
  );
  throwOnConflictingProps(props, store);
  const syncState = store.getState();
  const composite = createCompositeStore({
    ...props,
    store,
    orientation: defaultValue(
      props.orientation,
      syncState.orientation,
      "vertical"
    )
  });
  const hovercard = createHovercardStore({
    ...props,
    store,
    placement: defaultValue(
      props.placement,
      syncState.placement,
      "bottom-start"
    ),
    timeout: defaultValue(
      props.timeout,
      syncState.timeout,
      parentIsMenubar ? 0 : 150
    ),
    hideTimeout: defaultValue(props.hideTimeout, syncState.hideTimeout, 0)
  });
  const initialState = {
    ...composite.getState(),
    ...hovercard.getState(),
    initialFocus: defaultValue(syncState.initialFocus, "container"),
    values: defaultValue(
      props.values,
      syncState.values,
      props.defaultValues,
      {}
    )
  };
  const menu = createStore(initialState, composite, hovercard, store);
  setup(
    menu,
    () => sync(menu, ["mounted"], (state) => {
      if (state.mounted) return;
      menu.setState("activeId", null);
    })
  );
  setup(
    menu,
    () => sync(parent, ["orientation"], (state) => {
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
        const nextValue = applyState(value, prevValue);
        if (nextValue === prevValue) return values;
        return {
          ...values,
          [name]: nextValue !== void 0 && nextValue
        };
      });
    }
  };
}
export {
  createMenuStore
};
