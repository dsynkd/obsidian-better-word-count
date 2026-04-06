import { Plugin, WorkspaceLeaf } from "obsidian";
import StatusBar from "./StatusBar";
import { pluginField, statusBarEditorPlugin } from "./EditorPlugin";
import BetterWordCountApi from "src/api";

export default class BetterWordCount extends Plugin {
  public statusBar: StatusBar;
  public api: BetterWordCountApi = new BetterWordCountApi(this);

  async onunload(): Promise<void> {
    this.statusBar = null;
  }

  async onload() {
    const statusBarEl = this.addStatusBarItem();
    this.statusBar = new StatusBar(statusBarEl);

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
