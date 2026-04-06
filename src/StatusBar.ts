import {
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getBulletCount,
} from "src/utils";
import { debounce } from "obsidian";
import type BetterWordCount from "./main";

export interface StatusBarItemElements {
  words: HTMLElement;
  characters: HTMLElement;
  sentences: HTMLElement;
  bullets: HTMLElement;
}

export default class StatusBar {
  private readonly items: StatusBarItemElements;
  private plugin: BetterWordCount;
  /** `null` when the active view is not markdown (show zero counts). */
  private lastText: string | null = null;
  public debounceStatusBarUpdate;

  constructor(items: StatusBarItemElements, plugin: BetterWordCount) {
    this.items = items;
    this.plugin = plugin;
    this.debounceStatusBarUpdate = debounce(
      (text: string) => this.updateStatusBar(text),
      20,
      false
    );
  }

  private setItem(el: HTMLElement, enabled: boolean, label: string): void {
    if (enabled) {
      el.style.removeProperty("display");
      el.setText(label);
    } else {
      el.style.display = "none";
    }
  }

  private renderCounts(text: string): void {
    const s = this.plugin.settings;
    this.setItem(this.items.words, s.countWords, `${getWordCount(text)} words`);
    this.setItem(
      this.items.characters,
      s.countCharacters,
      `${getCharacterCount(text)} characters`
    );
    this.setItem(this.items.sentences, s.countSentences, `${getSentenceCount(text)} sentences`);
    this.setItem(
      this.items.bullets,
      s.countBulletPoints,
      `${getBulletCount(text)} bullet points`
    );
  }

  updateStatusBar(text: string) {
    this.lastText = text;
    this.renderCounts(text);
  }

  updateAltBar() {
    this.lastText = null;
    this.renderCounts("");
  }

  /** Re-apply settings to the current status bar text (e.g. after toggles change). */
  refreshDisplay(): void {
    this.renderCounts(this.lastText ?? "");
  }
}
