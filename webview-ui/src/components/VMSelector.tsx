import React, { useState } from "react";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

interface VMSelectorProps {
  vmCount: number;
  onVMClick: (vm: number) => void;
}

export function VMSelector({ vmCount, onVMClick }: VMSelectorProps) {
  const [vmButtons, setVmButtons] = useState(Array.from({ length: vmCount }, (_, index) => index));

  const addVM = () => {
    setVmButtons([...vmButtons, vmButtons.length + 1]);
  };

  const removeVM = () => {
    if (vmButtons.length > 0) {
      const updatedButtons = [...vmButtons];
      updatedButtons.pop();
      setVmButtons(updatedButtons);
    }
  };
  return (
    <div className="vm-container">
      <VSCodeButton
        className="vm-button"
        onClick={removeVM}
        key={"-"}
        disabled={vmButtons.length === 0}>
        -
      </VSCodeButton>
      {vmButtons.map((index) => (
        <VSCodeButton className="vm-button" key={index} onClick={() => onVMClick(index)}>
          VM {index}
        </VSCodeButton>
      ))}

      <VSCodeButton className="vm-button" onClick={addVM} key={"+"}>
        +
      </VSCodeButton>
    </div>
  );
}
