import { vscode } from "./utilities/vscode";
import { Info } from "./Info";
import { Memory } from "./demos/Memory";
import { Devices } from "./demos/Devices";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

interface PassThroughProps {
  data: string;
}

export default function PassThrough(props: PassThroughProps) {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: props.data,
    });
  }
  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <div className="col-container">
        <div className="row-container">
          <div className="col-container">
            <Info></Info>
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
