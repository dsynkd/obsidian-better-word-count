import { StateField, Transaction } from "@codemirror/state";
import { ViewUpdate, PluginValue, EditorView, ViewPlugin } from "@codemirror/view";
import type BetterWordCount from "src/main";

export const pluginField = StateField.define<BetterWordCount>({
  create() {
    return null;
  },
  update(state) {
    return state;
  },
});

function readFullDoc(doc: { iter: () => { done: boolean; next: () => { value: string } } }): string {
  let text = "";
  const textIter = doc.iter();
  while (!textIter.done) {
    text += textIter.next().value;
  }
  return text;
}

class StatusBarEditorPlugin implements PluginValue {
  view: EditorView;

  constructor(view: EditorView) {
    this.view = view;
  }

  update(update: ViewUpdate): void {
    const tr = update.transactions[0];

    if (!tr) {
      return;
    }

    const plugin = update.view.state.field(pluginField);

    const userEventTypeUndefined = tr.annotation(Transaction.userEvent) === undefined;

    if (
      (tr.isUserEvent("select") || userEventTypeUndefined) &&
      tr.newSelection.ranges[0].from !== tr.newSelection.ranges[0].to
    ) {
      const selection = tr.newSelection.main;
      let countedText = "";
      const textIter = tr.newDoc.iterRange(selection.from, selection.to);
      while (!textIter.done) {
        countedText += textIter.next().value;
      }
      plugin.statusBar.debounceStatusBarUpdate(countedText);
    } else if (
      tr.isUserEvent("input") ||
      tr.isUserEvent("delete") ||
      tr.isUserEvent("move") ||
      tr.isUserEvent("undo") ||
      tr.isUserEvent("redo") ||
      tr.isUserEvent("select")
    ) {
      plugin.statusBar.debounceStatusBarUpdate(readFullDoc(tr.newDoc));
    }
  }

  destroy() {}
}

export const statusBarEditorPlugin = ViewPlugin.fromClass(StatusBarEditorPlugin);
