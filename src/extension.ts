import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
// import { VMSideBar } from "./sidebar";
import * as path from "path";
import * as yaml from "yaml";

// interface VmConfig {
//   name: string;
// }

export function activate(context: ExtensionContext) {
  vscode.workspace.onDidSaveTextDocument((document) => {
    if (document.fileName.endsWith("config.yml")) {
      const fileContent = document.getText();
      const parsedYaml = yaml.parse(fileContent);
      const yamlData = JSON.stringify(parsedYaml);
      ComponentGalleryPanel.render(context.extensionUri, yamlData);
      // const a = createVmStatusBarItem(parsedYaml.vm0, "myExtension.vm0");
      // const b = createVmStatusBarItem(parsedYaml.vm1, "myExtension.vm1");
      // context.subscriptions.push(a, b);
    }
  });
  vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
    if (editor) {
      const filePath = editor.document.fileName;
      if (path.basename(filePath) === "config.yml") {
        const fileContent = editor.document.getText();
        const parsedYaml = yaml.parse(fileContent);
        const yamlData = JSON.stringify(parsedYaml);
        ComponentGalleryPanel.render(context.extensionUri, yamlData);
        // const a = createVmStatusBarItem(parsedYaml.vm0, "myExtension.vm0");
        // const b = createVmStatusBarItem(parsedYaml.vm1, "myExtension.vm1");
        // context.subscriptions.push(a, b);
      }
    }
  });
  // const showGalleryCommand = commands.registerCommand("perseous.showUI", () => {
  //   // ComponentGalleryPanel.render(context.extensionUri);
  //   vscode.window.showInformationMessage("Button clicked!");
  // });
  // Add command to the extension context
  // context.subscriptions.push(showGalleryCommand);
}

// function createVmStatusBarItem(vmConfig: VmConfig, command: string) {
//   const disposable = vscode.commands.registerCommand(command, () => {
//     vscode.window.showInformationMessage("Button clicked!");
//     const treeDataProvider = new VMSideBar(vmConfig);
//     const treeView = vscode.window.createTreeView("memory.treeView", {
//       treeDataProvider,
//     });
//   });

//   const sidebarItem = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left);
//   sidebarItem.text = `$(chip) ${vmConfig.name}`;
//   sidebarItem.command = command;
//   sidebarItem.show();

//   return sidebarItem;
// }
