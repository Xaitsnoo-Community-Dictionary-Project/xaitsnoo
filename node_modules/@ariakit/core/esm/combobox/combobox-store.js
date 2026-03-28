"use client";
import {
  isSafari,
  isTouchDevice
} from "../__chunks/SNHYQNEZ.js";
import {
  createPopoverStore
} from "../__chunks/BFGNM53A.js";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import "../__chunks/KMAUV3TY.js";
import "../__chunks/75BJEVSH.js";
import "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import {
  batch,
  createStore,
  mergeStore,
  pick,
  setup,
  sync,
  throwOnConflictingProps
} from "../__chunks/SXKM4CGU.js";
import {
  chain,
  defaultValue
} from "../__chunks/XMCVU3LR.js";

// src/combobox/combobox-store.ts
var isTouchSafari = isSafari() && isTouchDevice();
function createComboboxStore({
  tag,
  ...props
} = {}) {
  const store = mergeStore(props.store, pick(tag, ["value", "rtl"]));
  throwOnConflictingProps(props, store);
  const tagState = tag == null ? void 0 : tag.getState();
  const syncState = store == null ? void 0 : store.getState();
  const activeId = defaultValue(
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId,
    null
  );
  const composite = createCompositeStore({
    ...props,
    activeId,
    includesBaseElement: defaultValue(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      true
    ),
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "vertical"
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true),
    focusWrap: defaultValue(props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, true),
    virtualFocus: defaultValue(
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      true
    )
  });
  const popover = createPopoverStore({
    ...props,
    placement: defaultValue(
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom-start"
    )
  });
  const value = defaultValue(
    props.value,
    syncState == null ? void 0 : syncState.value,
    props.defaultValue,
    ""
  );
  const selectedValue = defaultValue(
    props.selectedValue,
    syncState == null ? void 0 : syncState.selectedValue,
    tagState == null ? void 0 : tagState.values,
    props.defaultSelectedValue,
    ""
  );
  const multiSelectable = Array.isArray(selectedValue);
  const initialState = {
    ...composite.getState(),
    ...popover.getState(),
    value,
    selectedValue,
    resetValueOnSelect: defaultValue(
      props.resetValueOnSelect,
      syncState == null ? void 0 : syncState.resetValueOnSelect,
      multiSelectable
    ),
    resetValueOnHide: defaultValue(
      props.resetValueOnHide,
      syncState == null ? void 0 : syncState.resetValueOnHide,
      multiSelectable && !tag
    ),
    activeValue: syncState == null ? void 0 : syncState.activeValue
  };
  const combobox = createStore(initialState, composite, popover, store);
  if (isTouchSafari) {
    setup(
      combobox,
      () => sync(combobox, ["virtualFocus"], () => {
        combobox.setState("virtualFocus", false);
      })
    );
  }
  setup(combobox, () => {
    if (!tag) return;
    return chain(
      sync(combobox, ["selectedValue"], (state) => {
        if (!Array.isArray(state.selectedValue)) return;
        tag.setValues(state.selectedValue);
      }),
      sync(tag, ["values"], (state) => {
        combobox.setState("selectedValue", state.values);
      })
    );
  });
  setup(
    combobox,
    () => sync(combobox, ["resetValueOnHide", "mounted"], (state) => {
      if (!state.resetValueOnHide) return;
      if (state.mounted) return;
      combobox.setState("value", value);
    })
  );
  setup(
    combobox,
    () => sync(combobox, ["open"], (state) => {
      if (state.open) return;
      combobox.setState("activeId", activeId);
      combobox.setState("moves", 0);
    })
  );
  setup(
    combobox,
    () => sync(combobox, ["moves", "activeId"], (state, prevState) => {
      if (state.moves === prevState.moves) {
        combobox.setState("activeValue", void 0);
      }
    })
  );
  setup(
    combobox,
    () => batch(combobox, ["moves", "renderedItems"], (state, prev) => {
      if (state.moves === prev.moves) return;
      const { activeId: activeId2 } = combobox.getState();
      const activeItem = composite.item(activeId2);
      combobox.setState("activeValue", activeItem == null ? void 0 : activeItem.value);
    })
  );
  return {
    ...popover,
    ...composite,
    ...combobox,
    tag,
    setValue: (value2) => combobox.setState("value", value2),
    resetValue: () => combobox.setState("value", initialState.value),
    setSelectedValue: (selectedValue2) => combobox.setState("selectedValue", selectedValue2)
  };
}
export {
  createComboboxStore
};
