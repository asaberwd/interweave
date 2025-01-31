import React from 'react';
import { Matcher, MatchResponse, Node, ChildrenNode } from 'interweave';
import EmojiDataManager from './EmojiDataManager';
import { EmojiProps, EmojiMatcherOptions, EmojiMatch } from './types';
export default class EmojiMatcher extends Matcher<EmojiProps, EmojiMatcherOptions> {
    data: EmojiDataManager | null;
    greedy: boolean;
    constructor(name: string, options?: EmojiMatcherOptions, factory?: React.ComponentType<EmojiProps> | null);
    replaceWith(children: ChildrenNode, props: EmojiProps): Node;
    asTag(): string;
    match(string: string): MatchResponse<EmojiMatch> | null;
    matchEmoticon(string: string): MatchResponse<EmojiMatch> | null;
    matchShortcode(string: string): MatchResponse<EmojiMatch> | null;
    matchUnicode(string: string): MatchResponse<EmojiMatch> | null;
    /**
     * Load emoji data before matching.
     */
    onBeforeParse(content: string, props: EmojiProps): string;
    /**
     * When a single `Emoji` is the only content, enlarge it!
     */
    onAfterParse(content: Node[], props: EmojiProps): Node[];
}
//# sourceMappingURL=EmojiMatcher.d.ts.map