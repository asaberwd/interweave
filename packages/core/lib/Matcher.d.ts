import React from 'react';
import { MatchCallback, MatchResponse, Node, ChildrenNode, MatcherInterface } from './types';
export default abstract class Matcher<Props extends object = {}, Options extends object = {}> implements MatcherInterface<Props> {
    greedy: boolean;
    options: Options;
    propName: string;
    inverseName: string;
    factory: React.ComponentType<Props> | null;
    constructor(name: string, options?: Options, factory?: React.ComponentType<Props> | null);
    /**
     * Attempts to create a React element using a custom user provided factory,
     * or the default matcher factory.
     */
    createElement(children: ChildrenNode, props: Props): Node;
    /**
     * Trigger the actual pattern match and package the matched
     * response through a callback.
     */
    doMatch<T>(string: string, pattern: string | RegExp, callback: MatchCallback<T>, isVoid?: boolean): MatchResponse<T> | null;
    /**
     * Callback triggered before parsing.
     */
    onBeforeParse(content: string, props: Props): string;
    /**
     * Callback triggered after parsing.
     */
    onAfterParse(content: Node[], props: Props): Node[];
    /**
     * Replace the match with a React element based on the matched token and optional props.
     */
    abstract replaceWith(children: ChildrenNode, props: Props): Node;
    /**
     * Defines the HTML tag name that the resulting React element will be.
     */
    abstract asTag(): string;
    /**
     * Attempt to match against the defined string. Return `null` if no match found,
     * else return the `match` and any optional props to pass along.
     */
    abstract match(string: string): MatchResponse<any> | null;
}
//# sourceMappingURL=Matcher.d.ts.map