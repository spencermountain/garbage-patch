/* garbage-patch 0.1.0 MIT */
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = typeof globalThis !== 'undefined' ? globalThis : global || self, factory(global.simpleJsonPatch = {}));
})(this, (function (exports) { 'use strict';

  const isNum = /^[0-9]+$/; // https://datatracker.ietf.org/doc/html/rfc6901
  // '~' is encoded as '~0'
  // '/' is encoded as '~1'

  const unescape = function (str) {
    str = str.replace(/~1/g, '/');
    str = str.replace(/~0/g, '~');
    return str;
  }; // turn a pointer string into an array


  const parsePointer = function (pointr) {
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

  var parsePointer$1 = parsePointer;

  const isArray = function (arr) {
    return Object.prototype.toString.call(arr) === '[object Array]';
  };

  const isNumber = function (val) {
    return typeof val === 'number' && isFinite(val);
  };

  const isString = function (val) {
    return typeof val === 'string';
  };

  const isObject = function (val) {
    return Object.prototype.toString.call(val) === '[object Object]';
  };

  const get = function (pointr, data) {
    // empty pointer is everything.
    if (!pointr) {
      return data;
    }

    let parts = pointr;

    if (typeof pointr === 'string') {
      parts = parsePointer$1(pointr);
    } // support leading slash


    if (parts[0] === '') {
      parts.shift(); //   return undefined
    }

    let node = data; // walk through parts of the pointer

    for (let i = 0; i < parts.length; i += 1) {
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

  var get$1 = get;

  // https://datatracker.ietf.org/doc/html/rfc6901
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

  var make$1 = make;

  const getParent = function (pointr, json) {
    let prop = '';
    let parts = parsePointer$1(pointr);

    if (parts.length > 1) {
      prop = parts.pop();
    }

    let parent = get$1(parts, json); // a parent must be an object or an array

    if (!isArray(parent) && !isObject(parent)) {
      parent = undefined;
    }

    return {
      parent: parent,
      prop: prop
    };
  };

  var getParent$1 = getParent; // let json = {
  //   foo: ['bar', 'baz'],
  //   cool: {
  //     yes: {
  //       oh: 'yeah',
  //     },
  //   },
  // }
  // console.log(getParent('/cool/yes/', json))

  const add = (patch, json) => {
    let node = get$1(patch.path, json); // sneaky-push

    if (isArray(node) === true) {
      node.push(patch.value);
      return;
    } // sneaky-splat


    if (isObject(node) === true && isObject(patch.value) === true) {
      Object.assign(node, patch.value);
      return;
    } // traditional array-add


    let res = getParent$1(patch.path, json);

    if (isArray(res.parent)) {
      if (res.prop === '-') {
        res.parent.push(patch.value); //simple push
      } else if (isNumber(res.prop)) {
        res.parent.splice(res.prop, 0, patch.value); // splice into index
      }
    } // traditional object-add


    if (isObject(res.parent) && isString(res.prop)) {
      res.parent[res.prop] = patch.value; // add it to object
    }
  };

  var add$1 = add;

  const remove = (patch, json) => {
    let res = getParent$1(patch.path, json); // object remove

    if (isObject(res.parent)) {
      delete res.parent[res.prop];
    } // array remove


    if (isArray(res.parent) && isNumber(res.prop)) {
      res.parent.splice(res.prop, 1);
    }
  };

  var remove$1 = remove;

  const replace = (patch, json) => {
    let res = getParent$1(patch.path, json); // object replace

    if (isObject(res.parent)) {
      res.parent[res.prop] = patch.value;
    } // array replace


    if (isArray(res.parent) && isNumber(res.prop)) {
      res.parent[res.prop] = patch.value;
    }
  };

  var replace$1 = replace;

  const move = (patch, json) => {
    let value = get$1(patch.from, json); //  remove it

    let removePatch = {
      op: 'remove',
      path: patch.from
    };
    remove$1(removePatch, json);
    let addPatch = {
      op: 'add',
      path: patch.path,
      value: value
    };
    add$1(addPatch, json);
  };

  var move$1 = move;

  const copy = (patch, json) => {
    let value = get$1(patch.from, json);
    let addPatch = {
      op: 'add',
      path: patch.path,
      value: value
    };
    add$1(addPatch, json);
  };

  var copy$1 = copy;

  const test = (patch, json) => {
    let value = get$1(patch.path, json);

    if (JSON.stringify(value) !== JSON.stringify(patch.value)) {
      throw new Error("garbage-patch error: patch-test failed '".concat(patch.path, "'"));
    }
  };

  var test$1 = test;

  const actions = {
    add: add$1,
    remove: remove$1,
    replace: replace$1,
    move: move$1,
    copy: copy$1,
    test: test$1
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

  var apply$1 = apply;

  exports.apply = apply$1;
  exports.get = get$1;
  exports.getParent = getParent$1;
  exports.make = make$1;

  Object.defineProperty(exports, '__esModule', { value: true });

}));
