import { getWordCount, getCharacterCount, getSentenceCount } from "src/StatUtils";
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
    this.displayText(`${words} words ${characters} characters ${sentences} sentences`);
  }

  updateAltBar() {
    this.displayText("0 words 0 characters 0 sentences");
  }
}
