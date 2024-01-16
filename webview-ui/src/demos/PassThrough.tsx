import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

export function PassThrough() {
  return (
    <section className="component-container">
      <section className="component-example">
        <VSCodeTextField placeholder="Line 1">Entry</VSCodeTextField>
        <VSCodeTextField placeholder="2">Vcpu</VSCodeTextField>
      </section>
    </section>
  );
}
