import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
import { VMSideBar } from "./sidebar";

export function activate(context: ExtensionContext) {
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
