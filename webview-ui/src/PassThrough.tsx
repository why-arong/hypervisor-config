import { vscode } from "./utilities/vscode";
import { Info } from "./Info";
import { Memory } from "./demos/Memory";
import { Devices } from "./demos/Devices";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
// import * as vscode from "vscode";
import { useContext } from "react";
import { YamlContext } from "./YamlContext";

export default function PassThrough() {
  const yamlData = useContext(YamlContext);
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: yamlData.soc,
    });
  }

  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <div className="col-container">
        <div className="row-container">
          <div className="col-container">
            <Info entry={yamlData.vm0.entry}></Info>
            <Memory></Memory>
            <Devices></Devices>
          </div>
          <PhysicalResources></PhysicalResources>
        </div>

        <VSCodeButton onClick={handleHowdyClick} className="generate-button" appearance="primary">
          Generate
        </VSCodeButton>
      </div>
    </div>
  );
}
