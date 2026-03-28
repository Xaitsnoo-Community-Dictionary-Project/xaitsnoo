"use strict";Object.defineProperty(exports, "__esModule", {value: true});


var _4ITB54ITcjs = require('./4ITB54IT.cjs');






var _WPBYRKFQcjs = require('./WPBYRKFQ.cjs');



var _6BYUUR4Mcjs = require('./6BYUUR4M.cjs');

// src/collection/collection-store.ts
function getCommonParent(items) {
  var _a;
  const firstItem = items.find((item) => !!item.element);
  const lastItem = [...items].reverse().find((item) => !!item.element);
  let parentElement = (_a = firstItem == null ? void 0 : firstItem.element) == null ? void 0 : _a.parentElement;
  while (parentElement && (lastItem == null ? void 0 : lastItem.element)) {
    const parent = parentElement;
    if (lastItem && parent.contains(lastItem.element)) {
      return parentElement;
    }
    parentElement = parentElement.parentElement;
  }
  return _4ITB54ITcjs.getDocument.call(void 0, parentElement).body;
}
function getPrivateStore(store) {
  return store == null ? void 0 : store.__unstablePrivateStore;
}
function createCollectionStore(props = {}) {
  var _a;
  _WPBYRKFQcjs.throwOnConflictingProps.call(void 0, props, props.store);
  const syncState = (_a = props.store) == null ? void 0 : _a.getState();
  const items = _6BYUUR4Mcjs.defaultValue.call(void 0, 
    props.items,
    syncState == null ? void 0 : syncState.items,
    props.defaultItems,
    []
  );
  const itemsMap = new Map(items.map((item) => [item.id, item]));
  const initialState = {
    items,
    renderedItems: _6BYUUR4Mcjs.defaultValue.call(void 0, syncState == null ? void 0 : syncState.renderedItems, [])
  };
  const syncPrivateStore = getPrivateStore(props.store);
  const privateStore = _WPBYRKFQcjs.createStore.call(void 0, 
    { items, renderedItems: initialState.renderedItems },
    syncPrivateStore
  );
  const collection = _WPBYRKFQcjs.createStore.call(void 0, initialState, props.store);
  const sortItems = (renderedItems) => {
    const sortedItems = _4ITB54ITcjs.sortBasedOnDOMPosition.call(void 0, renderedItems, (i) => i.element);
    privateStore.setState("renderedItems", sortedItems);
    collection.setState("renderedItems", sortedItems);
  };
  _WPBYRKFQcjs.setup.call(void 0, collection, () => _WPBYRKFQcjs.init.call(void 0, privateStore));
  _WPBYRKFQcjs.setup.call(void 0, privateStore, () => {
    return _WPBYRKFQcjs.batch.call(void 0, privateStore, ["items"], (state) => {
      collection.setState("items", state.items);
    });
  });
  _WPBYRKFQcjs.setup.call(void 0, privateStore, () => {
    return _WPBYRKFQcjs.batch.call(void 0, privateStore, ["renderedItems"], (state) => {
      let firstRun = true;
      let raf = requestAnimationFrame(() => {
        const { renderedItems } = collection.getState();
        if (state.renderedItems === renderedItems) return;
        sortItems(state.renderedItems);
      });
      if (typeof IntersectionObserver !== "function") {
        return () => cancelAnimationFrame(raf);
      }
      const ioCallback = () => {
        if (firstRun) {
          firstRun = false;
          return;
        }
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => sortItems(state.renderedItems));
      };
      const root = getCommonParent(state.renderedItems);
      const observer = new IntersectionObserver(ioCallback, { root });
      for (const item of state.renderedItems) {
        if (!item.element) continue;
        observer.observe(item.element);
      }
      return () => {
        cancelAnimationFrame(raf);
        observer.disconnect();
      };
    });
  });
  const mergeItem = (item, setItems, canDeleteFromMap = false) => {
    let prevItem;
    setItems((items2) => {
      const index = items2.findIndex(({ id }) => id === item.id);
      const nextItems = items2.slice();
      if (index !== -1) {
        prevItem = items2[index];
        const nextItem = { ...prevItem, ...item };
        nextItems[index] = nextItem;
        itemsMap.set(item.id, nextItem);
      } else {
        nextItems.push(item);
        itemsMap.set(item.id, item);
      }
      return nextItems;
    });
    const unmergeItem = () => {
      setItems((items2) => {
        if (!prevItem) {
          if (canDeleteFromMap) {
            itemsMap.delete(item.id);
          }
          return items2.filter(({ id }) => id !== item.id);
        }
        const index = items2.findIndex(({ id }) => id === item.id);
        if (index === -1) return items2;
        const nextItems = items2.slice();
        nextItems[index] = prevItem;
        itemsMap.set(item.id, prevItem);
        return nextItems;
      });
    };
    return unmergeItem;
  };
  const registerItem = (item) => mergeItem(
    item,
    (getItems) => privateStore.setState("items", getItems),
    true
  );
  return {
    ...collection,
    registerItem,
    renderItem: (item) => _6BYUUR4Mcjs.chain.call(void 0, 
      registerItem(item),
      mergeItem(
        item,
        (getItems) => privateStore.setState("renderedItems", getItems)
      )
    ),
    item: (id) => {
      if (!id) return null;
      let item = itemsMap.get(id);
      if (!item) {
        const { items: items2 } = privateStore.getState();
        item = items2.find((item2) => item2.id === id);
        if (item) {
          itemsMap.set(id, item);
        }
      }
      return item || null;
    },
    // @ts-expect-error Internal
    __unstablePrivateStore: privateStore
  };
}



exports.createCollectionStore = createCollectionStore;
