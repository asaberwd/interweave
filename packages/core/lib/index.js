'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var escapeHtml = _interopDefault(require('escape-html'));

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

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

function _inheritsLoose(subClass, superClass) {
  subClass.prototype = Object.create(superClass.prototype);
  subClass.prototype.constructor = subClass;
  subClass.__proto__ = superClass;
}

function _objectWithoutPropertiesLoose(source, excluded) {
  if (source == null) return {};
  var target = {};
  var sourceKeys = Object.keys(source);
  var key, i;

  for (i = 0; i < sourceKeys.length; i++) {
    key = sourceKeys[i];
    if (excluded.indexOf(key) >= 0) continue;
    target[key] = source[key];
  }

  return target;
}

function Element(_ref) {
  var _ref$attributes = _ref.attributes,
      attributes = _ref$attributes === void 0 ? {} : _ref$attributes,
      _ref$children = _ref.children,
      children = _ref$children === void 0 ? null : _ref$children,
      _ref$selfClose = _ref.selfClose,
      selfClose = _ref$selfClose === void 0 ? false : _ref$selfClose,
      Tag = _ref.tagName;
  return selfClose ? React.createElement(Tag, attributes) : React.createElement(Tag, attributes, children);
}

var Filter = function () {
  function Filter() {}

  var _proto = Filter.prototype;

  _proto.attribute = function attribute(name, value) {
    return value;
  };

  _proto.node = function node(name, _node) {
    return _node;
  };

  return Filter;
}();

var INVALID_STYLES = /(url|image|image-set)\(/i;

var StyleFilter = function (_Filter) {
  _inheritsLoose(StyleFilter, _Filter);

  function StyleFilter() {
    return _Filter.apply(this, arguments) || this;
  }

  var _proto = StyleFilter.prototype;

  _proto.attribute = function attribute(name, value) {
    if (name === 'style') {
      Object.keys(value).forEach(function (key) {
        if (String(value[key]).match(INVALID_STYLES)) {
          delete value[key];
        }
      });
    }

    return value;
  };

  return StyleFilter;
}(Filter);

var TYPE_FLOW = 1;
var TYPE_SECTION = 1 << 1;
var TYPE_HEADING = 1 << 2;
var TYPE_PHRASING = 1 << 3;
var TYPE_EMBEDDED = 1 << 4;
var TYPE_INTERACTIVE = 1 << 5;
var TYPE_PALPABLE = 1 << 6;
var tagConfigs = {
  a: {
    content: TYPE_FLOW | TYPE_PHRASING,
    self: false,
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  address: {
    invalid: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'address', 'article', 'aside', 'section', 'div', 'header', 'footer'],
    self: false
  },
  audio: {
    children: ['track', 'source']
  },
  br: {
    type: TYPE_FLOW | TYPE_PHRASING,
    void: true
  },
  body: {
    content: TYPE_FLOW | TYPE_SECTION | TYPE_HEADING | TYPE_PHRASING | TYPE_EMBEDDED | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  button: {
    content: TYPE_PHRASING,
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  caption: {
    content: TYPE_FLOW,
    parent: ['table']
  },
  col: {
    parent: ['colgroup'],
    void: true
  },
  colgroup: {
    children: ['col'],
    parent: ['table']
  },
  details: {
    children: ['summary'],
    type: TYPE_FLOW | TYPE_INTERACTIVE | TYPE_PALPABLE
  },
  dd: {
    content: TYPE_FLOW,
    parent: ['dl']
  },
  dl: {
    children: ['dt', 'dd'],
    type: TYPE_FLOW
  },
  dt: {
    content: TYPE_FLOW,
    invalid: ['footer', 'header'],
    parent: ['dl']
  },
  figcaption: {
    content: TYPE_FLOW,
    parent: ['figure']
  },
  footer: {
    invalid: ['footer', 'header']
  },
  header: {
    invalid: ['footer', 'header']
  },
  hr: {
    type: TYPE_FLOW,
    void: true
  },
  img: {
    void: true
  },
  li: {
    content: TYPE_FLOW,
    parent: ['ul', 'ol', 'menu']
  },
  main: {
    self: false
  },
  ol: {
    children: ['li'],
    type: TYPE_FLOW
  },
  picture: {
    children: ['source', 'img'],
    type: TYPE_FLOW | TYPE_PHRASING | TYPE_EMBEDDED
  },
  rb: {
    parent: ['ruby', 'rtc']
  },
  rp: {
    parent: ['ruby', 'rtc']
  },
  rt: {
    content: TYPE_PHRASING,
    parent: ['ruby', 'rtc']
  },
  rtc: {
    content: TYPE_PHRASING,
    parent: ['ruby']
  },
  ruby: {
    children: ['rb', 'rp', 'rt', 'rtc']
  },
  source: {
    parent: ['audio', 'video', 'picture'],
    void: true
  },
  summary: {
    content: TYPE_PHRASING,
    parent: ['details']
  },
  table: {
    children: ['caption', 'colgroup', 'thead', 'tbody', 'tfoot', 'tr'],
    type: TYPE_FLOW
  },
  tbody: {
    parent: ['table'],
    children: ['tr']
  },
  td: {
    content: TYPE_FLOW,
    parent: ['tr']
  },
  tfoot: {
    parent: ['table'],
    children: ['tr']
  },
  th: {
    content: TYPE_FLOW,
    parent: ['tr']
  },
  thead: {
    parent: ['table'],
    children: ['tr']
  },
  tr: {
    parent: ['table', 'tbody', 'thead', 'tfoot'],
    children: ['th', 'td']
  },
  track: {
    parent: ['audio', 'video'],
    void: true
  },
  ul: {
    children: ['li'],
    type: TYPE_FLOW
  },
  video: {
    children: ['track', 'source']
  },
  wbr: {
    type: TYPE_FLOW | TYPE_PHRASING,
    void: true
  }
};

function createConfigBuilder(config) {
  return function (tagName) {
    tagConfigs[tagName] = _extends({}, config, {}, tagConfigs[tagName]);
  };
}

['address', 'main', 'div', 'figure', 'p', 'pre'].forEach(createConfigBuilder({
  content: TYPE_FLOW,
  type: TYPE_FLOW | TYPE_PALPABLE
}));
['abbr', 'b', 'bdi', 'bdo', 'cite', 'code', 'data', 'dfn', 'em', 'i', 'kbd', 'mark', 'q', 'ruby', 'samp', 'strong', 'sub', 'sup', 'time', 'u', 'var'].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PHRASING | TYPE_PALPABLE
}));
['p', 'pre'].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PALPABLE
}));
['s', 'small', 'span', 'del', 'ins'].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_PHRASING
}));
['article', 'aside', 'footer', 'header', 'nav', 'section', 'blockquote'].forEach(createConfigBuilder({
  content: TYPE_FLOW,
  type: TYPE_FLOW | TYPE_SECTION | TYPE_PALPABLE
}));
['h1', 'h2', 'h3', 'h4', 'h5', 'h6'].forEach(createConfigBuilder({
  content: TYPE_PHRASING,
  type: TYPE_FLOW | TYPE_HEADING | TYPE_PALPABLE
}));
['audio', 'canvas', 'iframe', 'img', 'video'].forEach(createConfigBuilder({
  type: TYPE_FLOW | TYPE_PHRASING | TYPE_EMBEDDED | TYPE_PALPABLE
}));
var TAGS = Object.freeze(tagConfigs);
var BANNED_TAG_LIST = ['applet', 'base', 'body', 'command', 'embed', 'frame', 'frameset', 'head', 'html', 'link', 'meta', 'object', 'style', 'title'];
var ALLOWED_TAG_LIST = Object.keys(TAGS).filter(function (tag) {
  return tag !== 'canvas' && tag !== 'iframe';
});
var FILTER_ALLOW = 1;
var FILTER_DENY = 2;
var FILTER_CAST_NUMBER = 3;
var FILTER_CAST_BOOL = 4;
var FILTER_NO_CAST = 5;
var ATTRIBUTES = Object.freeze({
  alt: FILTER_ALLOW,
  cite: FILTER_ALLOW,
  class: FILTER_ALLOW,
  colspan: FILTER_CAST_NUMBER,
  controls: FILTER_CAST_BOOL,
  datetime: FILTER_ALLOW,
  default: FILTER_CAST_BOOL,
  disabled: FILTER_CAST_BOOL,
  dir: FILTER_ALLOW,
  height: FILTER_ALLOW,
  href: FILTER_ALLOW,
  id: FILTER_ALLOW,
  kind: FILTER_ALLOW,
  label: FILTER_ALLOW,
  lang: FILTER_ALLOW,
  loading: FILTER_ALLOW,
  loop: FILTER_CAST_BOOL,
  media: FILTER_ALLOW,
  muted: FILTER_CAST_BOOL,
  poster: FILTER_ALLOW,
  role: FILTER_ALLOW,
  rowspan: FILTER_CAST_NUMBER,
  scope: FILTER_ALLOW,
  sizes: FILTER_ALLOW,
  span: FILTER_CAST_NUMBER,
  start: FILTER_CAST_NUMBER,
  style: FILTER_NO_CAST,
  src: FILTER_ALLOW,
  srclang: FILTER_ALLOW,
  srcset: FILTER_ALLOW,
  target: FILTER_ALLOW,
  title: FILTER_ALLOW,
  type: FILTER_ALLOW,
  width: FILTER_ALLOW
});
var ATTRIBUTES_TO_PROPS = Object.freeze({
  class: 'className',
  colspan: 'colSpan',
  datetime: 'dateTime',
  rowspan: 'rowSpan',
  srclang: 'srcLang',
  srcset: 'srcSet'
});

var ELEMENT_NODE = 1;
var TEXT_NODE = 3;
var INVALID_ROOTS = /^<(!doctype|(html|head|body)(\s|>))/i;
var ALLOWED_ATTRS = /^(aria\x2D|data\x2D|[0-9A-Z_a-z\u017F\u212A]+:)/i;
var OPEN_TOKEN = /{{{(\w+)\/?}}}/;

function createDocument() {
  if (typeof window === 'undefined' || typeof document === 'undefined') {
    return undefined;
  }

  return document.implementation.createHTMLDocument('Interweave');
}

var Parser = function () {
  function Parser(markup, props, matchers, filters) {
    if (props === void 0) {
      props = {};
    }

    if (matchers === void 0) {
      matchers = [];
    }

    if (filters === void 0) {
      filters = [];
    }

    _defineProperty(this, "allowed", void 0);

    _defineProperty(this, "banned", void 0);

    _defineProperty(this, "blocked", void 0);

    _defineProperty(this, "container", void 0);

    _defineProperty(this, "content", []);

    _defineProperty(this, "props", void 0);

    _defineProperty(this, "matchers", void 0);

    _defineProperty(this, "filters", void 0);

    _defineProperty(this, "keyIndex", void 0);

    if ("production" !== process.env.NODE_ENV) {
      if (markup && typeof markup !== 'string') {
        throw new TypeError('Interweave parser requires a valid string.');
      }
    }

    this.props = props;
    this.matchers = matchers;
    this.filters = [].concat(filters, [new StyleFilter()]);
    this.keyIndex = -1;
    this.container = this.createContainer(markup || '');
    this.allowed = new Set(props.allowList || ALLOWED_TAG_LIST);
    this.banned = new Set(BANNED_TAG_LIST);
    this.blocked = new Set(props.blockList);
  }

  var _proto = Parser.prototype;

  _proto.applyAttributeFilters = function applyAttributeFilters(name, value) {
    return this.filters.reduce(function (nextValue, filter) {
      return nextValue !== null && typeof filter.attribute === 'function' ? filter.attribute(name, nextValue) : nextValue;
    }, value);
  };

  _proto.applyNodeFilters = function applyNodeFilters(name, node) {
    return this.filters.reduce(function (nextNode, filter) {
      return nextNode !== null && typeof filter.node === 'function' ? filter.node(name, nextNode) : nextNode;
    }, node);
  };

  _proto.applyMatchers = function applyMatchers(string, parentConfig) {
    var _this = this;

    var elements = {};
    var props = this.props;
    var matchedString = string;
    var elementIndex = 0;
    var parts = null;
    this.matchers.forEach(function (matcher) {
      var tagName = matcher.asTag().toLowerCase();

      var config = _this.getTagConfig(tagName);

      if (props[matcher.inverseName] || !_this.isTagAllowed(tagName)) {
        return;
      }

      if (!_this.canRenderChild(parentConfig, config)) {
        return;
      }

      var tokenizedString = '';

      while (matchedString && (parts = matcher.match(matchedString))) {
        var _parts = parts,
            index = _parts.index,
            length = _parts.length,
            match = _parts.match,
            valid = _parts.valid,
            isVoid = _parts.void,
            partProps = _objectWithoutPropertiesLoose(_parts, ["index", "length", "match", "valid", "void"]);

        var tokenName = matcher.propName + elementIndex;

        if (index > 0) {
          tokenizedString += matchedString.slice(0, index);
        }

        if (valid) {
          if (isVoid) {
            tokenizedString += "{{{" + tokenName + "/}}}";
          } else {
            tokenizedString += "{{{" + tokenName + "}}}" + match + "{{{/" + tokenName + "}}}";
          }

          _this.keyIndex += 1;
          elementIndex += 1;
          elements[tokenName] = {
            children: match,
            matcher: matcher,
            props: _extends({}, props, {}, partProps, {
              key: _this.keyIndex
            })
          };
        } else {
          tokenizedString += match;
        }

        if (matcher.greedy) {
          matchedString = tokenizedString + matchedString.slice(index + length);
          tokenizedString = '';
        } else {
          matchedString = matchedString.slice(index + (length || match.length));
        }
      }

      if (!matcher.greedy) {
        matchedString = tokenizedString + matchedString;
      }
    });

    if (elementIndex === 0) {
      return string;
    }

    return this.replaceTokens(matchedString, elements);
  };

  _proto.canRenderChild = function canRenderChild(parentConfig, childConfig) {
    if (!parentConfig.tagName || !childConfig.tagName) {
      return false;
    }

    if (parentConfig.void) {
      return false;
    }

    if (parentConfig.children.length > 0) {
      return parentConfig.children.includes(childConfig.tagName);
    }

    if (parentConfig.invalid.length > 0 && parentConfig.invalid.includes(childConfig.tagName)) {
      return false;
    }

    if (childConfig.parent.length > 0) {
      return childConfig.parent.includes(parentConfig.tagName);
    }

    if (!parentConfig.self && parentConfig.tagName === childConfig.tagName) {
      return false;
    }

    return Boolean(parentConfig && parentConfig.content & childConfig.type);
  };

  _proto.convertLineBreaks = function convertLineBreaks(markup) {
    var _this$props = this.props,
        noHtml = _this$props.noHtml,
        disableLineBreaks = _this$props.disableLineBreaks;

    if (noHtml || disableLineBreaks || markup.match(/<((?:\/[ a-z]+)|(?:[ a-z]+\/))>/gi)) {
      return markup;
    }

    var nextMarkup = markup.replace(/\r\n/g, '\n');
    nextMarkup = nextMarkup.replace(/\n{3,}/g, '\n\n\n');
    nextMarkup = nextMarkup.replace(/\n/g, '<br/>');
    return nextMarkup;
  };

  _proto.createContainer = function createContainer(markup) {
    var factory = global.INTERWEAVE_SSR_POLYFILL || createDocument;
    var doc = factory();

    if (!doc) {
      return undefined;
    }

    var tag = this.props.containerTagName || 'body';
    var el = tag === 'body' || tag === 'fragment' ? doc.body : doc.createElement(tag);

    if (markup.match(INVALID_ROOTS)) {
      if ("production" !== process.env.NODE_ENV) {
        throw new Error('HTML documents as Interweave content are not supported.');
      }
    } else {
      el.innerHTML = this.convertLineBreaks(this.props.escapeHtml ? escapeHtml(markup) : markup);
    }

    return el;
  };

  _proto.extractAttributes = function extractAttributes(node) {
    var _this2 = this;

    var allowAttributes = this.props.allowAttributes;
    var attributes = {};
    var count = 0;

    if (node.nodeType !== ELEMENT_NODE || !node.attributes) {
      return null;
    }

    Array.from(node.attributes).forEach(function (attr) {
      var name = attr.name,
          value = attr.value;
      var newName = name.toLowerCase();
      var filter = ATTRIBUTES[newName] || ATTRIBUTES[name];

      if (!_this2.isSafe(node)) {
        return;
      }

      if (!newName.match(ALLOWED_ATTRS)) {
        if (!allowAttributes && (!filter || filter === FILTER_DENY) || newName.match(/^on/) || value.replace(/(\s|\0|&#x0([9AD]);)/, '').match(/(javascript|vbscript|livescript|xss):/i)) {
          return;
        }
      }

      var newValue = newName === 'style' ? _this2.extractStyleAttribute(node) : value;

      if (filter === FILTER_CAST_BOOL) {
        newValue = true;
      } else if (filter === FILTER_CAST_NUMBER) {
        newValue = parseFloat(String(newValue));
      } else if (filter !== FILTER_NO_CAST) {
        newValue = String(newValue);
      }

      attributes[ATTRIBUTES_TO_PROPS[newName] || newName] = _this2.applyAttributeFilters(newName, newValue);
      count += 1;
    });

    if (count === 0) {
      return null;
    }

    return attributes;
  };

  _proto.extractStyleAttribute = function extractStyleAttribute(node) {
    var styles = {};
    Array.from(node.style).forEach(function (key) {
      var value = node.style[key];
      styles[key.replace(/-([a-z])/g, function (match, letter) {
        return letter.toUpperCase();
      })] = value;
    });
    return styles;
  };

  _proto.getTagConfig = function getTagConfig(tagName) {
    var common = {
      children: [],
      content: 0,
      invalid: [],
      parent: [],
      self: true,
      tagName: '',
      type: 0,
      void: false
    };

    if (TAGS[tagName]) {
      return _extends({}, common, {}, TAGS[tagName], {
        tagName: tagName
      });
    }

    return common;
  };

  _proto.isSafe = function isSafe(node) {
    if (typeof HTMLAnchorElement !== 'undefined' && node instanceof HTMLAnchorElement) {
      var href = node.getAttribute('href');

      if (href && href.charAt(0) === '#') {
        return true;
      }

      var protocol = node.protocol.toLowerCase();
      return protocol === ':' || protocol === 'http:' || protocol === 'https:' || protocol === 'mailto:' || protocol === 'tel:';
    }

    return true;
  };

  _proto.isTagAllowed = function isTagAllowed(tagName) {
    if (this.banned.has(tagName) || this.blocked.has(tagName)) {
      return false;
    }

    return this.props.allowElements || this.allowed.has(tagName);
  };

  _proto.parse = function parse() {
    if (!this.container) {
      return [];
    }

    return this.parseNode(this.container, this.getTagConfig(this.container.nodeName.toLowerCase()));
  };

  _proto.parseNode = function parseNode(parentNode, parentConfig) {
    var _this3 = this;

    var _this$props2 = this.props,
        noHtml = _this$props2.noHtml,
        noHtmlExceptMatchers = _this$props2.noHtmlExceptMatchers,
        allowElements = _this$props2.allowElements,
        transform = _this$props2.transform;
    var content = [];
    var mergedText = '';
    Array.from(parentNode.childNodes).forEach(function (node) {
      if (node.nodeType === ELEMENT_NODE) {
        var tagName = node.nodeName.toLowerCase();

        var config = _this3.getTagConfig(tagName);

        if (mergedText) {
          content.push(mergedText);
          mergedText = '';
        }

        var nextNode = _this3.applyNodeFilters(tagName, node);

        if (!nextNode) {
          return;
        }

        var children;

        if (transform) {
          _this3.keyIndex += 1;
          var _key = _this3.keyIndex;
          children = _this3.parseNode(nextNode, config);
          var transformed = transform(nextNode, children, config);

          if (transformed === null) {
            return;
          } else if (typeof transformed !== 'undefined') {
            content.push(React.cloneElement(transformed, {
              key: _key
            }));
            return;
          }

          _this3.keyIndex = _key - 1;
        }

        if (_this3.banned.has(tagName)) {
          return;
        }

        if (!(noHtml || noHtmlExceptMatchers && tagName !== 'br') && _this3.isTagAllowed(tagName) && (allowElements || _this3.canRenderChild(parentConfig, config))) {
          _this3.keyIndex += 1;

          var attributes = _this3.extractAttributes(nextNode);

          var elementProps = {
            tagName: tagName
          };

          if (attributes) {
            elementProps.attributes = attributes;
          }

          if (config.void) {
            elementProps.selfClose = config.void;
          }

          content.push(React.createElement(Element, _extends({}, elementProps, {
            key: _this3.keyIndex
          }), children || _this3.parseNode(nextNode, config)));
        } else {
          content = content.concat(_this3.parseNode(nextNode, config.tagName ? config : parentConfig));
        }
      } else if (node.nodeType === TEXT_NODE) {
        var text = noHtml && !noHtmlExceptMatchers ? node.textContent : _this3.applyMatchers(node.textContent || '', parentConfig);

        if (Array.isArray(text)) {
          content = content.concat(text);
        } else {
          mergedText += text;
        }
      }
    });

    if (mergedText) {
      content.push(mergedText);
    }

    return content;
  };

  _proto.replaceTokens = function replaceTokens(tokenizedString, elements) {
    if (!tokenizedString.includes('{{{')) {
      return tokenizedString;
    }

    var nodes = [];
    var text = tokenizedString;
    var open = null;

    while (open = text.match(OPEN_TOKEN)) {
      var _open = open,
          match = _open[0],
          tokenName = _open[1];
      var startIndex = open.index;
      var isVoid = match.includes('/');

      if ("production" !== process.env.NODE_ENV) {
        if (!elements[tokenName]) {
          throw new Error("Token \"" + tokenName + "\" found but no matching element to replace with.");
        }
      }

      if (startIndex > 0) {
        nodes.push(text.slice(0, startIndex));
        text = text.slice(startIndex);
      }

      var _elements$tokenName = elements[tokenName],
          children = _elements$tokenName.children,
          matcher = _elements$tokenName.matcher,
          elementProps = _elements$tokenName.props;
      var endIndex = void 0;

      if (isVoid) {
        endIndex = match.length;
        nodes.push(matcher.createElement(children, elementProps));
      } else {
        var close = text.match(new RegExp("{{{/" + tokenName + "}}}"));

        if ("production" !== process.env.NODE_ENV) {
          if (!close) {
            throw new Error("Closing token missing for interpolated element \"" + tokenName + "\".");
          }
        }

        endIndex = close.index + close[0].length;
        nodes.push(matcher.createElement(this.replaceTokens(text.slice(match.length, close.index), elements), elementProps));
      }

      text = text.slice(endIndex);
    }

    if (text.length > 0) {
      nodes.push(text);
    }

    if (nodes.length === 0) {
      return '';
    } else if (nodes.length === 1 && typeof nodes[0] === 'string') {
      return nodes[0];
    }

    return nodes;
  };

  return Parser;
}();

function Markup(props) {
  var attributes = props.attributes,
      containerTagName = props.containerTagName,
      content = props.content,
      emptyContent = props.emptyContent,
      parsedContent = props.parsedContent,
      tagName = props.tagName;
  var tag = containerTagName || tagName || 'div';
  var noWrap = tag === 'fragment' ? true : props.noWrap;
  var mainContent;

  if (parsedContent) {
    mainContent = parsedContent;
  } else {
    var markup = new Parser(content || '', props).parse();

    if (markup.length > 0) {
      mainContent = markup;
    }
  }

  if (!mainContent) {
    mainContent = emptyContent;
  }

  if (noWrap) {
    return React.createElement(React.Fragment, null, mainContent);
  }

  return React.createElement(Element, {
    attributes: attributes,
    tagName: tag
  }, mainContent);
}

function Interweave(props) {
  var attributes = props.attributes,
      _props$content = props.content,
      content = _props$content === void 0 ? '' : _props$content,
      _props$disableFilters = props.disableFilters,
      disableFilters = _props$disableFilters === void 0 ? false : _props$disableFilters,
      _props$disableMatcher = props.disableMatchers,
      disableMatchers = _props$disableMatcher === void 0 ? false : _props$disableMatcher,
      _props$emptyContent = props.emptyContent,
      emptyContent = _props$emptyContent === void 0 ? null : _props$emptyContent,
      _props$filters = props.filters,
      filters = _props$filters === void 0 ? [] : _props$filters,
      _props$matchers = props.matchers,
      matchers = _props$matchers === void 0 ? [] : _props$matchers,
      _props$onAfterParse = props.onAfterParse,
      onAfterParse = _props$onAfterParse === void 0 ? null : _props$onAfterParse,
      _props$onBeforeParse = props.onBeforeParse,
      onBeforeParse = _props$onBeforeParse === void 0 ? null : _props$onBeforeParse,
      _props$tagName = props.tagName,
      tagName = _props$tagName === void 0 ? 'span' : _props$tagName,
      _props$noWrap = props.noWrap,
      noWrap = _props$noWrap === void 0 ? false : _props$noWrap,
      parserProps = _objectWithoutPropertiesLoose(props, ["attributes", "content", "disableFilters", "disableMatchers", "emptyContent", "filters", "matchers", "onAfterParse", "onBeforeParse", "tagName", "noWrap"]);

  var allMatchers = disableMatchers ? [] : matchers;
  var allFilters = disableFilters ? [] : filters;
  var beforeCallbacks = onBeforeParse ? [onBeforeParse] : [];
  var afterCallbacks = onAfterParse ? [onAfterParse] : [];
  allMatchers.forEach(function (matcher) {
    if (matcher.onBeforeParse) {
      beforeCallbacks.push(matcher.onBeforeParse.bind(matcher));
    }

    if (matcher.onAfterParse) {
      afterCallbacks.push(matcher.onAfterParse.bind(matcher));
    }
  });
  var markup = beforeCallbacks.reduce(function (string, callback) {
    var nextString = callback(string, props);

    if ("production" !== process.env.NODE_ENV) {
      if (typeof nextString !== 'string') {
        throw new TypeError('Interweave `onBeforeParse` must return a valid HTML string.');
      }
    }

    return nextString;
  }, content || '');
  var parser = new Parser(markup, parserProps, allMatchers, allFilters);
  var nodes = afterCallbacks.reduce(function (parserNodes, callback) {
    var nextNodes = callback(parserNodes, props);

    if ("production" !== process.env.NODE_ENV) {
      if (!Array.isArray(nextNodes)) {
        throw new TypeError('Interweave `onAfterParse` must return an array of strings and React elements.');
      }
    }

    return nextNodes;
  }, parser.parse());
  return React.createElement(Markup, {
    attributes: attributes,
    containerTagName: props.containerTagName,
    emptyContent: emptyContent,
    tagName: tagName,
    noWrap: noWrap,
    parsedContent: nodes.length === 0 ? undefined : nodes
  });
}

function match(string, pattern, callback, isVoid) {
  if (isVoid === void 0) {
    isVoid = false;
  }

  var matches = string.match(pattern instanceof RegExp ? pattern : new RegExp(pattern, 'i'));

  if (!matches) {
    return null;
  }

  return _extends({
    match: matches[0],
    void: isVoid
  }, callback(matches), {
    index: matches.index,
    length: matches[0].length,
    valid: true
  });
}

var Matcher = function () {
  function Matcher(name, options, factory) {
    _defineProperty(this, "greedy", false);

    _defineProperty(this, "options", void 0);

    _defineProperty(this, "propName", void 0);

    _defineProperty(this, "inverseName", void 0);

    _defineProperty(this, "factory", void 0);

    if ("production" !== process.env.NODE_ENV) {
      if (!name || name.toLowerCase() === 'html') {
        throw new Error("The matcher name \"" + name + "\" is not allowed.");
      }
    }

    this.options = _extends({}, options);
    this.propName = name;
    this.inverseName = "no" + (name.charAt(0).toUpperCase() + name.slice(1));
    this.factory = factory || null;
  }

  var _proto = Matcher.prototype;

  _proto.createElement = function createElement(children, props) {
    var element = null;

    if (this.factory) {
      element = React.createElement(this.factory, props, children);
    } else {
      element = this.replaceWith(children, props);
    }

    if ("production" !== process.env.NODE_ENV) {
      if (typeof element !== 'string' && !React.isValidElement(element)) {
        throw new Error("Invalid React element created from " + this.constructor.name + ".");
      }
    }

    return element;
  };

  _proto.doMatch = function doMatch(string, pattern, callback, isVoid) {
    if (isVoid === void 0) {
      isVoid = false;
    }

    return match(string, pattern, callback, isVoid);
  };

  _proto.onBeforeParse = function onBeforeParse(content, props) {
    return content;
  };

  _proto.onAfterParse = function onAfterParse(content, props) {
    return content;
  };

  return Matcher;
}();

/**
 * @copyright   2016-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

exports.ALLOWED_TAG_LIST = ALLOWED_TAG_LIST;
exports.ATTRIBUTES = ATTRIBUTES;
exports.ATTRIBUTES_TO_PROPS = ATTRIBUTES_TO_PROPS;
exports.BANNED_TAG_LIST = BANNED_TAG_LIST;
exports.Element = Element;
exports.FILTER_ALLOW = FILTER_ALLOW;
exports.FILTER_CAST_BOOL = FILTER_CAST_BOOL;
exports.FILTER_CAST_NUMBER = FILTER_CAST_NUMBER;
exports.FILTER_DENY = FILTER_DENY;
exports.FILTER_NO_CAST = FILTER_NO_CAST;
exports.Filter = Filter;
exports.Markup = Markup;
exports.Matcher = Matcher;
exports.Parser = Parser;
exports.TAGS = TAGS;
exports.TYPE_EMBEDDED = TYPE_EMBEDDED;
exports.TYPE_FLOW = TYPE_FLOW;
exports.TYPE_HEADING = TYPE_HEADING;
exports.TYPE_INTERACTIVE = TYPE_INTERACTIVE;
exports.TYPE_PALPABLE = TYPE_PALPABLE;
exports.TYPE_PHRASING = TYPE_PHRASING;
exports.TYPE_SECTION = TYPE_SECTION;
exports.default = Interweave;
exports.match = match;
