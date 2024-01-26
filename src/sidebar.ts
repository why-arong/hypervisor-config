import * as vscode from "vscode";

export class VMSideBar implements vscode.TreeDataProvider<vscode.TreeItem> {
  private vmConfig: any;

  constructor(vmConfig: any) {
    this.vmConfig = vmConfig;
  }
  getTreeItem(element: vscode.TreeItem): vscode.TreeItem {
    return element;
  }

  getChildren(element?: vscode.TreeItem): vscode.ProviderResult<vscode.TreeItem[]> {
    // If element is undefined, it means it's the root of the tree
    if (!element) {
      // if (this.vmConfig && this.vmConfig.vm0 && this.vmConfig.vm0.name) {
      //   return [new vscode.TreeItem(this.vmConfig.vm0.name)];
      // }

      const map1 =
        "[" + this.vmConfig.memory[0].map((x: number) => "0X" + x.toString(16)).toString() + "]";
      const map2 =
        "[" + this.vmConfig.memory[1].map((x: number) => "0X" + x.toString(16)).toString() + "]";
      return [new vscode.TreeItem(map1), new vscode.TreeItem(map2)];
    }

    // You can handle child items for a specific parent here if needed

    return [];
  }
}
