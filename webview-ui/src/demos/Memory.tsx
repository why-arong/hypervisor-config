import { VSCodeTextArea } from "@vscode/webview-ui-toolkit/react";
import { useState } from "react";

type MemoryInfo = Array<[number, number]>;
interface MemoryProps {
  vmMemory: MemoryInfo;
  onMemoryChange: (data: any) => void;
}

// current memory는 2차원 배열로 구성되어 있음
// ex) [ [0x28080000, 0x40000], [0x60000000, 0x20000] ]
//TODO: https://react-ko.dev/learn/updating-arrays-in-state
export function Memory({ vmMemory, onMemoryChange }: MemoryProps) {
  const [currentMemory, setCurrentMemory] = useState(vmMemory);
  const handleCurrentMemory = (event: any, rowIndex: number) => {
    const value = event.target.value;
    const memory = value.split("\n").map((str_num: string) => parseInt(str_num, 10));
    const memoryArray = currentMemory.map((item: [number, number], itemIndex: number) =>
      itemIndex === rowIndex ? memory : item
    );
    setCurrentMemory(memoryArray);
    onMemoryChange(memoryArray);
  };

  return (
    <section className="component-container">
      <section className="component-example">
        <h3>Memory</h3>
        <div className="row-container">
          <div className="component-container">
            <div className="row-container">
              {vmMemory.map((row, rowIndex) => (
                <VSCodeTextArea
                  onChange={(event) => handleCurrentMemory(event, rowIndex)}
                  key={`${rowIndex}`}
                  value={`${row[0]}\n${row[1]}`}></VSCodeTextArea>
              ))}
              <VSCodeTextArea readOnly value=""></VSCodeTextArea>
              <VSCodeTextArea readOnly value=""></VSCodeTextArea>
            </div>
          </div>
        </div>
      </section>
    </section>
  );
}
