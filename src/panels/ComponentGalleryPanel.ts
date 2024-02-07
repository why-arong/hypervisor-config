import { Disposable, Webview, WebviewPanel, window, Uri, ViewColumn } from "vscode";
import { getUri } from "../utilities/getUri";
import { getNonce } from "../utilities/getNonce";
import * as fs from "fs";
import * as path from "path";
import * as yaml from "yaml";
// import { parse } from "path";
import * as vscode from "vscode";

/**
 * This class manages the state and behavior of ComponentGallery webview panels.
 *
 * It contains all the data and methods for:
 *
 * - Creating and rendering ComponentGallery webview panels
 * - Properly cleaning up and disposing of webview resources when the panel is closed
 * - Setting the HTML (and by proxy CSS/JavaScript) content of the webview panel
 */
export class ComponentGalleryPanel {
  public static currentPanel: ComponentGalleryPanel | undefined;
  private readonly _panel: WebviewPanel;
  private _disposables: Disposable[] = [];

  /**
   * The ComponentGalleryPanel class private constructor (called only from the render method).
   *
   * @param panel A reference to the webview panel
   * @param extensionUri The URI of the directory containing the extension
   */
  private constructor(panel: WebviewPanel, extensionUri: Uri) {
    this._panel = panel;

    // Set an event listener to listen for when the panel is disposed (i.e. when the user closes
    // the panel or when the panel is closed programmatically)
    this._panel.onDidDispose(() => this.dispose(), null, this._disposables);

    // Set the HTML content for the webview panel
    this._panel.webview.html = this._getWebviewContent(this._panel.webview, extensionUri);
    // Set an event listener to listen for messages passed from the webview context
    this._setWebviewMessageListener(this._panel.webview);
  }

  /**
   * Renders the current webview panel if it exists otherwise a new webview panel
   * will be created and displayed.
   *
   * @param extensionUri The URI of the directory containing the extension.
   */
  public static render(extensionUri: Uri, yamlData: string) {
    if (ComponentGalleryPanel.currentPanel) {
      // If the webview panel already exists reveal it
      ComponentGalleryPanel.currentPanel._panel.reveal(ViewColumn.One);
    } else {
      // If a webview panel does not already exist create and show a new one
      const panel = window.createWebviewPanel(
        // Panel view type
        "showGallery",
        // Panel title
        "Perseous",
        // The editor column the panel should be displayed in
        ViewColumn.One,
        // Extra panel configurations
        {
          // Enable JavaScript in the webview
          enableScripts: true,
          // Restrict the webview to only load resources from the `out` and `webview-ui/build` directories
          localResourceRoots: [
            // Uri.joinPath(extensionUri, "out"),
            // Uri.joinPath(extensionUri, "webview-ui/build"),
            Uri.joinPath(extensionUri, ""),
          ],
        }
      );

      ComponentGalleryPanel.currentPanel = new ComponentGalleryPanel(panel, extensionUri);
    }
    // const yamlUri = Uri.joinPath(extensionUri, "config.yml");
    // console.log("Im here!!!," + yamlUri.path);
    // const yamlString = fs.readFileSync(yamlUri.path, "utf8");
    // const data = yaml.parse(yamlString);
    // console.log("Parsed YAML:", data.soc);
    // const data = this._parseYaml(extensionUri);
    ComponentGalleryPanel.currentPanel._panel.webview.postMessage({
      command: "refactor",
      data: yamlData,
    });
  }

  /**
   * Cleans up and disposes of webview resources when the webview panel is closed.
   */
  public dispose() {
    ComponentGalleryPanel.currentPanel = undefined;

    // Dispose of the current webview panel
    this._panel.dispose();

    // Dispose of all disposables (i.e. commands) for the current webview panel
    while (this._disposables.length) {
      const disposable = this._disposables.pop();
      if (disposable) {
        disposable.dispose();
      }
    }
  }

  /**
   * Defines and returns the HTML that should be rendered within the webview panel.
   *
   * @remarks This is also the place where references to the React webview build files
   * are created and inserted into the webview HTML.
   *
   * @param webview A reference to the extension webview
   * @param extensionUri The URI of the directory containing the extension
   * @returns A template string literal containing the HTML that should be
   * rendered within the webview panel
   */
  private _getWebviewContent(webview: Webview, extensionUri: Uri) {
    // The CSS file from the React build output
    const stylesUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.css"]);
    // Codicon font file from the React build output
    const codiconFontUri = getUri(webview, extensionUri, [
      "webview-ui",
      "build",
      "assets",
      "codicon.ttf",
    ]);
    // The JS file from the React build output
    const scriptUri = getUri(webview, extensionUri, ["webview-ui", "build", "assets", "index.js"]);

    const nonce = getNonce();

    // Tip: Install the es6-string-html VS Code extension to enable code highlighting below
    return /*html*/ `
      <!DOCTYPE html>
      <html lang="en">
        <head>
          <meta charset="UTF-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1.0" />
          <meta http-equiv="Content-Security-Policy" content="default-src 'none'; style-src ${webview.cspSource} 'nonce-${nonce}'; font-src ${webview.cspSource}; script-src 'nonce-${nonce}';">
          <link rel="stylesheet" type="text/css" href="${stylesUri}">
          <title>Component Gallery (React)</title>
          <style nonce="${nonce}">
            @font-face {
              font-family: "codicon";
              font-display: block;
              src: url("${codiconFontUri}") format("truetype");
            }
          </style>
        </head>
        <body>
          <div id="root"></div>
          <script type="module" nonce="${nonce}" src="${scriptUri}"></script>
        </body>
      </html>
    `;
  }
  /**
   * Sets up an event listener to listen for messages passed from the webview context and
   * executes code based on the message that is recieved.
   *
   * @param webview A reference to the extension webview
   * @param context A reference to the extension context
   */
  private _setWebviewMessageListener(webview: Webview) {
    webview.onDidReceiveMessage(
      (message: any) => {
        const command = message.command;
        const text = message.text;
        const workspaceFolders = vscode.workspace.workspaceFolders;
        let workspaceFolderPath = "";
        if (workspaceFolders && workspaceFolders.length > 0) {
          const firstWorkspaceFolderUri = workspaceFolders[0].uri;
          workspaceFolderPath = vscode.Uri.parse(firstWorkspaceFolderUri.toString(true)).fsPath;
          // vscode.window.showInformationMessage("Current workspace root: " + workspaceFolderPath);
        } else {
          // vscode.window.showErrorMessage("No workspace folders found.");
        }
        const outputYamlFilePath = path.join(workspaceFolderPath, "output.yaml");

        switch (command) {
          case "hello":
            // Code that should run in response to the hello message command
            window.showInformationMessage(text);
            fs.writeFile(outputYamlFilePath, text, (err) => {
              if (err) {
                vscode.window.showErrorMessage("Failed to create output.yaml file: " + err.message);
              } else {
                vscode.window.showInformationMessage("output.yaml file created successfully.");
              }
            });
            return;
          // Add more switch case statements here as more webview message commands
          // are created within the webview context (i.e. inside media/main.js)
        }
      },
      undefined,
      this._disposables
    );
  }
  // private static _parseYaml(extensionUri: Uri) {
  //   const yamlUri = Uri.joinPath(extensionUri, "config.yml");
  //   // console.log("Im here!!!," + yamlUri.path);
  //   const yamlString = fs.readFileSync(yamlUri.path, "utf8");
  //   const data = yaml.parse(yamlString);
  //   return JSON.stringify(data);
  // }
}
