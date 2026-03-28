"use client";
import {
  createCompositeStore
} from "../__chunks/RVTIKFRL.js";
import "../__chunks/7PRQYBBV.js";
import {
  createCollectionStore
} from "../__chunks/N5XGANPW.js";
import "../__chunks/3DNM6L6E.js";
import {
  batch,
  createStore,
  mergeStore,
  omit,
  setup,
  sync
} from "../__chunks/SXKM4CGU.js";
import {
  chain,
  defaultValue
} from "../__chunks/XMCVU3LR.js";

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
  const store = mergeStore(
    props.store,
    omit(parentComposite, independentKeys),
    omit(combobox, independentKeys)
  );
  const syncState = store == null ? void 0 : store.getState();
  const composite = createCompositeStore({
    ...props,
    store,
    // We need to explicitly set the default value of `includesBaseElement` to
    // `false` since we don't want the composite store to default it to `true`
    // when the activeId state is null, which could be the case when rendering
    // combobox with tab.
    includesBaseElement: defaultValue(
      props.includesBaseElement,
      syncState == null ? void 0 : syncState.includesBaseElement,
      false
    ),
    orientation: defaultValue(
      props.orientation,
      syncState == null ? void 0 : syncState.orientation,
      "horizontal"
    ),
    focusLoop: defaultValue(props.focusLoop, syncState == null ? void 0 : syncState.focusLoop, true)
  });
  const panels = createCollectionStore();
  const initialState = {
    ...composite.getState(),
    selectedId: defaultValue(
      props.selectedId,
      syncState == null ? void 0 : syncState.selectedId,
      props.defaultSelectedId
    ),
    selectOnMove: defaultValue(
      props.selectOnMove,
      syncState == null ? void 0 : syncState.selectOnMove,
      true
    )
  };
  const tab = createStore(initialState, composite, store);
  setup(
    tab,
    () => sync(tab, ["moves"], () => {
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
  setup(
    tab,
    () => batch(tab, ["selectedId"], (state, prev) => {
      if (!syncActiveId) {
        syncActiveId = true;
        return;
      }
      if (parentComposite && state.selectedId === prev.selectedId) return;
      tab.setState("activeId", state.selectedId);
    })
  );
  setup(
    tab,
    () => sync(tab, ["selectedId", "renderedItems"], (state) => {
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
  setup(
    tab,
    () => sync(tab, ["renderedItems"], (state) => {
      const tabs = state.renderedItems;
      if (!tabs.length) return;
      return sync(panels, ["renderedItems"], (state2) => {
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
  setup(tab, () => {
    const backupSelectedId = () => {
      selectedIdFromSelectedValue = tab.getState().selectedId;
    };
    const restoreSelectedId = () => {
      syncActiveId = false;
      tab.setState("selectedId", selectedIdFromSelectedValue);
    };
    if (parentComposite && "setSelectElement" in parentComposite) {
      return chain(
        sync(parentComposite, ["value"], backupSelectedId),
        sync(parentComposite, ["mounted"], restoreSelectedId)
      );
    }
    if (!combobox) return;
    return chain(
      sync(combobox, ["selectedValue"], backupSelectedId),
      sync(combobox, ["mounted"], restoreSelectedId)
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
export {
  createTabStore
};
