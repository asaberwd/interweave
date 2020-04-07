'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var parse5 = require('parse5');
var adapter = require('parse5/lib/tree-adapters/default');
var parseStyle = _interopDefault(require('style-parser'));

function _extends() {
  _extends = Object.assign || function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];

      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }

    return target;
  };

  return _extends.apply(this, arguments);
}

function patchTextNodeInChildren(parentNode) {
  parentNode.childNodes.forEach(function (node) {
    if (node.nodeName === '#text' && !node.textContent) {
      Object.defineProperties(node, {
        nodeType: {
          value: 3
        },
        textContent: {
          value: node.value,
          writable: true
        },
        value: {
          get: function get() {
            return this.textContent;
          },
          set: function set(value) {
            this.textContent = value;
          }
        }
      });
    }
  });
}

function createStyleDeclaration(decls) {
  var object = parseStyle(decls);
  var style = Object.keys(object);
  Object.assign(style, object);
  return style;
}

var treeAdapter = _extends({}, adapter, {
  createCommentNode: function createCommentNode(data) {
    return _extends({}, adapter.createCommentNode(data), {
      ndoeType: 8
    });
  },
  createElement: function createElement(tagName, namespace, attrs) {
    var attributes = [].concat(attrs);

    var element = _extends({}, adapter.createElement(tagName, namespace, attrs), {
      attributes: attributes,
      getAttribute: function getAttribute(name) {
        var result = attributes.find(function (attr) {
          return attr.name === name;
        });
        return result ? result.value : null;
      },
      hasAttribute: function hasAttribute(name) {
        return !!attributes.find(function (attr) {
          return attr.name === name;
        });
      },
      nodeType: 1,
      removeAttribute: function removeAttribute(name) {
        attributes = attributes.filter(function (attr) {
          return attr.name !== name;
        });
      },
      setAttribute: function setAttribute(name, value) {
        var result = attributes.find(function (attr) {
          return attr.name === name;
        });

        if (result) {
          result.value = value;
        } else {
          attributes.push({
            name: name,
            value: value
          });
        }
      },
      style: [],
      tagName: tagName,
      textContent: ''
    });

    var style = element.getAttribute('style');

    if (style) {
      element.style = createStyleDeclaration(style);
    }

    if (element.nodeName === 'a') {
      element.protocol = ':';
    }

    return element;
  },
  insertText: function insertText(parentNode, text) {
    adapter.insertText(parentNode, text);
    patchTextNodeInChildren(parentNode);
  },
  insertTextBefore: function insertTextBefore(parentNode, text, referenceNode) {
    adapter.insertText(parentNode, text, referenceNode);
    patchTextNodeInChildren(parentNode);
  }
});

function parseHTML(markup) {
  return parse5.parse(markup, {
    treeAdapter: treeAdapter
  });
}

function createHTMLDocument() {
  var doc = parseHTML('<!DOCTYPE html><html><head></head><body></body></html>');
  var html = doc.childNodes[1];
  var body = html.childNodes[1];
  Object.defineProperty(html, 'body', {
    value: body
  });
  Object.defineProperty(body, 'innerHTML', {
    set: function set(value) {
      this.childNodes = parseHTML(String(value)).childNodes[0].childNodes[1].childNodes;
    }
  });
  return html;
}

function polyfill() {
  global.INTERWEAVE_SSR_POLYFILL = createHTMLDocument;
}
function polyfillDOMImplementation() {
  if (typeof document === 'undefined') {
    global.document = {};
  }

  if (typeof document.implementation === 'undefined') {
    global.document.implementation = {};
  }

  if (typeof document.implementation.createHTMLDocument !== 'function') {
    global.document.implementation.createHTMLDocument = createHTMLDocument;
  }
}

exports.polyfill = polyfill;
exports.polyfillDOMImplementation = polyfillDOMImplementation;
