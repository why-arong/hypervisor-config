import { commands, ExtensionContext } from "vscode";
import { ComponentGalleryPanel } from "./panels/ComponentGalleryPanel";
import * as vscode from "vscode";
import { VMSideBar } from "./sidebar";
import * as path from "path";
import * as yaml from "yaml";

export function activate(context: ExtensionContext) {
  vscode.window.onDidChangeActiveTextEditor((editor: vscode.TextEditor | undefined) => {
    if (editor) {
      const filePath = editor.document.fileName;

      if (path.basename(filePath) === "config.yml") {
        const fileContent = editor.document.getText();
        try {
          const parsedYaml = yaml.parse(fileContent);

          // vm0의 이름을 출력
          if (parsedYaml && parsedYaml.vm0 && parsedYaml.vm0.name) {
            console.log("vm0의 이름:", parsedYaml.vm0.name);
          }
        } catch (error) {
          console.error("YAML 파싱 오류:", (error as Error).message);
        }
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
