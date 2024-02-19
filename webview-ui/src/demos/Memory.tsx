import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";

type MemoryInfo = Array<[number, number]>;
interface MemoryProps {
  vmMemory: MemoryInfo;
}

export function Memory({ vmMemory }: MemoryProps) {
  return (
    <section className="component-container">
      <section className="component-example">
        <h3>Memory</h3>
        <div className="row-container">
          <div className="component-container">
            <div className="row-container">
              <VSCodeTextArea
                readOnly
                placeholder={`${vmMemory[0][0]}\n${vmMemory[0][1]}`}></VSCodeTextArea>
              <VSCodeTextArea
                readOnly
                placeholder={`${vmMemory[1][0]}\n${vmMemory[1][1]}`}></VSCodeTextArea>
              <VSCodeTextArea readOnly placeholder=""></VSCodeTextArea>
              <VSCodeTextArea readOnly placeholder=""></VSCodeTextArea>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
