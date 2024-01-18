import { BadgeDemo } from "./demos/BadgeDemo";
import { ButtonDemo } from "./demos/ButtonDemo";
import { CheckboxDemo } from "./demos/CheckboxDemo";
import { DataGridDemo } from "./demos/DataGridDemo";
import { DividerDemo } from "./demos/DividerDemo";
import { DropdownDemo } from "./demos/DropdownDemo";
import { LinkDemo } from "./demos/LinkDemo";
import { PanelsDemo } from "./demos/PanelsDemo";
import { ProgressRingDemo } from "./demos/ProgressRingDemo";
import { RadioGroupDemo } from "./demos/RadioGroupDemo";
import { TagDemo } from "./demos/TagDemo";
import { TextAreaDemo } from "./demos/TextAreaDemo";
import { TextFieldDemo } from "./demos/TextFieldDemo";
import { PassThrough } from "./demos/PassThrough";
import { Devices } from "./demos/Devices";
import { Memory } from "./demos/Memory";
import { PhysicalResources } from "./demos/PhysicalResources";
import { VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { vscode } from "./utilities/vscode";

import "./App.css";
import "./codicon.css";

function App() {
  function handleHowdyClick() {
    vscode.postMessage({
      command: "hello",
      text: "Hey there perseous! 😄",
    });
  }
  return (
    <main>
      <h1> Perseodasdasus</h1>
      <ButtonDemo></ButtonDemo>
      <DropdownDemo></DropdownDemo>
      <div className="component-container">
        <h2>Passthrough</h2>
        <div className="col-container">
          <div className="row-container">
            <div className="col-container">
              <PassThrough></PassThrough>
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
      {/* <section className="component-row">
        <DividerDemo></DividerDemo>
        <LinkDemo></LinkDemo>
      </section>
      <section id="panels-row">
        <PanelsDemo></PanelsDemo>
      </section>
      <section className="component-row">
        <ProgressRingDemo></ProgressRingDemo>
        <RadioGroupDemo></RadioGroupDemo>
        <TagDemo></TagDemo>
      </section>
      <section className="component-row">
        <TextAreaDemo></TextAreaDemo>
        <TextFieldDemo></TextFieldDemo>
      </section> */}
    </main>
  );
}

export default App;
