import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
import { VMSideBar } from "./sidebar";
import * as path from "path";
import * as yaml from "yaml";

interface VmConfig {
  name: string;
  // Add other properties as needed
}

export function activate(context: ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
    if (editor) {
      const filePath = editor.document.fileName;

      if (path.basename(filePath) === "config.yml") {
        const fileContent = editor.document.getText();
        const parsedYaml = yaml.parse(fileContent);

        const treeDataProvider = new VMSideBar(parsedYaml);
        const treeView = vscode.window.createTreeView("perseous.treeView", {
          treeDataProvider,
        });

        context.subscriptions.push(treeView);
        const disposable = vscode.commands.registerCommand("myExtension.logMessage", () => {
          vscode.window.showInformationMessage("Button clicked!");
          console.log("Button clicked!");
        });
        context.subscriptions.push(disposable);
        createVmStatusBarItem(parsedYaml.vm0);
        createVmStatusBarItem(parsedYaml.vm1);
      }
    }
  });

  // Create the show gallery command
  const showGalleryCommand = commands.registerCommand("perseous.showUI", () => {
    ComponentGalleryPanel.render(context.extensionUri);
  });

  // Add command to the extension context
  context.subscriptions.push(showGalleryCommand);
}

function createVmStatusBarItem(vmConfig: VmConfig) {
  const sidebarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  sidebarItem.text = `$(chip) ${vmConfig.name}`;
  sidebarItem.command = "myExtension.logMessage";
  sidebarItem.show();
}
