/* simple-json-patch 0.0.1 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, global.simpleJsonPatch = factory());
}(this, (function () { 'use strict';

  const isNum = /^[0-9]+$/; // https://datatracker.ietf.org/doc/html/rfc6901
  // '~' is encoded as '~0'
  // '/' is encoded as '~1'

  const unescape = function (str) {
    str = str.replace(/~1/g, '/');
    str = str.replace(/~0/g, '~');
    return str;
  }; // turn a pointer string into an array


  const parsePointer$2 = function (pointr) {
    let parts = pointr.split('/'); // walk through parts of the pointer

    for (let i = 1; i < parts.length; i += 1) {
      parts[i] = unescape(parts[i]);

      if (isNum.test(parts[i])) {
        parts[i] = parseInt(parts[i], 10);
      }
    } // allow trailing-slash


    if (parts.length > 1 && parts[parts.length - 1] === '') {
      parts.pop();
    }

    return parts;
  };

  var _pointer = parsePointer$2;

  const parsePointer$1 = _pointer;

  const get$5 = function (pointr, data) {
    // empty pointer is everything.
    if (!pointr) {
      return data;
    }

    let parts = pointr;

    if (typeof pointr === 'string') {
      parts = parsePointer$1(pointr);
    } // gotta start with a slash


    if (parts[0] !== '') {
      return undefined;
    }

    let node = data; // walk through parts of the pointer

    for (let i = 1; i < parts.length; i += 1) {
      let el = parts[i];

      if (el === '-') {
        node = node[node.length - 1];
      } else if (typeof el === 'number') {
        node = node[el];
      } else if (node.hasOwnProperty(el)) {
        node = node[el];
      } else {
        return undefined;
      }
    }

    return node;
  };

  var get_1 = get$5;

  // '~' is encoded as '~0'
  // '/' is encoded as '~1'

  const escape = function (str) {
    str = str.replace(/~[^01]/g, '~0');
    str = str.replace(/\//g, '~1');
    return str;
  };

  const make = function (props) {
    if (!props || props.length === 0) {
      return '';
    }

    props = props.map(prop => {
      prop = String(prop);
      return escape(prop);
    });
    return '/' + props.join('/');
  };

  var make_1 = make;

  var _helper = {};

  _helper.isArray = arr => {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  _helper.isBoolean = val => {
    return typeof val === 'boolean';
  };

  _helper.isNumber = val => {
    return typeof val === 'number' && isFinite(val);
  };

  _helper.isString = val => {
    return typeof val === 'string';
  };

  _helper.isObject = val => {
    return Object.prototype.toString.call(val) === '[object Object]';
  };

  const parsePointer = _pointer;
  const get$4 = get_1;
  const {
    isArray: isArray$4,
    isObject: isObject$3
  } = _helper;

  const getParent$3 = function (pointr, json) {
    let prop = '';
    let parts = parsePointer(pointr);

    if (parts.length > 1) {
      prop = parts.pop();
    }

    let parent = get$4(parts, json); // a parent must be an object or an array

    if (!isArray$4(parent) && !isObject$3(parent)) {
      parent = undefined;
    }

    return {
      parent: parent,
      prop: prop
    };
  };

  var getParent_1 = getParent$3; // let json = {

  const get$3 = get_1;
  const getParent$2 = getParent_1;
  const {
    isArray: isArray$3,
    isNumber: isNumber$2,
    isObject: isObject$2,
    isString
  } = _helper;

  const add$2 = (patch, json) => {
    let node = get$3(patch.path, json); // sneaky-push

    if (isArray$3(node) === true) {
      node.push(patch.value);
      return;
    } // sneaky-splat


    if (isObject$2(node) === true && isObject$2(patch.value) === true) {
      Object.assign(node, patch.value);
      return;
    } // traditional array-add


    let res = getParent$2(patch.path, json);

    if (isArray$3(res.parent)) {
      if (res.prop === '-') {
        res.parent.push(patch.value); //simple push
      } else if (isNumber$2(res.prop)) {
        res.parent.splice(res.prop, 0, patch.value); // splice into index
      }
    } // traditional object-add


    if (isObject$2(res.parent) && isString(res.prop)) {
      res.parent[res.prop] = patch.value; // add it to object
    }
  };

  var add_1 = add$2;

  const getParent$1 = getParent_1;
  const {
    isArray: isArray$2,
    isNumber: isNumber$1,
    isObject: isObject$1
  } = _helper;

  const remove$1 = (patch, json) => {
    let res = getParent$1(patch.path, json); // object remove

    if (isObject$1(res.parent)) {
      delete res.parent[res.prop];
    } // array remove


    if (isArray$2(res.parent) && isNumber$1(res.prop)) {
      res.parent.splice(res.prop, 1);
    }
  };

  var remove_1 = remove$1;

  const getParent = getParent_1;
  const {
    isArray: isArray$1,
    isNumber,
    isObject
  } = _helper;

  const replace = (patch, json) => {
    let res = getParent(patch.path, json); // object replace

    if (isObject(res.parent)) {
      res.parent[res.prop] = patch.value;
    } // array replace


    if (isArray$1(res.parent) && isNumber(res.prop)) {
      res.parent[res.prop] = patch.value;
    }
  };

  var replace_1 = replace;

  const get$2 = get_1;
  const remove = remove_1;
  const add$1 = add_1;

  const move = (patch, json) => {
    let value = get$2(patch.from, json); //  remove it

    let removePatch = {
      op: 'remove',
      path: patch.from
    };
    remove(removePatch, json);
    let addPatch = {
      op: 'add',
      path: patch.path,
      value: value
    };
    add$1(addPatch, json);
  };

  var move_1 = move;

  const get$1 = get_1;
  const add = add_1;

  const copy = (patch, json) => {
    let value = get$1(patch.from, json);
    let addPatch = {
      op: 'add',
      path: patch.path,
      value: value
    };
    add(addPatch, json);
  };

  var copy_1 = copy;

  const get = get_1;

  const test = (patch, json) => {
    let value = get(patch.path, json);

    if (JSON.stringify(value) !== JSON.stringify(patch.value)) {
      throw new Error(`simple-json-patch error: patch-test failed '${patch.path}'`);
    }
  };

  var test_1 = test;

  const {
    isArray
  } = _helper;
  const actions = {
    add: add_1,
    remove: remove_1,
    replace: replace_1,
    move: move_1,
    copy: copy_1,
    test: test_1
  };

  const apply = function (patches, json) {
    if (!isArray(patches)) {
      patches = [patches];
    }

    patches.forEach(patch => {
      if (!actions[patch.op]) {
        return;
      }

      actions[patch.op](patch, json);
    });
    return json;
  };

  var apply_1 = apply;

  var src = {
    get: get_1,
    make: make_1,
    apply: apply_1,
    getParent: getParent_1
  };

  return src;

})));
