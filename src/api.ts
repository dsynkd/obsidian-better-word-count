import { TFile, normalizePath } from "obsidian";
import type BetterWordCount from "src/main";
import {
  getBulletCount,
  getCharacterCount,
  getSentenceCount,
  getWordCount,
  stripYamlFrontmatter,
} from "src/StatUtils";

export default class BetterWordCountApi {
  private plugin: BetterWordCount;

  constructor(plugin: BetterWordCount) {
    this.plugin = plugin;
  }

  public getWordCount(text: string): number {
    return getWordCount(text);
  }

  public getCharacterCount(text: string): number {
    return getCharacterCount(text);
  }

  public getSentenceCount(text: string): number {
    return getSentenceCount(text);
  }

  public getBulletCount(text: string): number {
    return getBulletCount(text);
  }

  private async countPagePath(path: string, countFunc: (text: string) => number): Promise<number | null> {
    const normalizedPath = normalizePath(path);
    const file = this.plugin.app.vault.getAbstractFileByPath(normalizedPath);

    if (file instanceof TFile) {
      const text = stripYamlFrontmatter(await this.plugin.app.vault.cachedRead(file));
      return countFunc(text);
    }

    return null;
  }

  public async getWordCountPagePath(path: string): Promise<number | null> {
    return this.countPagePath(path, getWordCount);
  }

  public getCharacterCountPagePath(path: string): Promise<number | null> {
    return this.countPagePath(path, getCharacterCount);
  }

  public getSentenceCountPagePath(path: string): Promise<number | null> {
    return this.countPagePath(path, getSentenceCount);
  }

  public getBulletCountPagePath(path: string): Promise<number | null> {
    return this.countPagePath(path, getBulletCount);
  }
}
