/// <reference types="react" />
import { Hexcode, GroupKey as BaseGroupKey, SkinToneKey as BaseSkinToneKey } from 'emojibase';
import { CanonicalEmoji, Path, Source, EmojiDataManager } from 'interweave-emoji';
export interface CommonEmoji {
    count: number;
    hexcode: Hexcode;
}
export declare type CommonMode = 'recently-used' | 'frequently-used';
export interface Context {
    classNames: {
        [name: string]: string;
    };
    emojiLargeSize: number;
    emojiPadding: number;
    emojiPath: Path;
    emojiSize: number;
    emojiSource: Source;
    messages: {
        [key: string]: string;
    };
}
export declare type DisplayOrder = 'preview' | 'emojis' | 'groups' | 'search' | 'skin-tones';
export declare type GroupKey = BaseGroupKey | 'commonly-used' | 'search-results' | 'variations' | 'none';
export interface GroupEmojiMap {
    [group: string]: {
        emojis: CanonicalEmoji[];
        group: GroupKey;
    };
}
export interface GroupIndexMap {
    [group: string]: number;
}
export declare type SkinToneKey = BaseSkinToneKey | 'none';
export interface AllowBlockMap {
    [hexcode: string]: boolean;
}
export interface PickerProps {
    /** List of emoji hexcodes to only show. */
    allowList?: Hexcode[];
    /** Focus the search bar on mount. */
    autoFocus?: boolean;
    /** List of emoji hexcodes to hide. */
    blockList?: Hexcode[];
    /** Mapping of custom CSS class names. */
    classNames?: {
        [key: string]: string;
    };
    /** Icon to display within the clear commonly used button. Omit the icon to hide the button. */
    clearIcon?: React.ReactNode;
    /** Number of emojis to display horizontally. */
    columnCount?: number;
    /** Type of commonly used mode. */
    commonMode?: CommonMode;
    /** Group to select by default. */
    defaultGroup?: GroupKey;
    /** Skin tone to select by default (if not found in local storage). */
    defaultSkinTone?: SkinToneKey;
    /** Disable commonly used functionality. */
    disableCommonlyUsed?: boolean;
    /** Disable and hide group tabs. */
    disableGroups?: boolean;
    /** Disable and hide preview bar. */
    disablePreview?: boolean;
    /** Disable and hide search bar. */
    disableSearch?: boolean;
    /** Disable and hide skin tone palette bar. */
    disableSkinTones?: boolean;
    /** Order to render components in. */
    displayOrder?: DisplayOrder[];
    /** Size of the emoji within the preview bar. */
    emojiLargeSize: number;
    /** Padding around each emoji. */
    emojiPadding?: number;
    /** Path to an SVG/PNG. Accepts a string or a callback that is passed the hexcode. */
    emojiPath: Path;
    /** Pixel size of emoji within the list. */
    emojiSize: number;
    /** Mapping of custom icons for each group tab. */
    groupIcons?: {
        [key: string]: React.ReactNode;
    };
    /** Hide emoticons within the preview bar. */
    hideEmoticon?: boolean;
    /** Hide group headers within the list. */
    hideGroupHeaders?: boolean;
    /** Hide shortcodes within the preview bar. */
    hideShortcodes?: boolean;
    /** Max number of commonly used to store. */
    maxCommonlyUsed?: number;
    /** Max official emoji release version to support. */
    maxEmojiVersion?: number;
    /** Mapping of custom translation messages. */
    messages?: {
        [key: string]: string;
    };
    /** Content to render by default in the preview bar. */
    noPreview?: React.ReactNode;
    /** Content to render when there are no search results. */
    noResults?: React.ReactNode;
    /** Callback fired when hovering an emoji. */
    onHoverEmoji?: (emoji: CanonicalEmoji, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback fired when scrolling the emoji list. */
    onScroll?: () => void;
    /** Callback fired when a new group is scrolled into view. */
    onScrollGroup?: (group: GroupKey) => void;
    /** Callback fired when typing in the search field. */
    onSearch?: (query: string, event: React.ChangeEvent<HTMLInputElement>) => void;
    /** Callback fired when clicking on an emoji. */
    onSelectEmoji?: (emoji: CanonicalEmoji, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback fired when clicking a group tab. */
    onSelectGroup?: (group: GroupKey, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Callback fired when clicking a skin tone. */
    onSelectSkinTone?: (skinTone: SkinToneKey, event: React.MouseEvent<HTMLButtonElement>) => void;
    /** Number of emoji rows to display vertically. */
    rowCount?: number;
    /** Mapping of custom icons for each skin tone. */
    skinIcons?: {
        [key: string]: React.ReactNode;
    };
    /** Sticky the active group header to the top of the emoji list. */
    stickyGroupHeader?: boolean;
    /** Custom props to pass to react-window list component. */
    virtual?: {
        columnPadding?: number;
        rowPadding?: number;
    };
}
export interface InternalPickerProps extends PickerProps {
    /** List of all emojis. */
    emojis: CanonicalEmoji[];
    /** Data manager instance. */
    emojiData: EmojiDataManager;
    /** Emoji data source metadata. */
    emojiSource: Source;
}
export interface InternalPickerState {
    /** Emoji to display in the preview. */
    activeEmoji: CanonicalEmoji | null;
    /** Index for the highlighted emoji within search results. */
    activeEmojiIndex: number;
    /** Currently selected group tab. */
    activeGroup: GroupKey;
    /** Currently selected skin tone. */
    activeSkinTone: SkinToneKey;
    /** List of emoji hexcodes most commonly used. */
    commonEmojis: CanonicalEmoji[];
    /** React context. */
    context: Context;
    /** List of all emojis with search filtering applied. */
    emojis: CanonicalEmoji[];
    /** Filtered emojis grouped by group number. */
    groupedEmojis: GroupEmojiMap;
    /** Group to scroll to on render. */
    scrollToGroup: GroupKey | '';
    /** Current search query. */
    searchQuery: string;
}
//# sourceMappingURL=types.d.ts.map