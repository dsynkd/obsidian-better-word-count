import {
  getWordCount,
  getCharacterCount,
  getSentenceCount,
  getBulletCount,
} from "src/StatUtils";
import { debounce } from "obsidian";

export default class StatusBar {
  private statusBarEl: HTMLElement;
  public debounceStatusBarUpdate;

  constructor(statusBarEl: HTMLElement) {
    this.statusBarEl = statusBarEl;
    this.debounceStatusBarUpdate = debounce(
      (text: string) => this.updateStatusBar(text),
      20,
      false
    );
  }

  displayText(text: string) {
    this.statusBarEl.setText(text);
  }

  updateStatusBar(text: string) {
    const words = getWordCount(text);
    const characters = getCharacterCount(text);
    const sentences = getSentenceCount(text);
    const bullets = getBulletCount(text);
    this.displayText(
      `${words} words ${characters} characters ${sentences} sentences ${bullets} bullets`
    );
  }

  updateAltBar() {
    this.displayText("0 words 0 characters 0 sentences 0 bullets");
  }
}
