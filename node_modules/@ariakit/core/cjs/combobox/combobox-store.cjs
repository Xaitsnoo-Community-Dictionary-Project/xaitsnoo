"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _JNYCP2QOcjs = require('../__chunks/JNYCP2QO.cjs');


var _AOXAROPFcjs = require('../__chunks/AOXAROPF.cjs');


var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');
require('../__chunks/T247D7JS.cjs');
require('../__chunks/MJNGPYVQ.cjs');
require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');








var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');



var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/combobox/combobox-store.ts
var isTouchSafari = _JNYCP2QOcjs.isSafari.call(void 0, ) && _JNYCP2QOcjs.isTouchDevice.call(void 0, );
function createComboboxStore({
  tag,
  ...props
} = {}) {
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, props.store, _WPBYRKFQcjs.pick.call(void 0, tag, ["value", "rtl"]));
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, store);
  const tagState = tag == null ? void 0 : tag.getState();
  const syncState = store == null ? void 0 : store.getState();
  const activeId = _6BYUUR4Mcjs.defaultValue.call(void 0, 
    props.activeId,
    syncState == null ? void 0 : syncState.activeId,
    props.defaultActiveId,
    null
  );
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    activeId,
    includesBaseElement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      true
    ),
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "vertical"
    ),
    focusLoop: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true),
    focusWrap: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusWrap, syncState == null ? void 0 : syncState.focusWrap, true),
    virtualFocus: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.virtualFocus,
      syncState == null ? void 0 : syncState.virtualFocus,
      true
    )
  });
  const popover = _AOXAROPFcjs.createPopoverStore.call(void 0, {
    ...props,
    placement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.placement,
      syncState == null ? void 0 : syncState.placement,
      "bottom-start"
    )
  });
  const value = _6BYUUR4Mcjs.defaultValue.call(void 0, 
    props.value,
    syncState == null ? void 0 : syncState.value,
    props.defaultValue,
    ""
  );
  const selectedValue = _6BYUUR4Mcjs.defaultValue.call(void 0, 
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
    resetValueOnSelect: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.resetValueOnSelect,
      syncState == null ? void 0 : syncState.resetValueOnSelect,
      multiSelectable
    ),
    resetValueOnHide: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.resetValueOnHide,
      syncState == null ? void 0 : syncState.resetValueOnHide,
      multiSelectable && !tag
    ),
    activeValue: syncState == null ? void 0 : syncState.activeValue
  };
  const combobox = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, popover, store);
  if (isTouchSafari) {
    _WPBYRKFQcjs.setup.call(void 0, 
      combobox,
      () => _WPBYRKFQcjs.sync.call(void 0, combobox, ["virtualFocus"], () => {
        combobox.setState("virtualFocus", false);
      })
    );
  }
  _WPBYRKFQcjs.setup.call(void 0, combobox, () => {
    if (!tag) return;
    return _6BYUUR4Mcjs.chain.call(void 0, 
      _WPBYRKFQcjs.sync.call(void 0, combobox, ["selectedValue"], (state) => {
        if (!Array.isArray(state.selectedValue)) return;
        tag.setValues(state.selectedValue);
      }),
      _WPBYRKFQcjs.sync.call(void 0, tag, ["values"], (state) => {
        combobox.setState("selectedValue", state.values);
      })
    );
  });
  _WPBYRKFQcjs.setup.call(void 0, 
    combobox,
    () => _WPBYRKFQcjs.sync.call(void 0, combobox, ["resetValueOnHide", "mounted"], (state) => {
      if (!state.resetValueOnHide) return;
      if (state.mounted) return;
      combobox.setState("value", value);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    combobox,
    () => _WPBYRKFQcjs.sync.call(void 0, combobox, ["open"], (state) => {
      if (state.open) return;
      combobox.setState("activeId", activeId);
      combobox.setState("moves", 0);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    combobox,
    () => _WPBYRKFQcjs.sync.call(void 0, combobox, ["moves", "activeId"], (state, prevState) => {
      if (state.moves === prevState.moves) {
        combobox.setState("activeValue", void 0);
      }
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    combobox,
    () => _WPBYRKFQcjs.batch.call(void 0, combobox, ["moves", "renderedItems"], (state, prev) => {
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


exports.createComboboxStore = createComboboxStore;
