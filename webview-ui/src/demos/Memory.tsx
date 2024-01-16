import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";

export function Memory() {
  return (
    <section className="component-container">
      <section className="component-example">
        <h3>Memory</h3>
        <div className="row-container">
          <div className="component-container">
            <VSCodeTextArea readOnly>0x100000000</VSCodeTextArea>
          </div>
        </div>
      </section>
    </section>
  );
}
