import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
import { VMSideBar } from "./sidebar";
import * as path from "path";

export function activate(context: ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
    if (editor) {
      const filePath = editor.document.fileName;

      if (path.basename(filePath) === "config.yml") {
        const fileContent = editor.document.getText();
        console.log("config content: ", fileContent);
      }
    }
  });

  // Create the show gallery command
  const showGalleryCommand = commands.registerCommand("perseous.showUI", () => {
    ComponentGalleryPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showGalleryCommand);
  const treeDataProvider = new VMSideBar();
  const treeView = vscode.window.createTreeView("perseous.treeView", {
    treeDataProvider,
  });

  context.subscriptions.push(treeView);
}
