import { VSCodeDropdown, VSCodeOption, VSCodeButton } from "@vscode/webview-ui-toolkit/react";

export function DropdownDemo() {
  return (
    <section className="component-container">
      <h2>Host</h2>
      <section className="component-example">
        <div className="host-container">
          <div className="wrap-container">
            <div className="row-container">
              <p>Vendor</p>
              <VSCodeDropdown position="below">
                <VSCodeOption>ST</VSCodeOption>
                <VSCodeOption>Option Label #2</VSCodeOption>
                <VSCodeOption>Option Label #3</VSCodeOption>
              </VSCodeDropdown>
            </div>
            <div className="row-container">
              <p>Device</p>
              <VSCodeDropdown position="below">
                <VSCodeOption>SR6X7</VSCodeOption>
                <VSCodeOption>Option Label #2</VSCodeOption>
                <VSCodeOption>Option Label #3</VSCodeOption>
              </VSCodeDropdown>
            </div>
          </div>

          <div>
            <VSCodeButton appearance="secondary">Load</VSCodeButton>
          </div>
        </div>
      </section>
    </section>
  );
}
