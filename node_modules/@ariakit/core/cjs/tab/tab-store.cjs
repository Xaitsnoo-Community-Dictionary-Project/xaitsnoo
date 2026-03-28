"use strict";Object.defineProperty(exports, "__esModule", {value: true});

var _OYTZFOIJcjs = require('../__chunks/OYTZFOIJ.cjs');
require('../__chunks/GDZQUFNP.cjs');


var _HGVIF2R4cjs = require('../__chunks/HGVIF2R4.cjs');
require('../__chunks/4ITB54IT.cjs');







var _WPBYRKFQcjs = require('../__chunks/WPBYRKFQ.cjs');



var _6BYUUR4Mcjs = require('../__chunks/6BYUUR4M.cjs');

// src/tab/tab-store.ts
function createTabStore({
  composite: parentComposite,
  combobox,
  ...props
} = {}) {
  const independentKeys = [
    "items",
    "renderedItems",
    "moves",
    "orientation",
    "virtualFocus",
    "includesBaseElement",
    "baseElement",
    "focusLoop",
    "focusShift",
    "focusWrap"
  ];
  const store = _WPBYRKFQcjs.mergeStore.call(void 0, 
    props.store,
    _WPBYRKFQcjs.omit.call(void 0, parentComposite, independentKeys),
    _WPBYRKFQcjs.omit.call(void 0, combobox, independentKeys)
  );
  const syncState = store == null ? void 0 : store.getState();
  const composite = _OYTZFOIJcjs.createCompositeStore.call(void 0, {
    ...props,
    store,
    // We need to explicitly set the default value of `includesBaseElement` to
    // `false` since we don't want the composite store to default it to `true`
    // when the activeId state is null, which could be the case when rendering
    // combobox with tab.
    includesBaseElement: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      false
    ),
    orientation: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: _6BYUUR4Mcjs.defaultValue.call(void 0, props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const panels = _HGVIF2R4cjs.createCollectionStore.call(void 0, );
  const initialState = {
    ...composite.getState(),
    selectedId: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.selectedId,
      syncState == null ? void 0 : syncState.selectedId,
      props.defaultSelectedId
    ),
    selectOnMove: _6BYUUR4Mcjs.defaultValue.call(void 0, 
      props.selectOnMove,
      syncState == null ? void 0 : syncState.selectOnMove,
      true
    )
  };
  const tab = _WPBYRKFQcjs.createStore.call(void 0, initialState, composite, store);
  _WPBYRKFQcjs.setup.call(void 0, 
    tab,
    () => _WPBYRKFQcjs.sync.call(void 0, tab, ["moves"], () => {
      const { activeId, selectOnMove } = tab.getState();
      if (!selectOnMove) return;
      if (!activeId) return;
      const tabItem = composite.item(activeId);
      if (!tabItem) return;
      if (tabItem.dimmed) return;
      if (tabItem.disabled) return;
      tab.setState("selectedId", tabItem.id);
    })
  );
  let syncActiveId = true;
  _WPBYRKFQcjs.setup.call(void 0, 
    tab,
    () => _WPBYRKFQcjs.batch.call(void 0, tab, ["selectedId"], (state, prev) => {
      if (!syncActiveId) {
        syncActiveId = true;
        return;
      }
      if (parentComposite && state.selectedId === prev.selectedId) return;
      tab.setState("activeId", state.selectedId);
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    tab,
    () => _WPBYRKFQcjs.sync.call(void 0, tab, ["selectedId", "renderedItems"], (state) => {
      if (state.selectedId !== void 0) return;
      const { activeId, renderedItems } = tab.getState();
      const tabItem = composite.item(activeId);
      if (tabItem && !tabItem.disabled && !tabItem.dimmed) {
        tab.setState("selectedId", tabItem.id);
      } else {
        const tabItem2 = renderedItems.find(
          (item) => !item.disabled && !item.dimmed
        );
        tab.setState("selectedId", tabItem2 == null ? void 0 : tabItem2.id);
      }
    })
  );
  _WPBYRKFQcjs.setup.call(void 0, 
    tab,
    () => _WPBYRKFQcjs.sync.call(void 0, tab, ["renderedItems"], (state) => {
      const tabs = state.renderedItems;
      if (!tabs.length) return;
      return _WPBYRKFQcjs.sync.call(void 0, panels, ["renderedItems"], (state2) => {
        const items = state2.renderedItems;
        const hasOrphanPanels = items.some((panel) => !panel.tabId);
        if (!hasOrphanPanels) return;
        items.forEach((panel, i) => {
          if (panel.tabId) return;
          const tabItem = tabs[i];
          if (!tabItem) return;
          panels.renderItem({ ...panel, tabId: tabItem.id });
        });
      });
    })
  );
  let selectedIdFromSelectedValue = null;
  _WPBYRKFQcjs.setup.call(void 0, tab, () => {
    const backupSelectedId = () => {
      selectedIdFromSelectedValue = tab.getState().selectedId;
    };
    const restoreSelectedId = () => {
      syncActiveId = false;
      tab.setState("selectedId", selectedIdFromSelectedValue);
    };
    if (parentComposite && "setSelectElement" in parentComposite) {
      return _6BYUUR4Mcjs.chain.call(void 0, 
        _WPBYRKFQcjs.sync.call(void 0, parentComposite, ["value"], backupSelectedId),
        _WPBYRKFQcjs.sync.call(void 0, parentComposite, ["mounted"], restoreSelectedId)
      );
    }
    if (!combobox) return;
    return _6BYUUR4Mcjs.chain.call(void 0, 
      _WPBYRKFQcjs.sync.call(void 0, combobox, ["selectedValue"], backupSelectedId),
      _WPBYRKFQcjs.sync.call(void 0, combobox, ["mounted"], restoreSelectedId)
    );
  });
  return {
    ...composite,
    ...tab,
    panels,
    setSelectedId: (id) => tab.setState("selectedId", id),
    select: (id) => {
      tab.setState("selectedId", id);
      composite.move(id);
    }
  };
}


exports.createTabStore = createTabStore;
