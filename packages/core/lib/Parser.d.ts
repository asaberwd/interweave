import { Attributes, Node, NodeConfig, ChildrenNode, ParserProps, MatcherElementsMap, FilterInterface, ElementAttributes, MatcherInterface } from './types';
export default class Parser {
    allowed: Set<string>;
    banned: Set<string>;
    blocked: Set<string>;
    container?: HTMLElement;
    content: Node[];
    props: ParserProps;
    matchers: MatcherInterface<unknown>[];
    filters: FilterInterface[];
    keyIndex: number;
    constructor(markup: string, props?: ParserProps, matchers?: MatcherInterface<unknown>[], filters?: FilterInterface[]);
    /**
     * Loop through and apply all registered attribute filters.
     */
    applyAttributeFilters<K extends keyof ElementAttributes>(name: K, value: ElementAttributes[K]): ElementAttributes[K];
    /**
     * Loop through and apply all registered node filters.
     */
    applyNodeFilters(name: string, node: HTMLElement | null): HTMLElement | null;
    /**
     * Loop through and apply all registered matchers to the string.
     * If a match is found, create a React element, and build a new array.
     * This array allows React to interpolate and render accordingly.
     */
    applyMatchers(string: string, parentConfig: NodeConfig): ChildrenNode;
    /**
     * Determine whether the child can be rendered within the parent.
     */
    canRenderChild(parentConfig: NodeConfig, childConfig: NodeConfig): boolean;
    /**
     * Convert line breaks in a string to HTML `<br/>` tags.
     * If the string contains HTML, we should not convert anything,
     * as line breaks should be handled by `<br/>`s in the markup itself.
     */
    convertLineBreaks(markup: string): string;
    /**
     * Create a detached HTML document that allows for easy HTML
     * parsing while not triggering scripts or loading external
     * resources.
     */
    createContainer(markup: string): HTMLElement | undefined;
    /**
     * Convert an elements attribute map to an object map.
     * Returns null if no attributes are defined.
     */
    extractAttributes(node: HTMLElement): Attributes | null;
    /**
     * Extract the style attribute as an object and remove values that allow for attack vectors.
     */
    extractStyleAttribute(node: HTMLElement): object;
    /**
     * Return configuration for a specific tag.
     */
    getTagConfig(tagName: string): NodeConfig;
    /**
     * Verify that a node is safe from XSS and injection attacks.
     */
    isSafe(node: HTMLElement): boolean;
    /**
     * Verify that an HTML tag is allowed to render.
     */
    isTagAllowed(tagName: string): boolean;
    /**
     * Parse the markup by injecting it into a detached document,
     * while looping over all child nodes and generating an
     * array to interpolate into JSX.
     */
    parse(): Node[];
    /**
     * Loop over the nodes children and generate a
     * list of text nodes and React elements.
     */
    parseNode(parentNode: HTMLElement, parentConfig: NodeConfig): Node[];
    /**
     * Deconstruct the string into an array, by replacing custom tokens with React elements,
     * so that React can render it correctly.
     */
    replaceTokens(tokenizedString: string, elements: MatcherElementsMap): ChildrenNode;
}
//# sourceMappingURL=Parser.d.ts.map