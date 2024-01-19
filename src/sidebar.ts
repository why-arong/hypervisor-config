import * as vscode from "vscode";

export class VMSideBar implements vscode.TreeDataProvider<vscode.TreeItem> {
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
    // If element is undefined, it means it's the root of the tree
    if (!element) {
      return [
        new vscode.TreeItem("VM0"),
        new vscode.TreeItem("VM1"),
        // Add more items as needed
      ];
    }

    // You can handle child items for a specific parent here if needed

    return [];
  }
}
