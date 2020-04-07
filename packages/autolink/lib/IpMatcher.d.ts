import React from 'react';
import { MatchResponse } from 'interweave';
import UrlMatcher, { UrlMatch } from './UrlMatcher';
import { UrlMatcherOptions, UrlProps } from './types';
export default class IpMatcher extends UrlMatcher {
    constructor(name: string, options?: UrlMatcherOptions, factory?: React.ComponentType<UrlProps> | null);
    match(string: string): MatchResponse<UrlMatch> | null;
}
//# sourceMappingURL=IpMatcher.d.ts.map