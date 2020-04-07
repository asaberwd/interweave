/**
 * @copyright   2016-2019, Miles Johnson
 * @license     https://opensource.org/licenses/MIT
 */
declare global {
    namespace NodeJS {
        interface Global {
            INTERWEAVE_SSR_POLYFILL: () => Document | undefined;
        }
    }
}
declare module 'parse5' {
    interface DefaultTreeNode {
        nodeType: number;
        textContent?: string;
        childNodes: DefaultTreeNode[];
    }
}
export declare function polyfill(): void;
export declare function polyfillDOMImplementation(): void;
//# sourceMappingURL=index.d.ts.map