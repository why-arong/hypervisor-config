import { VSCodeTextField } from "@vscode/webview-ui-toolkit/react";
import { useState } from "react";

interface InfoProps {
  onEntryChange: (entry: number) => void;
  entry: number;
}

export function Info({ onEntryChange, entry }: InfoProps) {
  const handleCurrentEntry = (event: any) => {
    onEntryChange(parseInt(event.target.value, 10));
  };
  return (
    <section className="component-container">
      <section className="component-example">
        <VSCodeTextField
          onChange={handleCurrentEntry}
          className="passthrough-info"
          value={entry.toString()}>
          Entry
        </VSCodeTextField>
        <VSCodeTextField className="passthrough-info" placeholder="2">
          Vcpu
        </VSCodeTextField>
      </section>
    </section>
  );
}
