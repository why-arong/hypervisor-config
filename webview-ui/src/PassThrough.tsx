import { vscode } from "./utilities/vscode";
import { Info } from "./Info";
import { Memory } from "./demos/Memory";
import { Devices } from "./demos/Devices";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";

interface PassThroughProps {
  yamlData: string;
}

export default function PassThrough(props: PassThroughProps) {
  const yamlData1: string = props.yamlData;
  // const a = `{"soc":"sr6x7","revision":0,"gic":{"name":"gicv3","region":[1837105152,1048576]},"uart0":{"name":"uart","region":[305419896,2271560481],"interrupt":[3]},"vm0":{"name":"VM0","entry":671612928,"cluster":0,"core":[[0,128]],"memory":[[671612928,262144],[1610612736,131072]],"devices":[{"name":"gicv3","region":[1837105152,1048576]},{"name":"uart","region":[305419896,2271560481],"interrupt":[3]}]},"vm1":{"name":"VM1","entry":671875072,"cluster":0,"core":[[0,128]],"memory":[[671875072,262144],[1610874880,131072]]},"domains":[{"name":"VM0","entry":671612928,"cluster":0,"core":[[0,128]],"memory":[[671612928,262144],[1610612736,131072]],"devices":[{"name":"gicv3","region":[1837105152,1048576]},{"name":"uart","region":[305419896,2271560481],"interrupt":[3]}]},{"name":"VM1","entry":671875072,"cluster":0,"core":[[0,128]],"memory":[[671875072,262144],[1610874880,131072]]}]}`;
  const dataObj = JSON.parse(yamlData1);
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: dataObj.soc,
    });
  }
  return (
    <div className="component-container">
      <h2>Passthrough</h2>
      <div className="col-container">
        <div className="row-container">
          <div className="col-container">
            <Info entry={dataObj.vm0.entry}></Info>
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
