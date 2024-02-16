import { ExtensionContext, TextDocument, TextEditor, workspace, window } from "vscode";
import { SettingsPanel } from "./panels/SettingsPanel";
import * as path from "path";
import * as yaml from "yaml";
const configurationFileName = "config.yml";
import * as vscode from "vscode";

export function activate(context: ExtensionContext) {
  let disposable = vscode.commands.registerCommand("perseous.hypervisorConfig", () => {
    handleHypervisorConfigCommand();
  });
  context.subscriptions.push(disposable);

  workspace.onDidSaveTextDocument((document: TextDocument) => {
    handleDocumentChange(context, document);
  });
  window.onDidChangeActiveTextEditor((editor: TextEditor | undefined) => {
    handleEditorChange(context, editor);
  });
  const activeEditor = window.activeTextEditor;
  if (activeEditor) {
    handleEditorChange(context, activeEditor);
  }
}

function renderUI(context: ExtensionContext, yamlData: string) {
  SettingsPanel.render(context.extensionUri, yamlData);
}

function handleDocumentChange(context: ExtensionContext, document: TextDocument) {
  if (document.fileName.endsWith(configurationFileName)) {
    const yamlData = convertYamlToJsonString(document.getText());
    renderUI(context, yamlData);
  }
}

function handleEditorChange(context: ExtensionContext, editor: TextEditor | undefined) {
  if (editor && path.basename(editor.document.fileName) === configurationFileName) {
    const yamlData = convertYamlToJsonString(editor.document.getText());
    renderUI(context, yamlData);
  }
}
function convertYamlToJsonString(fileContent: string): string {
  const parsedYaml = yaml.parse(fileContent);
  return JSON.stringify(parsedYaml);
}
// 명령을 처리하는 함수
async function handleHypervisorConfigCommand() {
  // 현재 열려 있는 워크스페이스의 경로 가져오기
  const workspaceFolders = vscode.workspace.workspaceFolders;
  if (!workspaceFolders) {
    vscode.window.showErrorMessage("No workspace is opened.");
    return;
  }

  const workspaceUri = workspaceFolders[0].uri;

  // config.yml 파일의 경로
  const configFilePath = path.join(workspaceUri.fsPath, "config.yml");

  // 파일이 존재하는지 확인
  const fileExists = await vscode.workspace.fs.stat(vscode.Uri.file(configFilePath)).then(
    () => true,
    () => false
  );
  if (!fileExists) {
    vscode.window.showErrorMessage("config.yml file not found in the workspace.");
    return;
  }

  // 선택한 파일의 경로를 출력
  vscode.window.showInformationMessage(`Selected config file: ${configFilePath}`);
}
