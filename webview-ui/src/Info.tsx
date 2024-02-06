import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

interface InfoProps {
  entry: number;
}

export function Info(props: InfoProps) {
  const entry: number = props.entry;
  return (
    <section className="component-container">
      <section className="component-example">
        <VSCodeTextField className="passthrough-info" placeholder={entry.toString()}>
          Entry
        </VSCodeTextField>
        <VSCodeTextField className="passthrough-info" placeholder="2">
          Vcpu
        </VSCodeTextField>
      </section>
    </section>
  );
}
