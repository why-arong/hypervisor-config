import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";

export function Devices() {
  return (
    <section className="component-container">
      <section className="component-example">
        <h3>Devices</h3>
        <div className="row-container">
          <div className="component-container">
            <VSCodeTextArea readOnly>Passthrough Devices</VSCodeTextArea>
          </div>
          <div className="component-container">
            <VSCodeTextArea readOnly>Virtual Devices</VSCodeTextArea>
          </div>
        </div>
      </section>
    </section>
  );
}
