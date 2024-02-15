import { vscode } from "./utilities/vscode";
import { Info } from "./Info";
import { Memory } from "./demos/Memory";
import { Devices } from "./demos/Devices";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
// import * as vscode from "vscode";
import { useContext } from "react";
import { YamlContext } from "./context/YamlContext";
import { useState } from "react";
import { VMSelector } from "./components/VMSelector";

export default function PassThrough() {
  const { yamlData, setYamlData } = useContext(YamlContext);
  const [vmCount, setVMCount] = useState(yamlData.domains.length);

  const configInfo = JSON.stringify(yamlData);
  const handleGenerator = () => {
    vscode.postMessage({
      command: "generate",
      configInfo,
    });
  };

  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <div className="col-container">
        <div className="row-container">
          <VMSelector vmCount={vmCount}></VMSelector>

          <div className="col-container vmWrapper">
            <Info entry={yamlData.vm0.entry}></Info>
            <Memory></Memory>
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
