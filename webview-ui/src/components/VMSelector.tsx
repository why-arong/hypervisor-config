import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

interface VMSelectorProps {
  vmCount: number;
}
export function VMSelector({ vmCount }: VMSelectorProps) {
  return (
    <div className="vm-container">
      {Array.from({ length: vmCount }).map((_, index) => (
        <VSCodeButton className="vm-button" key={index}>
          VM {index}
        </VSCodeButton>
      ))}
      <VSCodeButton className="vm-button" key={"+"}>
        +
      </VSCodeButton>
    </div>
  );
}
