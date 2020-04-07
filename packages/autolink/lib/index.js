'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

function _interopDefault (ex) { return (ex && (typeof ex === 'object') && 'default' in ex) ? ex['default'] : ex; }

var React = _interopDefault(require('react'));
var interweave = require('interweave');

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

function Link(_ref) {
  var children = _ref.children,
      href = _ref.href,
      onClick = _ref.onClick,
      newWindow = _ref.newWindow;
  return React.createElement("a", {
    href: href,
    target: newWindow ? '_blank' : undefined,
    onClick: onClick,
    rel: "noopener noreferrer"
  }, children);
}

function Email(_ref) {
  var children = _ref.children,
      email = _ref.email,
      emailParts = _ref.emailParts,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "email", "emailParts"]);

  return React.createElement(Link, _extends({}, props, {
    href: "mailto:" + email
  }), children);
}

function combinePatterns(patterns, options) {
  if (options === void 0) {
    options = {};
  }

  var regex = patterns.map(function (pattern) {
    return pattern.source;
  }).join(options.join || '');

  if (options.capture) {
    regex = "(" + regex + ")";
  } else if (options.nonCapture) {
    regex = "(?:" + regex + ")";
  }

  if (options.match) {
    regex += options.match;
  }

  return new RegExp(regex, options.flags || '');
}
var VALID_ALNUM_CHARS = /[a-z0-9]/;
var VALID_PATH_CHARS = /(?:[a-zA-Z\u0400-\u04FF0-9\-_~!$&'()[\]\\/*+,;=.%]*)/;
var URL_SCHEME = /(https?:\/\/)?/;
var URL_AUTH = combinePatterns([/[a-z\u0400-\u04FF0-9\-_~!$&'()*+,;=.:]+/, /@/], {
  capture: true,
  match: '?'
});
var URL_HOST = combinePatterns([/(?:(?:[a-z0-9](?:[-a-z0-9_]*[a-z0-9])?)\.)*/, /(?:(?:[a-z0-9](?:[-a-z0-9]*[a-z0-9])?)\.)/, /(?:[a-z](?:[-a-z0-9]*[a-z0-9])?)/], {
  capture: true
});
var URL_PORT = /(?::(\d{1,5}))?/;
var URL_PATH = combinePatterns([/\//, combinePatterns([/[-+a-z0-9!*';:=,.$/%[\]_~@|&]*/, /[-+a-z0-9/]/], {
  match: '*',
  nonCapture: true
})], {
  capture: true,
  match: '?'
});
var URL_QUERY = combinePatterns([/\?/, combinePatterns([VALID_PATH_CHARS, /[a-z0-9_&=]/], {
  match: '?',
  nonCapture: true
})], {
  capture: true,
  match: '?'
});
var URL_FRAGMENT = combinePatterns([/#/, combinePatterns([VALID_PATH_CHARS, /[a-z0-9]/], {
  match: '?',
  nonCapture: true
})], {
  capture: true,
  match: '?'
});
var URL_PATTERN = combinePatterns([URL_SCHEME, URL_AUTH, URL_HOST, URL_PORT, URL_PATH, URL_QUERY, URL_FRAGMENT], {
  flags: 'i'
});
var IP_V4_PART = /(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)/;
var IP_V4 = combinePatterns([IP_V4_PART, IP_V4_PART, IP_V4_PART, IP_V4_PART], {
  capture: true,
  join: '\\.'
});
var IP_PATTERN = combinePatterns([URL_SCHEME, URL_AUTH, IP_V4, URL_PORT, URL_PATH, URL_QUERY, URL_FRAGMENT], {
  flags: 'i'
});
var HASHTAG_PATTERN = combinePatterns([/#/, combinePatterns([VALID_ALNUM_CHARS, /[-a-z0-9_]*/, VALID_ALNUM_CHARS], {
  capture: true
})], {
  flags: 'i'
});
var EMAIL_USERNAME_PART = /[a-z0-9!#$%&?*+=_{|}~-]+/;
var EMAIL_USERNAME = combinePatterns([VALID_ALNUM_CHARS, EMAIL_USERNAME_PART, VALID_ALNUM_CHARS, combinePatterns([/\./, VALID_ALNUM_CHARS, EMAIL_USERNAME_PART, VALID_ALNUM_CHARS], {
  match: '?',
  nonCapture: true
})], {
  capture: true
});
var EMAIL_PATTERN = combinePatterns([EMAIL_USERNAME, URL_HOST], {
  flags: 'i',
  join: '@'
});
var EMAIL_DISTINCT_PATTERN = new RegExp("^" + EMAIL_PATTERN.source + "$", EMAIL_PATTERN.flags);
var TOP_LEVEL_TLDS = ['com', 'org', 'net', 'int', 'edu', 'gov', 'mil', 'aero', 'asia', 'cat', 'coop', 'jobs', 'mobi', 'museum', 'post', 'tel', 'travel', 'xxx', 'arpa', 'test', 'ac', 'ad', 'ae', 'af', 'ag', 'ai', 'al', 'am', 'an', 'ao', 'aq', 'ar', 'as', 'at', 'au', 'aw', 'ax', 'az', 'ba', 'bb', 'bd', 'be', 'bf', 'bg', 'bh', 'bi', 'bj', 'bl', 'bm', 'bn', 'bo', 'bq', 'br', 'bs', 'bt', 'bv', 'bw', 'by', 'bz', 'ca', 'cc', 'cd', 'cf', 'cg', 'ch', 'ci', 'ck', 'cl', 'cm', 'cn', 'co', 'cr', 'cu', 'cv', 'cw', 'cx', 'cy', 'cz', 'de', 'dj', 'dk', 'dm', 'do', 'dz', 'ec', 'ee', 'eg', 'eh', 'er', 'es', 'et', 'eu', 'fi', 'fj', 'fk', 'fm', 'fo', 'fr', 'ga', 'gb', 'gd', 'ge', 'gf', 'gg', 'gh', 'gi', 'gl', 'gm', 'gn', 'gp', 'gq', 'gr', 'gs', 'gt', 'gu', 'gw', 'gy', 'hk', 'hm', 'hn', 'hr', 'ht', 'hu', 'id', 'ie', 'il', 'im', 'in', 'io', 'iq', 'ir', 'is', 'it', 'je', 'jm', 'jo', 'jp', 'ke', 'kg', 'kh', 'ki', 'km', 'kn', 'kp', 'kr', 'kw', 'ky', 'kz', 'la', 'lb', 'lc', 'li', 'lk', 'lr', 'ls', 'lt', 'lu', 'lv', 'ly', 'ma', 'mc', 'md', 'me', 'mf', 'mg', 'mh', 'mk', 'ml', 'mm', 'mn', 'mo', 'mp', 'mq', 'mr', 'ms', 'mt', 'mu', 'mv', 'mw', 'mx', 'my', 'mz', 'na', 'nc', 'ne', 'nf', 'ng', 'ni', 'nl', 'no', 'np', 'nr', 'nu', 'nz', 'om', 'pa', 'pe', 'pf', 'pg', 'ph', 'pk', 'pl', 'pm', 'pn', 'pr', 'ps', 'pt', 'pw', 'py', 'qa', 're', 'ro', 'rs', 'ru', 'rw', 'sa', 'sb', 'sc', 'sd', 'se', 'sg', 'sh', 'si', 'sj', 'sk', 'sl', 'sm', 'sn', 'so', 'sr', 'st', 'su', 'sv', 'sx', 'sy', 'sz', 'tc', 'td', 'tf', 'tg', 'th', 'tj', 'tk', 'tl', 'tm', 'tn', 'to', 'tp', 'tr', 'tt', 'tv', 'tw', 'tz', 'ua', 'ug', 'uk', 'um', 'us', 'uy', 'uz', 'va', 'vc', 've', 'vg', 'vi', 'vn', 'vu', 'wf', 'ws', 'ye', 'yt', 'za', 'zm', 'zw'];

var EmailMatcher = function (_Matcher) {
  _inheritsLoose(EmailMatcher, _Matcher);

  function EmailMatcher() {
    return _Matcher.apply(this, arguments) || this;
  }

  var _proto = EmailMatcher.prototype;

  _proto.replaceWith = function replaceWith(children, props) {
    return React.createElement(Email, props, children);
  };

  _proto.asTag = function asTag() {
    return 'a';
  };

  _proto.match = function match(string) {
    return this.doMatch(string, EMAIL_PATTERN, function (matches) {
      return {
        email: matches[0],
        emailParts: {
          host: matches[2],
          username: matches[1]
        }
      };
    });
  };

  return EmailMatcher;
}(interweave.Matcher);

function Hashtag(_ref) {
  var children = _ref.children,
      _ref$encodeHashtag = _ref.encodeHashtag,
      encodeHashtag = _ref$encodeHashtag === void 0 ? false : _ref$encodeHashtag,
      hashtag = _ref.hashtag,
      _ref$hashtagUrl = _ref.hashtagUrl,
      hashtagUrl = _ref$hashtagUrl === void 0 ? '{{hashtag}}' : _ref$hashtagUrl,
      _ref$preserveHash = _ref.preserveHash,
      preserveHash = _ref$preserveHash === void 0 ? false : _ref$preserveHash,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "encodeHashtag", "hashtag", "hashtagUrl", "preserveHash"]);

  var tag = hashtag;

  if (!preserveHash && tag.charAt(0) === '#') {
    tag = tag.slice(1);
  }

  if (encodeHashtag) {
    tag = encodeURIComponent(tag);
  }

  var url = hashtagUrl || '{{hashtag}}';

  if (typeof url === 'function') {
    url = url(tag);
  } else {
    url = url.replace('{{hashtag}}', tag);
  }

  return React.createElement(Link, _extends({}, props, {
    href: url
  }), children);
}

var HashtagMatcher = function (_Matcher) {
  _inheritsLoose(HashtagMatcher, _Matcher);

  function HashtagMatcher() {
    return _Matcher.apply(this, arguments) || this;
  }

  var _proto = HashtagMatcher.prototype;

  _proto.replaceWith = function replaceWith(children, props) {
    return React.createElement(Hashtag, props, children);
  };

  _proto.asTag = function asTag() {
    return 'a';
  };

  _proto.match = function match(string) {
    return this.doMatch(string, HASHTAG_PATTERN, function (matches) {
      return {
        hashtag: matches[0]
      };
    });
  };

  return HashtagMatcher;
}(interweave.Matcher);

function Url(_ref) {
  var children = _ref.children,
      url = _ref.url,
      urlParts = _ref.urlParts,
      props = _objectWithoutPropertiesLoose(_ref, ["children", "url", "urlParts"]);

  var href = url;

  if (!href.match(/^https?:\/\//)) {
    href = "http://" + href;
  }

  return React.createElement(Link, _extends({}, props, {
    href: href
  }), children);
}

var UrlMatcher = function (_Matcher) {
  _inheritsLoose(UrlMatcher, _Matcher);

  function UrlMatcher(name, options, factory) {
    return _Matcher.call(this, name, _extends({
      customTLDs: [],
      validateTLD: true
    }, options), factory) || this;
  }

  var _proto = UrlMatcher.prototype;

  _proto.replaceWith = function replaceWith(children, props) {
    return React.createElement(Url, props, children);
  };

  _proto.asTag = function asTag() {
    return 'a';
  };

  _proto.match = function match(string) {
    var response = this.doMatch(string, URL_PATTERN, this.handleMatches);

    if (response && response.match.match(EMAIL_DISTINCT_PATTERN)) {
      response.valid = false;
    }

    if (response && this.options.validateTLD) {
      var _ref = response.urlParts,
          host = _ref.host;
      var validList = TOP_LEVEL_TLDS.concat(this.options.customTLDs || []);
      var tld = host.slice(host.lastIndexOf('.') + 1).toLowerCase();

      if (!validList.includes(tld)) {
        return null;
      }
    }

    return response;
  };

  _proto.handleMatches = function handleMatches(matches) {
    return {
      url: matches[0],
      urlParts: {
        auth: matches[2] ? matches[2].slice(0, -1) : '',
        fragment: matches[7] || '',
        host: matches[3],
        path: matches[5] || '',
        port: matches[4] ? matches[4] : '',
        query: matches[6] || '',
        scheme: matches[1] ? matches[1].replace('://', '') : 'http'
      }
    };
  };

  return UrlMatcher;
}(interweave.Matcher);

var IpMatcher = function (_UrlMatcher) {
  _inheritsLoose(IpMatcher, _UrlMatcher);

  function IpMatcher(name, options, factory) {
    return _UrlMatcher.call(this, name, _extends({}, options, {
      validateTLD: false
    }), factory) || this;
  }

  var _proto = IpMatcher.prototype;

  _proto.match = function match(string) {
    return this.doMatch(string, IP_PATTERN, this.handleMatches);
  };

  return IpMatcher;
}(UrlMatcher);

exports.EMAIL_DISTINCT_PATTERN = EMAIL_DISTINCT_PATTERN;
exports.EMAIL_PATTERN = EMAIL_PATTERN;
exports.EMAIL_USERNAME = EMAIL_USERNAME;
exports.EMAIL_USERNAME_PART = EMAIL_USERNAME_PART;
exports.Email = Email;
exports.EmailMatcher = EmailMatcher;
exports.HASHTAG_PATTERN = HASHTAG_PATTERN;
exports.Hashtag = Hashtag;
exports.HashtagMatcher = HashtagMatcher;
exports.IP_PATTERN = IP_PATTERN;
exports.IP_V4 = IP_V4;
exports.IP_V4_PART = IP_V4_PART;
exports.IpMatcher = IpMatcher;
exports.Link = Link;
exports.TOP_LEVEL_TLDS = TOP_LEVEL_TLDS;
exports.URL_AUTH = URL_AUTH;
exports.URL_FRAGMENT = URL_FRAGMENT;
exports.URL_HOST = URL_HOST;
exports.URL_PATH = URL_PATH;
exports.URL_PATTERN = URL_PATTERN;
exports.URL_PORT = URL_PORT;
exports.URL_QUERY = URL_QUERY;
exports.URL_SCHEME = URL_SCHEME;
exports.Url = Url;
exports.UrlMatcher = UrlMatcher;
exports.VALID_ALNUM_CHARS = VALID_ALNUM_CHARS;
exports.VALID_PATH_CHARS = VALID_PATH_CHARS;
exports.combinePatterns = combinePatterns;
