import EmojiDataManager from './EmojiDataManager';
import { CanonicalEmoji, Source, UseEmojiDataOptions } from './types';
export declare function resetLoaded(): void;
export default function useEmojiData({ avoidFetch, compact, locale, throwErrors, version, }?: UseEmojiDataOptions): [CanonicalEmoji[], Source, EmojiDataManager];
//# sourceMappingURL=useEmojiData.d.ts.map