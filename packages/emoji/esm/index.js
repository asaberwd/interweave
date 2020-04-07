import React, { useState, useEffect } from 'react';
import { TEXT, generateEmoticonPermutations, EMOTICON_OPTIONS, fromCodepointToUnicode, fromHexcodeToCodepoint, fetchFromCDN } from 'emojibase';
import { Matcher } from 'interweave';
import EMOJI_REGEX from 'emojibase-regex';
import EMOTICON_REGEX from 'emojibase-regex/emoticon';
import SHORTCODE_REGEX from 'emojibase-regex/shortcode';

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var instances = new Map();

var EmojiDataManager = function () {
  function EmojiDataManager(locale) {
    if (locale === void 0) {
      locale = 'en';
    }

    _defineProperty(this, "EMOJIS", {});

    _defineProperty(this, "EMOTICON_TO_HEXCODE", {});

    _defineProperty(this, "SHORTCODE_TO_HEXCODE", {});

    _defineProperty(this, "UNICODE_TO_HEXCODE", {});

    _defineProperty(this, "data", []);

    _defineProperty(this, "flatData", []);

    _defineProperty(this, "locale", 'en');

    this.locale = locale;
  }

  EmojiDataManager.getInstance = function getInstance(locale) {
    if (locale === void 0) {
      locale = 'en';
    }

    if (!instances.has(locale)) {
      instances.set(locale, new EmojiDataManager(locale));
    }

    return instances.get(locale);
  };

  var _proto = EmojiDataManager.prototype;

  _proto.getData = function getData() {
    return this.data;
  };

  _proto.getFlatData = function getFlatData() {
    return this.flatData;
  };

  _proto.packageEmoji = function packageEmoji(baseEmoji) {
    var _this = this;

    var emoticon = baseEmoji.emoticon,
        hexcode = baseEmoji.hexcode,
        shortcodes = baseEmoji.shortcodes;

    var emoji = _extends({}, baseEmoji, {
      canonical_shortcodes: [],
      primary_shortcode: '',
      skins: [],
      unicode: ''
    });

    if (!emoji.unicode) {
      emoji.unicode = emoji.text && emoji.type === TEXT ? emoji.text : emoji.emoji;
    }

    emoji.canonical_shortcodes = shortcodes.map(function (code) {
      return ":" + code + ":";
    });
    emoji.primary_shortcode = emoji.canonical_shortcodes[0];
    emoji.canonical_shortcodes.forEach(function (shortcode) {
      _this.SHORTCODE_TO_HEXCODE[shortcode] = hexcode;
    });

    if (emoticon) {
      generateEmoticonPermutations(emoticon, EMOTICON_OPTIONS[emoticon]).forEach(function (emo) {
        _this.EMOTICON_TO_HEXCODE[emo] = hexcode;
      });
    }

    this.UNICODE_TO_HEXCODE[fromCodepointToUnicode(fromHexcodeToCodepoint(hexcode))] = hexcode;

    if (emoji.emoji) {
      this.UNICODE_TO_HEXCODE[emoji.emoji] = hexcode;
    }

    if (emoji.text) {
      this.UNICODE_TO_HEXCODE[emoji.text] = hexcode;
    }

    this.EMOJIS[hexcode] = emoji;

    if (baseEmoji.skins) {
      emoji.skins = baseEmoji.skins.map(function (skinEmoji) {
        return _this.packageEmoji(skinEmoji);
      });
    }

    return emoji;
  };

  _proto.parseEmojiData = function parseEmojiData(data) {
    var _this2 = this;

    data.forEach(function (emoji) {
      var packagedEmoji = _this2.packageEmoji(emoji);

      _this2.data.push(packagedEmoji);

      _this2.flatData.push(packagedEmoji);

      if (packagedEmoji.skins) {
        packagedEmoji.skins.forEach(function (skin) {
          _this2.flatData.push(_this2.packageEmoji(skin));
        });
      }
    });
    return this.data;
  };

  return EmojiDataManager;
}();

function Emoji(_ref) {
  var _ref$emojiLargeSize = _ref.emojiLargeSize,
      emojiLargeSize = _ref$emojiLargeSize === void 0 ? '3em' : _ref$emojiLargeSize,
      _ref$emojiPath = _ref.emojiPath,
      emojiPath = _ref$emojiPath === void 0 ? '{{hexcode}}' : _ref$emojiPath,
      _ref$emojiSize = _ref.emojiSize,
      emojiSize = _ref$emojiSize === void 0 ? '1em' : _ref$emojiSize,
      emojiSource = _ref.emojiSource,
      emoticon = _ref.emoticon,
      _ref$enlargeEmoji = _ref.enlargeEmoji,
      enlargeEmoji = _ref$enlargeEmoji === void 0 ? false : _ref$enlargeEmoji,
      hexcode = _ref.hexcode,
      _ref$renderUnicode = _ref.renderUnicode,
      renderUnicode = _ref$renderUnicode === void 0 ? false : _ref$renderUnicode,
      shortcode = _ref.shortcode,
      unicode = _ref.unicode;
  var data = EmojiDataManager.getInstance(emojiSource.locale);

  if ("production" !== process.env.NODE_ENV) {
    if (!emoticon && !shortcode && !unicode && !hexcode) {
      throw new Error('Emoji component requires a `unicode` character, `emoticon`, `hexcode`, or a `shortcode`.');
    }
  }

  var hex = hexcode;

  if (!hex && shortcode) {
    hex = data.SHORTCODE_TO_HEXCODE[shortcode];
  }

  if (!hex && emoticon) {
    hex = data.EMOTICON_TO_HEXCODE[emoticon];
  }

  if (!hex && unicode) {
    hex = data.UNICODE_TO_HEXCODE[unicode];
  }

  if (!hex || !data.EMOJIS[hex]) {
    return React.createElement("span", null, unicode || emoticon || shortcode || hex);
  }

  var emoji = data.EMOJIS[hex];

  if (renderUnicode) {
    return React.createElement("span", null, emoji.unicode);
  }

  var styles = {
    display: 'inline-block',
    verticalAlign: 'middle'
  };

  if (enlargeEmoji && emojiLargeSize) {
    styles.width = emojiLargeSize;
    styles.height = emojiLargeSize;
  } else if (emojiSize) {
    styles.width = emojiSize;
    styles.height = emojiSize;
  }

  var path = emojiPath || '{{hexcode}}';

  if (typeof path === 'function') {
    path = path(emoji.hexcode, {
      enlarged: enlargeEmoji,
      largeSize: emojiLargeSize,
      size: enlargeEmoji ? emojiLargeSize : emojiSize,
      smallSize: emojiSize
    });
  } else {
    path = path.replace('{{hexcode}}', emoji.hexcode);
  }

  return React.createElement("img", {
    src: path,
    alt: emoji.unicode,
    title: emoji.annotation,
    style: styles,
    "aria-label": emoji.annotation,
    "data-emoticon": emoji.emoticon,
    "data-unicode": emoji.unicode,
    "data-hexcode": emoji.hexcode,
    "data-shortcodes": emoji.canonical_shortcodes.join(', ')
  });
}

var EMOTICON_BOUNDARY_REGEX = new RegExp("(^|\\\b|\\s)(" + EMOTICON_REGEX.source + ")(?=\\s|\\\b|$)");

var EmojiMatcher = function (_Matcher) {
  _inheritsLoose(EmojiMatcher, _Matcher);

  function EmojiMatcher(name, options, factory) {
    var _this;

    _this = _Matcher.call(this, name, _extends({
      convertEmoticon: false,
      convertShortcode: false,
      convertUnicode: false,
      enlargeThreshold: 1,
      renderUnicode: false
    }, options), factory) || this;

    _defineProperty(_assertThisInitialized(_this), "data", null);

    _defineProperty(_assertThisInitialized(_this), "greedy", true);

    return _this;
  }

  var _proto = EmojiMatcher.prototype;

  _proto.replaceWith = function replaceWith(children, props) {
    return React.createElement(Emoji, _extends({}, props, {
      renderUnicode: this.options.renderUnicode
    }));
  };

  _proto.asTag = function asTag() {
    return 'img';
  };

  _proto.match = function match(string) {
    var response = null;

    if (this.options.convertEmoticon) {
      response = this.matchEmoticon(string);

      if (response) {
        return response;
      }
    }

    if (this.options.convertShortcode) {
      response = this.matchShortcode(string);

      if (response) {
        return response;
      }
    }

    if (this.options.convertUnicode) {
      response = this.matchUnicode(string);

      if (response) {
        return response;
      }
    }

    return null;
  };

  _proto.matchEmoticon = function matchEmoticon(string) {
    var response = this.doMatch(string, EMOTICON_BOUNDARY_REGEX, function (matches) {
      return {
        emoticon: matches[0].trim()
      };
    }, true);

    if (response && response.emoticon && this.data && this.data.EMOTICON_TO_HEXCODE[response.emoticon]) {
      response.hexcode = this.data.EMOTICON_TO_HEXCODE[response.emoticon];
      response.match = String(response.emoticon);
      return response;
    }

    return null;
  };

  _proto.matchShortcode = function matchShortcode(string) {
    var response = this.doMatch(string, SHORTCODE_REGEX, function (matches) {
      return {
        shortcode: matches[0].toLowerCase()
      };
    }, true);

    if (response && response.shortcode && this.data && this.data.SHORTCODE_TO_HEXCODE[response.shortcode]) {
      response.hexcode = this.data.SHORTCODE_TO_HEXCODE[response.shortcode];
      return response;
    }

    return null;
  };

  _proto.matchUnicode = function matchUnicode(string) {
    var response = this.doMatch(string, EMOJI_REGEX, function (matches) {
      return {
        unicode: matches[0]
      };
    }, true);

    if (response && response.unicode && this.data && this.data.UNICODE_TO_HEXCODE[response.unicode]) {
      response.hexcode = this.data.UNICODE_TO_HEXCODE[response.unicode];
      return response;
    }

    return null;
  };

  _proto.onBeforeParse = function onBeforeParse(content, props) {
    if (props.emojiSource) {
      this.data = EmojiDataManager.getInstance(props.emojiSource.locale);
    } else if ("production" !== process.env.NODE_ENV) {
      throw new Error('Missing emoji source data. Have you loaded with the `useEmojiData` hook and passed the `emojiSource` prop?');
    }

    return content;
  };

  _proto.onAfterParse = function onAfterParse(content, props) {
    if (content.length === 0) {
      return content;
    }

    var _this$options$enlarge = this.options.enlargeThreshold,
        enlargeThreshold = _this$options$enlarge === void 0 ? 1 : _this$options$enlarge;
    var valid = false;
    var count = 0;

    for (var i = 0, item = null; i < content.length; i += 1) {
      item = content[i];

      if (typeof item === 'string') {
        if (!item.match(/^\s+$/)) {
          valid = false;
          break;
        }
      } else if (React.isValidElement(item)) {
        if (item && item.type === Emoji) {
          count += 1;
          valid = true;

          if (count > enlargeThreshold) {
            valid = false;
            break;
          }
        } else {
          valid = false;
          break;
        }
      } else {
        valid = false;
        break;
      }
    }

    if (!valid) {
      return content;
    }

    return content.map(function (item) {
      if (!item || typeof item === 'string') {
        return item;
      }

      var element = item;
      return React.cloneElement(element, _extends({}, element.props, {
        enlargeEmoji: true
      }));
    });
  };

  return EmojiMatcher;
}(Matcher);

var MAX_EMOJI_VERSION = 12.1;
var LATEST_DATASET_VERSION = '4.2.1';

var promises = new Map();

function loadEmojis(locale, version, compact) {
  var set = compact ? 'compact' : 'data';
  var key = locale + ":" + version + ":" + set;
  var stubRequest = process.env.NODE_ENV === 'test' && !process.env.INTERWEAVE_ALLOW_FETCH_EMOJI || typeof global.fetch === 'undefined';

  if (promises.has(key)) {
    return promises.get(key);
  }

  var request;

  if (stubRequest) {
    var testData;

    try {
      var requireFunc = typeof __webpack_require__ === 'function' ? __non_webpack_require__ : require;
      testData = requireFunc('emojibase-test-utils/test-data.json');
    } catch (_unused) {
      testData = [];
    }

    request = Promise.resolve(testData);
  } else {
    request = fetchFromCDN(locale + "/" + set + ".json", version);
  }

  promises.set(key, request.then(function (response) {
    var instance = EmojiDataManager.getInstance(locale);
    instance.parseEmojiData(response);
    return instance.getData();
  }));
  return promises.get(key);
}

function useEmojiData(_temp) {
  var _ref = _temp === void 0 ? {} : _temp,
      _ref$avoidFetch = _ref.avoidFetch,
      avoidFetch = _ref$avoidFetch === void 0 ? false : _ref$avoidFetch,
      _ref$compact = _ref.compact,
      compact = _ref$compact === void 0 ? false : _ref$compact,
      _ref$locale = _ref.locale,
      locale = _ref$locale === void 0 ? 'en' : _ref$locale,
      _ref$throwErrors = _ref.throwErrors,
      throwErrors = _ref$throwErrors === void 0 ? false : _ref$throwErrors,
      _ref$version = _ref.version,
      version = _ref$version === void 0 ? LATEST_DATASET_VERSION : _ref$version;

  var _useState = useState([]),
      emojis = _useState[0],
      setEmojis = _useState[1];

  var _useState2 = useState(),
      error = _useState2[0],
      setError = _useState2[1];

  useEffect(function () {
    var mounted = true;

    if (!avoidFetch) {
      loadEmojis(locale, version, compact).then(function (loadedEmojis) {
        if (mounted) {
          setEmojis(loadedEmojis);
        }

        return loadedEmojis;
      }).catch(setError);
    }

    return function () {
      mounted = false;
    };
  }, [avoidFetch, compact, locale, version]);

  if (error && throwErrors) {
    throw error;
  }

  return [emojis, {
    compact: compact,
    error: error,
    locale: locale,
    version: version
  }, EmojiDataManager.getInstance(locale)];
}

export { Emoji, EmojiDataManager, EmojiMatcher, LATEST_DATASET_VERSION, MAX_EMOJI_VERSION, useEmojiData };
