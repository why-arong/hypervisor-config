import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";

interface InfoProps {
  entry: string;
}

export function Info(props: InfoProps) {
  const entry: string = props.entry;
  return (
    <section className="component-container">
      <section className="component-example">
        <VSCodeTextField className="passthrough-info" placeholder={entry}>
          Entry
        </VSCodeTextField>
        <VSCodeTextField className="passthrough-info" placeholder="2">
          Vcpu
        </VSCodeTextField>
      </section>
    </section>
  );
}
