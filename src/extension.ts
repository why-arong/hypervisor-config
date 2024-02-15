import { ExtensionContext, TextDocument, TextEditor, workspace, window } from "vscode";
import { SettingsPanel } from "./panels/SettingsPanel";
import * as path from "path";
import * as yaml from "yaml";
const configurationFileName = "config.yml";

export function activate(context: ExtensionContext) {
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
