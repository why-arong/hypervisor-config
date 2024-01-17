import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";

export function Memory() {
  return (
    <section className="component-container">
      <section className="component-example">
        <h3>Memory</h3>
        <div className="row-container">
          <div className="component-container">
            <div className="row-container">
              <VSCodeTextArea
                readOnly
                placeholder="0x100000000
            0x200000000"></VSCodeTextArea>
              <VSCodeTextArea
                readOnly
                placeholder="0x300000000
            0x380000000"></VSCodeTextArea>
              <VSCodeTextArea readOnly placeholder=""></VSCodeTextArea>
              <VSCodeTextArea readOnly placeholder=""></VSCodeTextArea>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
