import {
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getBulletCount,
} from "src/StatUtils";
import { debounce } from "obsidian";
import type BetterWordCount from "./main";

export default class StatusBar {
  private statusBarEl: HTMLElement;
  private plugin: BetterWordCount;
  /** `null` when the active view is not markdown (show zero counts). */
  private lastText: string | null = null;
  public debounceStatusBarUpdate;

  constructor(statusBarEl: HTMLElement, plugin: BetterWordCount) {
    this.statusBarEl = statusBarEl;
    this.plugin = plugin;
    this.debounceStatusBarUpdate = debounce(
      (text: string) => this.updateStatusBar(text),
      20,
      false
    );
  }

  displayText(text: string) {
    this.statusBarEl.setText(text);
  }

  private formatStatusBar(text: string): string {
    const s = this.plugin.settings;
    const parts: string[] = [];
    if (s.countWords) {
      parts.push(`${getWordCount(text)} words`);
    }
    if (s.countCharacters) {
      parts.push(`${getCharacterCount(text)} characters`);
    }
    if (s.countSentences) {
      parts.push(`${getSentenceCount(text)} sentences`);
    }
    if (s.countBulletPoints) {
      parts.push(`${getBulletCount(text)} bullet points`);
    }
    return parts.join("   ");
  }

  updateStatusBar(text: string) {
    this.lastText = text;
    this.displayText(this.formatStatusBar(text));
  }

  updateAltBar() {
    this.lastText = null;
    this.displayText(this.formatStatusBar(""));
  }

  /** Re-apply settings to the current status bar text (e.g. after toggles change). */
  refreshDisplay(): void {
    this.displayText(this.formatStatusBar(this.lastText ?? ""));
  }
}
