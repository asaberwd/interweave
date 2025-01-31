import { FilterInterface, ElementAttributes } from './types';
export default class Filter implements FilterInterface {
    /**
     * Filter and clean an HTML attribute value.
     */
    attribute<K extends keyof ElementAttributes>(name: K, value: ElementAttributes[K]): ElementAttributes[K] | undefined | null;
    /**
     * Filter and clean an HTML node.
     */
    node(name: string, node: HTMLElement): HTMLElement | null;
}
//# sourceMappingURL=Filter.d.ts.map