import { Plugin, WorkspaceLeaf } from "obsidian";
import StatusBar from "./StatusBar";
import { pluginField, statusBarEditorPlugin } from "./editor";
import BetterWordCountApi from "src/api";
import {
  BetterWordCountSettingTab,
  DEFAULT_SETTINGS,
  type BetterWordCountSettings,
} from "./settings";

export default class BetterWordCount extends Plugin {
  public settings: BetterWordCountSettings;
  public statusBar: StatusBar;
  public api: BetterWordCountApi = new BetterWordCountApi(this);

  async onunload(): Promise<void> {
    this.statusBar = null;
  }

  async loadSettings(): Promise<void> {
    this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
  }

  async saveSettings(): Promise<void> {
    await this.saveData(this.settings);
  }

  async onload() {
    await this.loadSettings();

    this.statusBar = new StatusBar(
      {
        words: this.addStatusBarItem(),
        characters: this.addStatusBarItem(),
        sentences: this.addStatusBarItem(),
        bullets: this.addStatusBarItem(),
      },
      this
    );

    this.addSettingTab(new BetterWordCountSettingTab(this.app, this));

    this.registerEditorExtension([pluginField.init(() => this), statusBarEditorPlugin]);

    this.registerEvent(
      this.app.workspace.on("active-leaf-change", (leaf: WorkspaceLeaf) => {
        if (leaf.view.getViewType() !== "markdown") {
          this.statusBar.updateAltBar();
        }
      })
    );
  }
}
