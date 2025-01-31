import { Matcher, MatchResponse, Node, ChildrenNode } from 'interweave';
import { EmailProps } from './types';
export declare type EmailMatch = Pick<EmailProps, 'email' | 'emailParts'>;
export default class EmailMatcher extends Matcher<EmailProps> {
    replaceWith(children: ChildrenNode, props: EmailProps): Node;
    asTag(): string;
    match(string: string): MatchResponse<EmailMatch> | null;
}
//# sourceMappingURL=EmailMatcher.d.ts.map