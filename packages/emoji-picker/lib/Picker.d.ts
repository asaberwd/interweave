import React from 'react';
import { UseEmojiDataOptions, CanonicalEmoji } from 'interweave-emoji';
import { CommonEmoji, GroupKey, SkinToneKey, GroupEmojiMap, InternalPickerProps, InternalPickerState, AllowBlockMap, PickerProps } from './types';
export declare class InternalPicker extends React.PureComponent<InternalPickerProps, InternalPickerState> {
    static defaultProps: Partial<InternalPickerProps>;
    allowList: AllowBlockMap;
    blockList: AllowBlockMap;
    constructor(props: InternalPickerProps);
    /**
     * Add a common emoji to local storage and update the current state.
     */
    addCommonEmoji(emoji: CanonicalEmoji): void;
    /**
     * Filter the dataset with the search query against a set of emoji properties.
     */
    filterOrSearch(emoji: CanonicalEmoji, searchQuery: string): boolean;
    /**
     * Return the list of emojis filtered with the search query if applicable,
     * and with skin tone applied if set.
     */
    generateEmojis(skinTone: SkinToneKey, searchQuery: string): CanonicalEmoji[];
    /**
     * Convert the `blockList` or `allowList` prop to a map for quicker lookups.
     */
    generateAllowBlockMap(list: string[]): AllowBlockMap;
    /**
     * We only store the hexcode character for commonly used emojis,
     * so we need to rebuild the list with full emoji objects.
     */
    generateCommonEmojis(commonEmojis: CommonEmoji[]): CanonicalEmoji[];
    /**
     * Return the default group while handling commonly used scenarios.
     */
    getActiveGroup(hasCommon: boolean): GroupKey;
    /**
     * Return the commonly used emojis from local storage.
     */
    getCommonEmojisFromStorage(): CommonEmoji[];
    /**
     * Return an emoji with skin tone if the active skin tone is set,
     * otherwise return the default skin tone (yellow).
     */
    getSkinnedEmoji(emoji: CanonicalEmoji, skinTone: SkinToneKey): CanonicalEmoji;
    /**
     * Return the user's favorite skin tone from local storage.
     */
    getSkinToneFromStorage(): SkinToneKey | null;
    /**
     * Partition the dataset into multiple arrays based on the group they belong to.
     */
    groupEmojis(emojis: CanonicalEmoji[], commonEmojis: CanonicalEmoji[], searchQuery: string): GroupEmojiMap;
    /**
     * Triggered when common emoji cache or variation window is cleared.
     */
    private handleClear;
    /**
     * Triggered when the mouse hovers an emoji.
     */
    private handleEnterEmoji;
    /**
     * Triggered when keyboard changes occur.
     */
    private handleKeyUp;
    /**
     * Triggered when the mouse no longer hovers an emoji.
     */
    private handleLeaveEmoji;
    /**
     * Triggered when a group is scrolled into view.
     */
    private handleScrollGroup;
    /**
     * Triggered when the search input field value changes.
     */
    private handleSearch;
    private handleSearchDebounced;
    /**
     * Triggered when an emoji is clicked.
     */
    private handleSelectEmoji;
    /**
     * Triggered when a group tab is clicked. We should reset search and scroll position.
     */
    private handleSelectGroup;
    /**
     * Triggered when a skin tone is clicked.
     */
    private handleSelectSkinTone;
    /**
     * Catch all method to easily update the state. Will automatically handle updates
     * and branching based on values being set.
     */
    setUpdatedState(nextState: Partial<InternalPickerState>, forceRebuild?: boolean): void;
    render(): JSX.Element;
}
export default function Picker({ compact, locale, throwErrors, version, ...props }: PickerProps & UseEmojiDataOptions): JSX.Element | null;
//# sourceMappingURL=Picker.d.ts.map