import { vscode } from "./utilities/vscode";
import { Info } from "./Info";
import { Memory } from "./demos/Memory";
import { Devices } from "./demos/Devices";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useEffect, useState } from "react";
import { VMSelector } from "./components/VMSelector";
interface PassThroughProps {
  configData: any;
}

export default function PassThrough({ configData }: PassThroughProps) {
  const [vmCount, setVMCount] = useState(configData.domains.length);
  const [selectedVM, setSelectedVM] = useState(0);
  // configData[`${vmCount}`];
  const configInfo = JSON.stringify(configData);
  const handleGenerator = () => {
    vscode.postMessage({
      command: "generate",
      configInfo,
    });
  };
  const handleVMClick = (vm: number) => {
    setSelectedVM(vm);
  };
  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <h4>VM {selectedVM}</h4>
      <div className="col-container">
        <div className="row-container">
          <VMSelector vmCount={vmCount} onVMClick={handleVMClick}></VMSelector>

          <div className="col-container vmWrapper">
            <Info entry={configData[`vm${selectedVM}`]["entry"]}></Info>
            <Memory vmMemory={configData[`vm${selectedVM}`]["memory"]}></Memory>
            <Devices></Devices>
          </div>
          {/* <PhysicalResources></PhysicalResources> */}
        </div>
        <VSCodeButton onClick={handleGenerator} className="generate-button" appearance="primary">
          Generate
        </VSCodeButton>
      </div>
    </div>
  );
}
