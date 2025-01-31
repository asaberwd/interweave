import { Matcher, MatchResponse, Node, ChildrenNode } from 'interweave';
import { HashtagProps } from './types';
export declare type HashtagMatch = Pick<HashtagProps, 'hashtag'>;
export default class HashtagMatcher extends Matcher<HashtagProps> {
    replaceWith(children: ChildrenNode, props: HashtagProps): Node;
    asTag(): string;
    match(string: string): MatchResponse<HashtagMatch> | null;
}
//# sourceMappingURL=HashtagMatcher.d.ts.map