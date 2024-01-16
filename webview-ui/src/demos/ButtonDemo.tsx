import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

export function ButtonDemo() {
  return (
    <section className="component-container">
      <div className="menu">
        <VSCodeButton appearance="primary">Deployment</VSCodeButton>
        <VSCodeButton appearance="primary">Monitoring</VSCodeButton>
        <VSCodeButton appearance="primary">Console</VSCodeButton>
        <VSCodeButton appearance="primary">Tools</VSCodeButton>
        <VSCodeButton appearance="primary">Console</VSCodeButton>
        <VSCodeButton appearance="primary">Settings</VSCodeButton>
      </div>
    </section>
  );
}
