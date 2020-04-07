import React, { useContext, useState, useRef, useEffect } from 'react';
import debounce from 'lodash/debounce';
import { LATEST_DATASET_VERSION, Emoji as Emoji$1, useEmojiData, MAX_EMOJI_VERSION } from 'interweave-emoji';
import _pt from 'prop-types';
import { FixedSizeList } from 'react-window';
import chunk from 'lodash/chunk';
import camelCase from 'lodash/camelCase';
import { GROUP_KEY_SMILEYS_EMOTION, GROUP_KEY_PEOPLE_BODY, GROUP_KEY_COMPONENT, GROUP_KEY_ANIMALS_NATURE, GROUP_KEY_FOOD_DRINK, GROUP_KEY_TRAVEL_PLACES, GROUP_KEY_ACTIVITIES, GROUP_KEY_OBJECTS, GROUP_KEY_SYMBOLS, GROUP_KEY_FLAGS, SKIN_KEY_LIGHT, SKIN_KEY_MEDIUM_LIGHT, SKIN_KEY_MEDIUM, SKIN_KEY_MEDIUM_DARK, SKIN_KEY_DARK } from 'emojibase';
export { GROUP_KEY_ACTIVITIES, GROUP_KEY_ANIMALS_NATURE, GROUP_KEY_COMPONENT, GROUP_KEY_FLAGS, GROUP_KEY_FOOD_DRINK, GROUP_KEY_OBJECTS, GROUP_KEY_PEOPLE_BODY, GROUP_KEY_SMILEYS_EMOTION, GROUP_KEY_SYMBOLS, GROUP_KEY_TRAVEL_PLACES, SKIN_KEY_DARK, SKIN_KEY_LIGHT, SKIN_KEY_MEDIUM, SKIN_KEY_MEDIUM_DARK, SKIN_KEY_MEDIUM_LIGHT } from 'emojibase';
import upperFirst from 'lodash/upperFirst';

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

function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}

var _GROUP_ICONS, _SKIN_COLORS;
var GROUP_KEY_COMMONLY_USED = 'commonly-used';
var GROUP_KEY_SEARCH_RESULTS = 'search-results';
var GROUP_KEY_VARIATIONS = 'variations';
var GROUP_KEY_NONE = 'none';
var GROUPS = [GROUP_KEY_SMILEYS_EMOTION, GROUP_KEY_PEOPLE_BODY, GROUP_KEY_COMPONENT, GROUP_KEY_ANIMALS_NATURE, GROUP_KEY_FOOD_DRINK, GROUP_KEY_TRAVEL_PLACES, GROUP_KEY_ACTIVITIES, GROUP_KEY_OBJECTS, GROUP_KEY_SYMBOLS, GROUP_KEY_FLAGS];
var GROUP_ICONS = (_GROUP_ICONS = {}, _GROUP_ICONS[GROUP_KEY_COMMONLY_USED] = '🕑', _GROUP_ICONS[GROUP_KEY_SMILEYS_EMOTION] = '😃', _GROUP_ICONS[GROUP_KEY_PEOPLE_BODY] = '👍', _GROUP_ICONS[GROUP_KEY_ANIMALS_NATURE] = '🌿', _GROUP_ICONS[GROUP_KEY_FOOD_DRINK] = '🍎', _GROUP_ICONS[GROUP_KEY_TRAVEL_PLACES] = '🗺️', _GROUP_ICONS[GROUP_KEY_ACTIVITIES] = '⚽️', _GROUP_ICONS[GROUP_KEY_OBJECTS] = '📘', _GROUP_ICONS[GROUP_KEY_SYMBOLS] = '⛔️', _GROUP_ICONS[GROUP_KEY_FLAGS] = '🏴', _GROUP_ICONS);
var SKIN_KEY_NONE = 'none';
var SKIN_TONES = [SKIN_KEY_NONE, SKIN_KEY_LIGHT, SKIN_KEY_MEDIUM_LIGHT, SKIN_KEY_MEDIUM, SKIN_KEY_MEDIUM_DARK, SKIN_KEY_DARK];
var SKIN_COLORS = (_SKIN_COLORS = {}, _SKIN_COLORS[SKIN_KEY_NONE] = '#FFCC22', _SKIN_COLORS[SKIN_KEY_LIGHT] = '#FADCBC', _SKIN_COLORS[SKIN_KEY_MEDIUM_LIGHT] = '#E0BB95', _SKIN_COLORS[SKIN_KEY_MEDIUM] = '#BF8F68', _SKIN_COLORS[SKIN_KEY_MEDIUM_DARK] = '#9B643D', _SKIN_COLORS[SKIN_KEY_DARK] = '#5A463A', _SKIN_COLORS);
var SCROLL_BUFFER = 150;
var SCROLL_DEBOUNCE = 100;
var SEARCH_THROTTLE = 300;
var KEY_COMMONLY_USED = 'interweave/emoji/commonlyUsed';
var KEY_SKIN_TONE = 'interweave/emoji/skinTone';
var COMMON_MODE_RECENT = 'recently-used';
var COMMON_MODE_FREQUENT = 'frequently-used';
var CONTEXT_CLASSNAMES = {
  picker: 'interweave-picker__picker',
  emoji: 'interweave-picker__emoji',
  emojiActive: 'interweave-picker__emoji--active',
  emojis: 'interweave-picker__emojis',
  emojisList: 'interweave-picker__emojis-list',
  emojisRow: 'interweave-picker__emojis-row',
  emojisHeader: 'interweave-picker__emojis-header',
  emojisHeaderSticky: 'interweave-picker__emojis-header--sticky',
  emojisBody: 'interweave-picker__emojis-body',
  group: 'interweave-picker__group',
  groupActive: 'interweave-picker__group--active',
  groups: 'interweave-picker__groups',
  groupsList: 'interweave-picker__groups-list',
  skinTone: 'interweave-picker__skin-tone',
  skinToneActive: 'interweave-picker__skin-tone--active',
  skinTones: 'interweave-picker__skin-tones',
  skinTonesList: 'interweave-picker__skin-tones-list',
  noPreview: 'interweave-picker__no-preview',
  noResults: 'interweave-picker__no-results',
  preview: 'interweave-picker__preview',
  previewEmoji: 'interweave-picker__preview-emoji',
  previewContent: 'interweave-picker__preview-content',
  previewTitle: 'interweave-picker__preview-title',
  previewSubtitle: 'interweave-picker__preview-subtitle',
  previewShiftMore: 'interweave-picker__preview-more',
  search: 'interweave-picker__search',
  searchInput: 'interweave-picker__search-input',
  clear: 'interweave-picker__clear'
};
var CONTEXT_MESSAGES = {
  frequentlyUsed: 'Frequently Used',
  recentlyUsed: 'Recently Used',
  smileysEmotion: 'Smileys & Emotion',
  peopleBody: 'People & Bodies',
  animalsNature: 'Animals & Nature',
  foodDrink: 'Food & Drink',
  travelPlaces: 'Travel & Places',
  activities: 'Activities',
  objects: 'Objects',
  symbols: 'Symbols',
  flags: 'Flags',
  searchResults: 'Search Results',
  variations: 'Variations',
  none: 'All Emojis',
  skinNone: 'No skin tone',
  skinLight: 'Light skin tone',
  skinMediumLight: 'Medium-light skin tone',
  skinMedium: 'Medium skin tone',
  skinMediumDark: 'Medium-dark skin tone',
  skinDark: 'Dark skin tone',
  search: 'Search',
  searchA11y: 'Search for emojis by keyword',
  noPreview: '',
  noResults: 'No results',
  clearUsed: 'Clear used'
};

var Context = React.createContext({
  classNames: CONTEXT_CLASSNAMES,
  emojiLargeSize: 0,
  emojiPadding: 0,
  emojiPath: '{{hexcode}}',
  emojiSize: 0,
  emojiSource: {
    compact: false,
    locale: 'en',
    version: LATEST_DATASET_VERSION
  },
  messages: CONTEXT_MESSAGES
});

function EmojiListHeader(_ref) {
  var clearIcon = _ref.clearIcon,
      commonMode = _ref.commonMode,
      group = _ref.group,
      skinTonePalette = _ref.skinTonePalette,
      sticky = _ref.sticky,
      onClear = _ref.onClear;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      messages = _useContext.messages;

  var showClear = clearIcon && (group === GROUP_KEY_COMMONLY_USED || group === GROUP_KEY_VARIATIONS);
  var showPalette = skinTonePalette && (group === GROUP_KEY_PEOPLE_BODY || group === GROUP_KEY_SEARCH_RESULTS || group === GROUP_KEY_NONE);
  var className = [classNames.emojisHeader];

  if (sticky) {
    className.push(classNames.emojisHeaderSticky);
  }

  var handleClear = function handleClear(event) {
    event.preventDefault();
    onClear();
  };

  return React.createElement("header", {
    className: className.join(' ')
  }, React.createElement("span", null, group === GROUP_KEY_COMMONLY_USED ? messages[camelCase(commonMode)] : messages[camelCase(group)]), showPalette && skinTonePalette, showClear && React.createElement("button", {
    type: "button",
    title: messages.clearUsed,
    className: classNames.clear,
    onClick: handleClear
  }, clearIcon));
}
EmojiListHeader.propTypes = {
  clearIcon: _pt.node,
  onClear: _pt.func.isRequired,
  skinTonePalette: _pt.node,
  sticky: _pt.bool
};

function Emoji(_ref) {
  var active = _ref.active,
      emoji = _ref.emoji,
      onEnter = _ref.onEnter,
      onLeave = _ref.onLeave,
      onSelect = _ref.onSelect;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      emojiPadding = _useContext.emojiPadding,
      emojiPath = _useContext.emojiPath,
      emojiSize = _useContext.emojiSize,
      emojiSource = _useContext.emojiSource;

  var dimension = emojiPadding + emojiPadding + emojiSize;
  var className = [classNames.emoji];

  if (active) {
    className.push(classNames.emojiActive);
  }

  var handleClick = function handleClick(event) {
    event.stopPropagation();
    onSelect(emoji, event);
  };

  var handleEnter = function handleEnter(event) {
    event.stopPropagation();
    onEnter(emoji, event);
  };

  var handleLeave = function handleLeave(event) {
    event.stopPropagation();
    onLeave(emoji, event);
  };

  return React.createElement("button", {
    key: emoji.hexcode,
    className: className.join(' '),
    style: {
      height: dimension,
      padding: emojiPadding,
      width: dimension
    },
    title: emoji.annotation,
    type: "button",
    onClick: handleClick,
    onMouseEnter: handleEnter,
    onMouseLeave: handleLeave
  }, React.createElement(Emoji$1, {
    emojiPath: emojiPath,
    emojiSize: emojiSize,
    emojiSource: emojiSource,
    hexcode: emoji.hexcode
  }));
}
Emoji.propTypes = {
  active: _pt.bool.isRequired,
  onEnter: _pt.func.isRequired,
  onLeave: _pt.func.isRequired,
  onSelect: _pt.func.isRequired
};

function EmojiListRow(_ref) {
  var data = _ref.data,
      index = _ref.index,
      style = _ref.style,
      activeEmoji = _ref.activeEmoji,
      clearIcon = _ref.clearIcon,
      commonMode = _ref.commonMode,
      skinTonePalette = _ref.skinTonePalette,
      onClear = _ref.onClear,
      onEnterEmoji = _ref.onEnterEmoji,
      onLeaveEmoji = _ref.onLeaveEmoji,
      onSelectEmoji = _ref.onSelectEmoji;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames;

  var row = data[index];
  return React.createElement("div", {
    style: style,
    className: classNames.emojisRow
  }, Array.isArray(row) ? React.createElement("div", {
    className: classNames.emojisBody
  }, row.map(function (emoji) {
    return React.createElement(Emoji, {
      key: emoji.hexcode,
      active: activeEmoji ? activeEmoji.hexcode === emoji.hexcode : false,
      emoji: emoji,
      onEnter: onEnterEmoji,
      onLeave: onLeaveEmoji,
      onSelect: onSelectEmoji
    });
  })) : React.createElement(EmojiListHeader, {
    clearIcon: clearIcon,
    commonMode: commonMode,
    group: row,
    onClear: onClear,
    skinTonePalette: skinTonePalette
  }));
}
EmojiListRow.propTypes = {
  clearIcon: _pt.node,
  onClear: _pt.func.isRequired,
  onEnterEmoji: _pt.func.isRequired,
  onLeaveEmoji: _pt.func.isRequired,
  onSelectEmoji: _pt.func.isRequired,
  skinTonePalette: _pt.node
};

function EmojiList(_ref) {
  var activeGroup = _ref.activeGroup,
      columnCount = _ref.columnCount,
      _ref$columnPadding = _ref.columnPadding,
      columnPadding = _ref$columnPadding === void 0 ? 0 : _ref$columnPadding,
      groupedEmojis = _ref.groupedEmojis,
      hideGroupHeaders = _ref.hideGroupHeaders,
      noResults = _ref.noResults,
      rowCount = _ref.rowCount,
      _ref$rowPadding = _ref.rowPadding,
      rowPadding = _ref$rowPadding === void 0 ? 0 : _ref$rowPadding,
      scrollToGroup = _ref.scrollToGroup,
      stickyGroupHeader = _ref.stickyGroupHeader,
      onScroll = _ref.onScroll,
      onScrollGroup = _ref.onScrollGroup,
      rowProps = _objectWithoutPropertiesLoose(_ref, ["activeGroup", "columnCount", "columnPadding", "groupedEmojis", "hideGroupHeaders", "noResults", "rowCount", "rowPadding", "scrollToGroup", "stickyGroupHeader", "onScroll", "onScrollGroup"]);

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      emojiPadding = _useContext.emojiPadding,
      emojiSize = _useContext.emojiSize,
      messages = _useContext.messages;

  var _useState = useState([]),
      rows = _useState[0],
      setRows = _useState[1];

  var _useState2 = useState({}),
      indices = _useState2[0],
      setIndices = _useState2[1];

  var ref = useRef(null);
  var size = emojiSize + emojiPadding * 2;
  var rowHeight = size + rowPadding * 2;
  var columnWidth = size + columnPadding * 2;
  useEffect(function () {
    var virtualRows = [];
    var nextIndices = {
      '': -1
    };
    Object.keys(groupedEmojis).forEach(function (group) {
      nextIndices[group] = virtualRows.length;

      if (group === GROUP_KEY_COMPONENT) {
        return;
      }

      if (!hideGroupHeaders) {
        virtualRows.push(group);
      }

      virtualRows.push.apply(virtualRows, chunk(groupedEmojis[group].emojis, columnCount));
    });
    setRows(virtualRows);
    setIndices(nextIndices);
  }, [columnCount, groupedEmojis, hideGroupHeaders]);
  useEffect(function () {
    if (ref.current && scrollToGroup && indices[scrollToGroup]) {
      ref.current.scrollToItem(indices[scrollToGroup], 'start');
    }
  }, [scrollToGroup, indices]);

  if (rows.length === 0) {
    return React.createElement("div", {
      className: classNames.noResults
    }, noResults || messages.noResults);
  }

  var handleRendered = function handleRendered(_ref2) {
    var visibleStartIndex = _ref2.visibleStartIndex;
    var lastGroup = '';
    Object.keys(indices).some(function (group) {
      var index = indices[group];

      if (index === 0 && visibleStartIndex === 0) {
        lastGroup = group;
        return true;
      }

      if (stickyGroupHeader && index >= visibleStartIndex + 1) {
        return true;
      } else if (!stickyGroupHeader && index >= visibleStartIndex + rowCount / 2) {
        return true;
      }

      lastGroup = group;
      return false;
    });

    if (lastGroup && lastGroup !== activeGroup) {
      onScrollGroup(lastGroup);
    }
  };

  return React.createElement("div", {
    className: classNames.emojis
  }, React.createElement(FixedSizeList, {
    ref: ref,
    className: classNames.emojisList,
    height: rowHeight * rowCount,
    itemCount: rows.length,
    itemData: rows,
    itemSize: rowHeight,
    overscanCount: rowCount / 2,
    width: columnWidth * columnCount,
    onItemsRendered: handleRendered,
    onScroll: onScroll
  }, function (props) {
    return React.createElement(EmojiListRow, _extends({}, rowProps, props));
  }), stickyGroupHeader && activeGroup !== GROUP_KEY_NONE && React.createElement(EmojiListHeader, _extends({}, rowProps, {
    sticky: true,
    group: activeGroup
  })));
}
EmojiList.propTypes = {
  columnCount: _pt.number.isRequired,
  columnPadding: _pt.number,
  hideGroupHeaders: _pt.bool.isRequired,
  noResults: _pt.node,
  onScroll: _pt.func.isRequired,
  onScrollGroup: _pt.func.isRequired,
  rowCount: _pt.number.isRequired,
  rowPadding: _pt.number,
  stickyGroupHeader: _pt.bool
};

function SkinTone(_ref) {
  var active = _ref.active,
      children = _ref.children,
      skinTone = _ref.skinTone,
      onSelect = _ref.onSelect;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      messages = _useContext.messages;

  var className = [classNames.skinTone];
  var color = SKIN_COLORS[skinTone];
  var key = camelCase(skinTone);

  if (active) {
    className.push(classNames.skinToneActive);
  }

  var handleClick = function handleClick(event) {
    event.stopPropagation();
    onSelect(skinTone, event);
  };

  return React.createElement("button", {
    className: className.join(' '),
    "data-skin-color": color,
    "data-skin-tone": skinTone,
    title: messages["skin" + upperFirst(key)],
    type: "button",
    onClick: handleClick
  }, children || ' ');
}
SkinTone.propTypes = {
  active: _pt.bool.isRequired,
  children: _pt.node,
  onSelect: _pt.func.isRequired
};

function SkinTonePalette(_ref) {
  var activeSkinTone = _ref.activeSkinTone,
      icons = _ref.icons,
      onSelect = _ref.onSelect;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames;

  return React.createElement("nav", {
    className: classNames.skinTones
  }, React.createElement("ul", {
    className: classNames.skinTonesList
  }, SKIN_TONES.map(function (skinTone) {
    return React.createElement("li", {
      key: skinTone
    }, React.createElement(SkinTone, {
      active: activeSkinTone === skinTone,
      skinTone: skinTone,
      onSelect: onSelect
    }, icons[skinTone] || icons[camelCase(skinTone)] || null));
  })));
}
SkinTonePalette.propTypes = {
  icons: _pt.objectOf(_pt.node).isRequired,
  onSelect: _pt.func.isRequired
};

function Group(_ref) {
  var active = _ref.active,
      children = _ref.children,
      commonMode = _ref.commonMode,
      group = _ref.group,
      onSelect = _ref.onSelect;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      messages = _useContext.messages;

  var key = camelCase(group === GROUP_KEY_COMMONLY_USED ? commonMode : group);
  var className = [classNames.group];

  if (active) {
    className.push(classNames.groupActive);
  }

  var handleClick = function handleClick(event) {
    event.stopPropagation();
    onSelect(group, event);
  };

  return React.createElement("button", {
    className: className.join(' '),
    title: messages[key],
    type: "button",
    onClick: handleClick
  }, children);
}
Group.propTypes = {
  active: _pt.bool.isRequired,
  children: _pt.node.isRequired,
  onSelect: _pt.func.isRequired
};

function GroupTabs(_ref) {
  var activeGroup = _ref.activeGroup,
      commonEmojis = _ref.commonEmojis,
      commonMode = _ref.commonMode,
      icons = _ref.icons,
      onSelect = _ref.onSelect;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames;

  var groups = GROUPS.filter(function (group) {
    return group !== GROUP_KEY_COMPONENT;
  });

  if (commonEmojis.length > 0) {
    groups.unshift(GROUP_KEY_COMMONLY_USED);
  }

  return React.createElement("nav", {
    className: classNames.groups
  }, React.createElement("ul", {
    className: classNames.groupsList
  }, groups.map(function (group) {
    return React.createElement("li", {
      key: group
    }, React.createElement(Group, {
      active: group === activeGroup,
      commonMode: commonMode,
      group: group,
      onSelect: onSelect
    }, icons[group] || icons[camelCase(group)] || GROUP_ICONS[group]));
  })));
}
GroupTabs.propTypes = {
  commonEmojis: _pt.array.isRequired,
  icons: _pt.objectOf(_pt.node).isRequired,
  onSelect: _pt.func.isRequired
};

var TITLE_REGEX = /(^|:|\.)\s?[a-z]/g;

function formatTitle(title) {
  return title.replace(TITLE_REGEX, function (token) {
    return token.toUpperCase();
  });
}

function PreviewBar(_ref) {
  var emoji = _ref.emoji,
      hideEmoticon = _ref.hideEmoticon,
      hideShortcodes = _ref.hideShortcodes,
      noPreview = _ref.noPreview;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      emojiLargeSize = _useContext.emojiLargeSize,
      emojiPath = _useContext.emojiPath,
      emojiSource = _useContext.emojiSource,
      messages = _useContext.messages;

  if (!emoji) {
    var preview = noPreview || messages.noPreview;
    return React.createElement("section", {
      className: classNames.preview
    }, preview && React.createElement("div", {
      className: classNames.noPreview
    }, preview));
  }

  var title = emoji.annotation || emoji.name;
  var subtitle = [];

  if (!hideEmoticon && emoji.emoticon) {
    subtitle.push(emoji.emoticon);
  }

  if (!hideShortcodes && emoji.canonical_shortcodes) {
    subtitle.push.apply(subtitle, emoji.canonical_shortcodes);
  }

  return React.createElement("section", {
    className: classNames.preview
  }, React.createElement("div", {
    className: classNames.previewEmoji
  }, React.createElement(Emoji$1, {
    emojiLargeSize: emojiLargeSize,
    emojiPath: emojiPath,
    emojiSource: emojiSource,
    enlargeEmoji: true,
    hexcode: emoji.hexcode
  })), React.createElement("div", {
    className: classNames.previewContent
  }, title && React.createElement("div", {
    className: classNames.previewTitle
  }, formatTitle(title), emoji.skins && emoji.skins.length > 0 && React.createElement("span", {
    className: classNames.previewShiftMore
  }, "(+", emoji.skins.length, ")")), subtitle.length > 0 && React.createElement("div", {
    className: classNames.previewSubtitle
  }, subtitle.join(' '))));
}
PreviewBar.propTypes = {
  hideEmoticon: _pt.bool.isRequired,
  hideShortcodes: _pt.bool.isRequired,
  noPreview: _pt.node
};

function SearchBar(_ref) {
  var autoFocus = _ref.autoFocus,
      searchQuery = _ref.searchQuery,
      onChange = _ref.onChange,
      onKeyUp = _ref.onKeyUp;

  var _useContext = useContext(Context),
      classNames = _useContext.classNames,
      messages = _useContext.messages;

  var ref = useRef(null);
  useEffect(function () {
    if (autoFocus && ref.current) {
      ref.current.focus();
    }
  });

  var handleChange = function handleChange(event) {
    if (ref.current) {
      onChange(event.target.value.trim(), event);
    }
  };

  return React.createElement("div", {
    className: classNames.search
  }, React.createElement("input", {
    ref: ref,
    "aria-label": messages.searchA11y,
    className: classNames.searchInput,
    placeholder: messages.search,
    type: "search",
    value: searchQuery,
    onChange: handleChange,
    onKeyUp: onKeyUp
  }));
}
SearchBar.propTypes = {
  autoFocus: _pt.bool.isRequired,
  onChange: _pt.func.isRequired,
  onKeyUp: _pt.func.isRequired,
  searchQuery: _pt.string.isRequired
};

var SKIN_MODIFIER_PATTERN = /1F3FB|1F3FC|1F3FD|1F3FE|1F3FF/g;
var InternalPicker = function (_React$PureComponent) {
  _inheritsLoose(InternalPicker, _React$PureComponent);

  function InternalPicker(props) {
    var _this;

    _this = _React$PureComponent.call(this, props) || this;

    _defineProperty(_assertThisInitialized(_this), "allowList", void 0);

    _defineProperty(_assertThisInitialized(_this), "blockList", void 0);

    _defineProperty(_assertThisInitialized(_this), "handleClear", function () {
      if (_this.state.activeGroup === GROUP_KEY_VARIATIONS) {
        _this.setUpdatedState({
          activeGroup: _this.state.searchQuery ? GROUP_KEY_SEARCH_RESULTS : GROUP_KEY_SMILEYS_EMOTION
        }, true);
      } else {
        _this.setUpdatedState({
          commonEmojis: []
        });

        localStorage.removeItem(KEY_COMMONLY_USED);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleEnterEmoji", function (emoji, event) {
      _this.setUpdatedState({
        activeEmoji: emoji
      });

      _this.props.onHoverEmoji(emoji, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleKeyUp", function (event) {
      var _this$props$columnCou = _this.props.columnCount,
          columnCount = _this$props$columnCou === void 0 ? 10 : _this$props$columnCou;
      var _this$state = _this.state,
          activeEmoji = _this$state.activeEmoji,
          activeEmojiIndex = _this$state.activeEmojiIndex,
          emojis = _this$state.emojis,
          searchQuery = _this$state.searchQuery;

      if (!searchQuery) {
        return;
      }

      if (event.key === 'Escape') {
        event.preventDefault();

        _this.handleSearch('', event);
      } else if (event.key === 'Enter') {
        event.preventDefault();

        if (activeEmoji) {
          _this.handleSelectEmoji(activeEmoji, event);
        }
      } else {
        event.preventDefault();
        var nextIndex = -1;

        switch (event.key) {
          case 'ArrowLeft':
            nextIndex = activeEmojiIndex - 1;
            break;

          case 'ArrowRight':
            nextIndex = activeEmojiIndex + 1;
            break;

          case 'ArrowUp':
            nextIndex = activeEmojiIndex - columnCount;
            break;

          case 'ArrowDown':
            nextIndex = activeEmojiIndex + columnCount;
            break;

          default:
            return;
        }

        if (nextIndex >= 0 && nextIndex < emojis.length) {
          _this.setUpdatedState({
            activeEmojiIndex: nextIndex
          });

          _this.handleEnterEmoji(emojis[nextIndex], event);
        }
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleLeaveEmoji", function () {
      _this.setUpdatedState({
        activeEmoji: null
      });
    });

    _defineProperty(_assertThisInitialized(_this), "handleScrollGroup", function (group) {
      _this.setUpdatedState({
        activeGroup: group,
        scrollToGroup: ''
      });

      _this.props.onScrollGroup(group);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearch", function (query, event) {
      _this.setState({
        searchQuery: query
      });

      _this.handleSearchDebounced(query);

      _this.props.onSearch(query, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSearchDebounced", debounce(function (query) {
      _this.setUpdatedState({
        searchQuery: query
      });
    }, SEARCH_THROTTLE));

    _defineProperty(_assertThisInitialized(_this), "handleSelectEmoji", function (emoji, event) {
      _this.addCommonEmoji(emoji);

      if (event.shiftKey && emoji.skins && emoji.skins.length > 0) {
        var _groupedEmojis;

        _this.setState({
          activeEmoji: emoji,
          activeEmojiIndex: 0,
          activeGroup: GROUP_KEY_VARIATIONS,
          emojis: emoji.skins,
          groupedEmojis: (_groupedEmojis = {}, _groupedEmojis[GROUP_KEY_VARIATIONS] = {
            emojis: emoji.skins,
            group: GROUP_KEY_VARIATIONS
          }, _groupedEmojis),
          scrollToGroup: GROUP_KEY_VARIATIONS
        });
      } else {
        _this.props.onSelectEmoji(emoji, event);
      }
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectGroup", function (group, event) {
      _this.setUpdatedState({
        activeGroup: group,
        scrollToGroup: group
      });

      _this.props.onSelectGroup(group, event);
    });

    _defineProperty(_assertThisInitialized(_this), "handleSelectSkinTone", function (skinTone, event) {
      _this.setUpdatedState({
        activeSkinTone: skinTone
      });

      try {
        localStorage.setItem(KEY_SKIN_TONE, skinTone);
      } catch (error) {}

      _this.props.onSelectSkinTone(skinTone, event);
    });

    var _ref = props,
        blockList = _ref.blockList,
        classNames = _ref.classNames,
        defaultSkinTone = _ref.defaultSkinTone,
        messages = _ref.messages,
        allowList = _ref.allowList;
    _this.allowList = _this.generateAllowBlockMap(allowList);
    _this.blockList = _this.generateAllowBlockMap(blockList);
    var _searchQuery = '';

    var commonEmojis = _this.generateCommonEmojis(_this.getCommonEmojisFromStorage());

    var activeGroup = _this.getActiveGroup(commonEmojis.length > 0);

    var activeSkinTone = _this.getSkinToneFromStorage() || defaultSkinTone;

    var _emojis = _this.generateEmojis(activeSkinTone, _searchQuery);

    var groupedEmojis = _this.groupEmojis(_emojis, commonEmojis, _searchQuery);

    _this.state = {
      activeEmoji: null,
      activeEmojiIndex: -1,
      activeGroup: activeGroup,
      activeSkinTone: activeSkinTone,
      commonEmojis: commonEmojis,
      context: {
        classNames: _extends({}, CONTEXT_CLASSNAMES, {}, classNames),
        emojiLargeSize: props.emojiLargeSize,
        emojiPadding: props.emojiPadding,
        emojiPath: props.emojiPath,
        emojiSize: props.emojiSize,
        emojiSource: props.emojiSource,
        messages: _extends({}, CONTEXT_MESSAGES, {}, messages)
      },
      emojis: _emojis,
      groupedEmojis: groupedEmojis,
      scrollToGroup: activeGroup,
      searchQuery: _searchQuery
    };
    return _this;
  }

  var _proto = InternalPicker.prototype;

  _proto.addCommonEmoji = function addCommonEmoji(emoji) {
    var _this$props = this.props,
        commonMode = _this$props.commonMode,
        disableCommonlyUsed = _this$props.disableCommonlyUsed,
        maxCommonlyUsed = _this$props.maxCommonlyUsed;
    var hexcode = emoji.hexcode;

    if (disableCommonlyUsed) {
      return;
    }

    var commonEmojis = this.getCommonEmojisFromStorage();
    var currentIndex = commonEmojis.findIndex(function (common) {
      return common.hexcode === hexcode;
    });

    if (currentIndex === -1) {
      commonEmojis.unshift({
        count: 1,
        hexcode: hexcode
      });
    }

    if (commonMode === COMMON_MODE_RECENT) {
      if (currentIndex >= 1) {
        var _commonEmojis$splice = commonEmojis.splice(currentIndex, 1),
            common = _commonEmojis$splice[0];

        commonEmojis.unshift({
          count: common.count + 1,
          hexcode: hexcode
        });
      }
    } else if (commonMode === COMMON_MODE_FREQUENT) {
      if (currentIndex >= 0) {
        commonEmojis[currentIndex].count += 1;
      }

      commonEmojis.sort(function (a, b) {
        return b.count - a.count;
      });
    }

    try {
      localStorage.setItem(KEY_COMMONLY_USED, JSON.stringify(commonEmojis.slice(0, maxCommonlyUsed)));
    } catch (error) {}

    this.setUpdatedState({
      commonEmojis: this.generateCommonEmojis(commonEmojis)
    });
  };

  _proto.filterOrSearch = function filterOrSearch(emoji, searchQuery) {
    var _ref2 = this.props,
        blockList = _ref2.blockList,
        maxEmojiVersion = _ref2.maxEmojiVersion,
        allowList = _ref2.allowList;

    if (blockList.length > 0 && this.blockList[emoji.hexcode] || allowList.length > 0 && !this.allowList[emoji.hexcode]) {
      return false;
    }

    if (emoji.version && emoji.version > maxEmojiVersion) {
      return false;
    }

    if (!searchQuery) {
      return true;
    }

    var lookups = [];

    if (emoji.canonical_shortcodes) {
      lookups.push.apply(lookups, emoji.canonical_shortcodes);
    }

    if (emoji.tags) {
      lookups.push.apply(lookups, emoji.tags);
    }

    if (emoji.annotation) {
      lookups.push(emoji.annotation);
    }

    if (emoji.emoticon) {
      lookups.push(emoji.emoticon);
    }

    var haystack = lookups.join(' ').toLowerCase();
    return searchQuery.toLowerCase().split(' ').some(function (needle) {
      return haystack.includes(needle);
    });
  };

  _proto.generateEmojis = function generateEmojis(skinTone, searchQuery) {
    var _this2 = this;

    return this.props.emojis.filter(function (emoji) {
      return _this2.filterOrSearch(emoji, searchQuery);
    }).map(function (emoji) {
      return _this2.getSkinnedEmoji(emoji, skinTone);
    });
  };

  _proto.generateAllowBlockMap = function generateAllowBlockMap(list) {
    var map = {};
    list.forEach(function (hexcode) {
      if ("production" !== process.env.NODE_ENV) {
        if (hexcode.match(SKIN_MODIFIER_PATTERN)) {
          console.warn("Hexcode with a skin modifier has been detected: " + hexcode, 'Emojis without skin modifiers are required for allow/block lists.');
        }
      }

      map[hexcode] = true;
    });
    return map;
  };

  _proto.generateCommonEmojis = function generateCommonEmojis(commonEmojis) {
    if (this.props.disableCommonlyUsed) {
      return [];
    }

    var data = this.props.emojiData;
    return commonEmojis.map(function (emoji) {
      return data.EMOJIS[emoji.hexcode];
    }).filter(Boolean);
  };

  _proto.getActiveGroup = function getActiveGroup(hasCommon) {
    var _this$props2 = this.props,
        defaultGroup = _this$props2.defaultGroup,
        disableGroups = _this$props2.disableGroups;
    var group = defaultGroup;

    if (group === GROUP_KEY_COMMONLY_USED) {
      if (hasCommon) {
        return group;
      }

      group = GROUP_KEY_SMILEYS_EMOTION;
    }

    return disableGroups ? GROUP_KEY_NONE : group;
  };

  _proto.getCommonEmojisFromStorage = function getCommonEmojisFromStorage() {
    if (this.props.disableCommonlyUsed) {
      return [];
    }

    var common = localStorage.getItem(KEY_COMMONLY_USED);
    return common ? JSON.parse(common) : [];
  };

  _proto.getSkinnedEmoji = function getSkinnedEmoji(emoji, skinTone) {
    if (skinTone === SKIN_KEY_NONE || !emoji.skins) {
      return emoji;
    }

    var toneIndex = SKIN_TONES.findIndex(function (tone) {
      return tone === skinTone;
    });
    var skinnedEmoji = (emoji.skins || []).find(function (skin) {
      return !!skin.tone && (skin.tone === toneIndex || Array.isArray(skin.tone) && skin.tone.includes(toneIndex));
    });
    return skinnedEmoji || emoji;
  };

  _proto.getSkinToneFromStorage = function getSkinToneFromStorage() {
    var tone = localStorage.getItem(KEY_SKIN_TONE);

    if (tone) {
      return tone;
    }

    return null;
  };

  _proto.groupEmojis = function groupEmojis(emojis, commonEmojis, searchQuery) {
    var disableGroups = this.props.disableGroups;
    var groups = {};

    if (!searchQuery && commonEmojis.length > 0) {
      groups[GROUP_KEY_COMMONLY_USED] = {
        emojis: commonEmojis,
        group: GROUP_KEY_COMMONLY_USED
      };
    }

    emojis.forEach(function (emoji) {
      var group = GROUP_KEY_NONE;

      if (searchQuery) {
        group = GROUP_KEY_SEARCH_RESULTS;
      } else if (!disableGroups && typeof emoji.group !== 'undefined') {
        group = GROUPS[emoji.group];
      }

      if (!group) {
        return;
      }

      if (groups[group]) {
        groups[group].emojis.push(emoji);
      } else {
        groups[group] = {
          emojis: [emoji],
          group: group
        };
      }
    });
    Object.keys(groups).forEach(function (group) {
      if (group !== GROUP_KEY_COMMONLY_USED) {
        groups[group].emojis.sort(function (a, b) {
          return (a.order || 0) - (b.order || 0);
        });
      }

      if (groups[group].emojis.length === 0) {
        delete groups[group];
      }
    });
    return groups;
  };

  _proto.setUpdatedState = function setUpdatedState(nextState, forceRebuild) {
    var _this3 = this;

    if (forceRebuild === void 0) {
      forceRebuild = false;
    }

    this.setState(function (prevState) {
      var state = _extends({}, prevState, {}, nextState);

      var activeGroup = _this3.getActiveGroup(state.commonEmojis.length > 0);

      var rebuildEmojis = false;

      if ('commonEmojis' in nextState) {
        rebuildEmojis = true;

        if (state.commonEmojis.length === 0) {
          state.activeGroup = activeGroup;
        }
      }

      if ('activeGroup' in nextState) {
        if (state.searchQuery) {
          state.searchQuery = '';
          rebuildEmojis = true;
        }
      }

      if ('activeSkinTone' in nextState) {
        rebuildEmojis = true;
      }

      if ('searchQuery' in nextState) {
        rebuildEmojis = true;
        state.activeGroup = state.searchQuery ? GROUP_KEY_SEARCH_RESULTS : activeGroup;
        state.scrollToGroup = state.searchQuery ? GROUP_KEY_SEARCH_RESULTS : activeGroup;
      }

      if (rebuildEmojis || forceRebuild) {
        state.emojis = _this3.generateEmojis(state.activeSkinTone, state.searchQuery);
        state.groupedEmojis = _this3.groupEmojis(state.emojis, state.commonEmojis, state.searchQuery);
        var hasResults = state.searchQuery && state.emojis.length > 0;
        state.activeEmoji = hasResults ? state.emojis[0] : null;
        state.activeEmojiIndex = hasResults ? 0 : -1;
      }

      return state;
    });
  };

  _proto.render = function render() {
    var _ref3 = this.props,
        autoFocus = _ref3.autoFocus,
        clearIcon = _ref3.clearIcon,
        columnCount = _ref3.columnCount,
        commonMode = _ref3.commonMode,
        disableGroups = _ref3.disableGroups,
        disablePreview = _ref3.disablePreview,
        disableSearch = _ref3.disableSearch,
        disableSkinTones = _ref3.disableSkinTones,
        displayOrder = _ref3.displayOrder,
        groupIcons = _ref3.groupIcons,
        hideEmoticon = _ref3.hideEmoticon,
        hideGroupHeaders = _ref3.hideGroupHeaders,
        hideShortcodes = _ref3.hideShortcodes,
        noPreview = _ref3.noPreview,
        noResults = _ref3.noResults,
        rowCount = _ref3.rowCount,
        skinIcons = _ref3.skinIcons,
        stickyGroupHeader = _ref3.stickyGroupHeader,
        virtual = _ref3.virtual,
        onScroll = _ref3.onScroll;
    var _this$state2 = this.state,
        activeEmoji = _this$state2.activeEmoji,
        activeGroup = _this$state2.activeGroup,
        activeSkinTone = _this$state2.activeSkinTone,
        commonEmojis = _this$state2.commonEmojis,
        context = _this$state2.context,
        groupedEmojis = _this$state2.groupedEmojis,
        scrollToGroup = _this$state2.scrollToGroup,
        searchQuery = _this$state2.searchQuery;
    var skinTones = disableSkinTones ? null : React.createElement(SkinTonePalette, {
      key: "skin-tones",
      activeSkinTone: activeSkinTone,
      icons: skinIcons,
      onSelect: this.handleSelectSkinTone
    });
    var components = {
      emojis: React.createElement(EmojiList, _extends({
        key: "emojis"
      }, virtual, {
        activeEmoji: activeEmoji,
        activeGroup: activeGroup,
        clearIcon: clearIcon,
        columnCount: columnCount,
        commonMode: commonMode,
        groupedEmojis: groupedEmojis,
        hideGroupHeaders: hideGroupHeaders,
        noResults: noResults,
        rowCount: rowCount,
        scrollToGroup: scrollToGroup,
        skinTonePalette: displayOrder.includes('skin-tones') ? null : skinTones,
        stickyGroupHeader: stickyGroupHeader,
        onClear: this.handleClear,
        onEnterEmoji: this.handleEnterEmoji,
        onLeaveEmoji: this.handleLeaveEmoji,
        onScroll: onScroll,
        onScrollGroup: this.handleScrollGroup,
        onSelectEmoji: this.handleSelectEmoji
      })),
      groups: disableGroups ? null : React.createElement(GroupTabs, {
        key: "groups",
        activeGroup: activeGroup,
        commonEmojis: commonEmojis,
        commonMode: commonMode,
        icons: groupIcons,
        onSelect: this.handleSelectGroup
      }),
      preview: disablePreview ? null : React.createElement(PreviewBar, {
        key: "preview",
        emoji: activeEmoji,
        hideEmoticon: hideEmoticon,
        hideShortcodes: hideShortcodes,
        noPreview: noPreview
      }),
      search: disableSearch ? null : React.createElement(SearchBar, {
        key: "search",
        autoFocus: autoFocus,
        searchQuery: searchQuery,
        onChange: this.handleSearch,
        onKeyUp: this.handleKeyUp
      }),
      'skin-tones': skinTones
    };
    return React.createElement(Context.Provider, {
      value: context
    }, React.createElement("div", {
      className: context.classNames.picker
    }, displayOrder.map(function (key) {
      return components[key];
    })));
  };

  return InternalPicker;
}(React.PureComponent);

_defineProperty(InternalPicker, "defaultProps", {
  allowList: [],
  autoFocus: false,
  blockList: [],
  classNames: {},
  clearIcon: null,
  columnCount: 10,
  commonMode: COMMON_MODE_RECENT,
  defaultGroup: GROUP_KEY_COMMONLY_USED,
  defaultSkinTone: SKIN_KEY_NONE,
  disableCommonlyUsed: false,
  disableGroups: false,
  disablePreview: false,
  disableSearch: false,
  disableSkinTones: false,
  displayOrder: ['preview', 'emojis', 'groups', 'search'],
  emojiPadding: 0,
  groupIcons: {},
  hideEmoticon: false,
  hideGroupHeaders: false,
  hideShortcodes: false,
  maxCommonlyUsed: 30,
  maxEmojiVersion: MAX_EMOJI_VERSION,
  messages: {},
  noPreview: null,
  noResults: null,
  onHoverEmoji: function onHoverEmoji() {},
  onScroll: function onScroll() {},
  onScrollGroup: function onScrollGroup() {},
  onSearch: function onSearch() {},
  onSelectEmoji: function onSelectEmoji() {},
  onSelectGroup: function onSelectGroup() {},
  onSelectSkinTone: function onSelectSkinTone() {},
  rowCount: 8,
  skinIcons: {},
  stickyGroupHeader: false,
  virtual: {}
});

function Picker(_ref4) {
  var compact = _ref4.compact,
      locale = _ref4.locale,
      throwErrors = _ref4.throwErrors,
      version = _ref4.version,
      props = _objectWithoutPropertiesLoose(_ref4, ["compact", "locale", "throwErrors", "version"]);

  var _useEmojiData = useEmojiData({
    compact: compact,
    locale: locale,
    throwErrors: throwErrors,
    version: version
  }),
      emojis = _useEmojiData[0],
      source = _useEmojiData[1],
      data = _useEmojiData[2];

  if (emojis.length === 0) {
    return null;
  }

  return React.createElement(InternalPicker, _extends({}, props, {
    emojis: emojis,
    emojiData: data,
    emojiSource: source
  }));
}

/**
 * @copyright   2016-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */

export default Picker;
export { COMMON_MODE_FREQUENT, COMMON_MODE_RECENT, CONTEXT_CLASSNAMES, CONTEXT_MESSAGES, GROUPS, GROUP_ICONS, GROUP_KEY_COMMONLY_USED, GROUP_KEY_NONE, GROUP_KEY_SEARCH_RESULTS, GROUP_KEY_VARIATIONS, KEY_COMMONLY_USED, KEY_SKIN_TONE, SCROLL_BUFFER, SCROLL_DEBOUNCE, SEARCH_THROTTLE, SKIN_COLORS, SKIN_KEY_NONE, SKIN_TONES };
