import { App, PluginSettingTab, Setting } from "obsidian";
import type BetterWordCount from "./main";

export default class BetterWordCountSettingTab extends PluginSettingTab {
  plugin: BetterWordCount;

  constructor(app: App, plugin: BetterWordCount) {
    super(app, plugin);
    this.plugin = plugin;
  }

  display(): void {
    const { containerEl } = this;
    containerEl.empty();

    new Setting(containerEl)
      .setName("Words")
      .setDesc("Show word count in the status bar.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.countWords).onChange(async (value) => {
          this.plugin.settings.countWords = value;
          await this.plugin.saveSettings();
          this.plugin.statusBar.refreshDisplay();
        })
      );

    new Setting(containerEl)
      .setName("Characters")
      .setDesc("Show character count in the status bar.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.countCharacters).onChange(async (value) => {
          this.plugin.settings.countCharacters = value;
          await this.plugin.saveSettings();
          this.plugin.statusBar.refreshDisplay();
        })
      );

    new Setting(containerEl)
      .setName("Sentences")
      .setDesc("Show sentence count in the status bar.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.countSentences).onChange(async (value) => {
          this.plugin.settings.countSentences = value;
          await this.plugin.saveSettings();
          this.plugin.statusBar.refreshDisplay();
        })
      );

    new Setting(containerEl)
      .setName("Bullet points")
      .setDesc("Show Markdown unordered list line count (-, *, +) in the status bar.")
      .addToggle((toggle) =>
        toggle.setValue(this.plugin.settings.countBulletPoints).onChange(async (value) => {
          this.plugin.settings.countBulletPoints = value;
          await this.plugin.saveSettings();
          this.plugin.statusBar.refreshDisplay();
        })
      );
  }
}
