import Filter from './Filter';
import { ElementAttributes } from './types';
export default class StyleFilter extends Filter {
    attribute<K extends keyof ElementAttributes>(name: K, value: ElementAttributes[K]): ElementAttributes[K];
}
//# sourceMappingURL=StyleFilter.d.ts.map