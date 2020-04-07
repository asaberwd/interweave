import { parse } from 'parse5';
import * as adapter from 'parse5/lib/tree-adapters/default';
import { createCommentNode, createElement, insertText } from 'parse5/lib/tree-adapters/default';
import parseStyle from 'style-parser';

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
  createCommentNode: function createCommentNode$1(data) {
    return _extends({}, createCommentNode(data), {
      ndoeType: 8
    });
  },
  createElement: function createElement$1(tagName, namespace, attrs) {
    var attributes = [].concat(attrs);

    var element = _extends({}, createElement(tagName, namespace, attrs), {
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
  insertText: function insertText$1(parentNode, text) {
    insertText(parentNode, text);
    patchTextNodeInChildren(parentNode);
  },
  insertTextBefore: function insertTextBefore(parentNode, text, referenceNode) {
    insertText(parentNode, text, referenceNode);
    patchTextNodeInChildren(parentNode);
  }
});

function parseHTML(markup) {
  return parse(markup, {
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

export { polyfill, polyfillDOMImplementation };
