import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
import { VMSideBar } from "./sidebar";
import * as path from "path";
import * as yaml from "yaml";
import * as fs from "fs";

// import { HostViewProvider } from "./hostview";
interface VmConfig {
  name: string;
  // Add other properties as needed
}

export function activate(context: ExtensionContext) {
  let currentPanel: vscode.WebviewPanel | undefined = undefined;

  vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
    if (editor) {
      const filePath = editor.document.fileName;
      if (path.basename(filePath) === "config.yml") {
        const fileContent = editor.document.getText();
        const parsedYaml = yaml.parse(fileContent);
        const yamlData = JSON.stringify(parsedYaml);
        // TODO: You should send parsed Data using parsedYaml not using local config.yml
        // because the content of config.yml can be different from user.

        ComponentGalleryPanel.render(context.extensionUri, yamlData);
        const a = createVmStatusBarItem(parsedYaml.vm0, "myExtension.vm0");
        const b = createVmStatusBarItem(parsedYaml.vm1, "myExtension.vm1");
        context.subscriptions.push(a, b);
      }
    }
  });
  // Create the show gallery command
  // const showGalleryCommand = commands.registerCommand("perseous.showUI", () => {
  //   ComponentGalleryPanel.render(context.extensionUri);
  // });
  // // Add command to the extension context
  // context.subscriptions.push(showGalleryCommand);
}

function createVmStatusBarItem(vmConfig: VmConfig, command: string) {
  const disposable = vscode.commands.registerCommand(command, () => {
    vscode.window.showInformationMessage("Button clicked!");
    const treeDataProvider = new VMSideBar(vmConfig);
    const treeView = vscode.window.createTreeView("memory.treeView", {
      treeDataProvider,
    });
  });

  const sidebarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
  sidebarItem.text = `$(chip) ${vmConfig.name}`;
  sidebarItem.command = command;
  sidebarItem.show();

  return sidebarItem;
}
