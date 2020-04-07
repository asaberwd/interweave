import React from 'react';
import { Matcher, MatchResponse, Node, ChildrenNode } from 'interweave';
import { UrlProps, UrlMatcherOptions } from './types';
export declare type UrlMatch = Pick<UrlProps, 'url' | 'urlParts'>;
export default class UrlMatcher extends Matcher<UrlProps, UrlMatcherOptions> {
    constructor(name: string, options?: UrlMatcherOptions, factory?: React.ComponentType<UrlProps> | null);
    replaceWith(children: ChildrenNode, props: UrlProps): Node;
    asTag(): string;
    match(string: string): MatchResponse<UrlMatch> | null;
    /**
     * Package the matched response.
     */
    handleMatches(matches: string[]): UrlMatch;
}
//# sourceMappingURL=UrlMatcher.d.ts.map