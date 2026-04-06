export interface BetterWordCountSettings {
  countWords: boolean;
  countCharacters: boolean;
  countSentences: boolean;
  countBulletPoints: boolean;
}

export const DEFAULT_SETTINGS: BetterWordCountSettings = {
  countWords: true,
  countCharacters: true,
  countSentences: true,
  countBulletPoints: true,
};
