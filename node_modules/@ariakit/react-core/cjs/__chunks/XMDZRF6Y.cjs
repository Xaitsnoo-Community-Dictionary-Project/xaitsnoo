"use strict";Object.defineProperty(exports, "__esModule", {value: true});// src/utils/misc.ts
var _misc = require('@ariakit/core/utils/misc');
var _react = require('react');
function setRef(ref, value) {
  if (typeof ref === "function") {
    ref(value);
  } else if (ref) {
    ref.current = value;
  }
}
function isValidElementWithRef(element) {
  if (!element) return false;
  if (!_react.isValidElement.call(void 0, element)) return false;
  if ("ref" in element.props) return true;
  if ("ref" in element) return true;
  return false;
}
function getRefProperty(element) {
  if (!isValidElementWithRef(element)) return null;
  const props = { ...element.props };
  return props.ref || element.ref;
}
function mergeProps(base, overrides) {
  const props = { ...base };
  for (const key in overrides) {
    if (!_misc.hasOwnProperty.call(void 0, overrides, key)) continue;
    if (key === "className") {
      const prop = "className";
      props[prop] = base[prop] ? `${base[prop]} ${overrides[prop]}` : overrides[prop];
      continue;
    }
    if (key === "style") {
      const prop = "style";
      props[prop] = base[prop] ? { ...base[prop], ...overrides[prop] } : overrides[prop];
      continue;
    }
    const overrideValue = overrides[key];
    if (typeof overrideValue === "function" && key.startsWith("on")) {
      const baseValue = base[key];
      if (typeof baseValue === "function") {
        props[key] = (...args) => {
          overrideValue(...args);
          baseValue(...args);
        };
        continue;
      }
    }
    props[key] = overrideValue;
  }
  return props;
}






exports.setRef = setRef; exports.isValidElementWithRef = isValidElementWithRef; exports.getRefProperty = getRefProperty; exports.mergeProps = mergeProps;
