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
  setConfigData: (data: any) => void;
}

export default function PassThrough({ configData, setConfigData }: PassThroughProps) {
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
  const handleMemorySettings = (vmMemory: [[number, number]]) => {
    const vmKey = `vm${selectedVM}`;
    setConfigData({
      ...configData,
      [vmKey]: {
        ...configData[vmKey],
        memory: vmMemory,
      },
    });
  };
  const handleEntry = (entry: number) => {
    const vmKey = `vm${selectedVM}`;
    setConfigData({
      ...configData,
      [vmKey]: {
        ...configData[vmKey],
        entry,
      },
    });
  };
  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <h4>VM {selectedVM}</h4>
      <div className="col-container">
        <div className="row-container">
          <VMSelector vmCount={configData.domains.length} onVMClick={handleVMClick}></VMSelector>

          <div className="col-container vmWrapper">
            <Info onEntryChange={handleEntry} entry={configData[`vm${selectedVM}`]["entry"]}></Info>
            <Memory
              onMemoryChange={handleMemorySettings}
              vmMemory={configData[`vm${selectedVM}`]["memory"]}></Memory>
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
