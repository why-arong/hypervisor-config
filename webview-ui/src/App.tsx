import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";
import { useState, useEffect } from "react";
import { initialData } from "./data/initialData";
import { Title } from "./components/Title";

function App() {
  const [configData, setConfigData] = useState(initialData);
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      switch (message.command) {
        case "init":
          setConfigData(JSON.parse(message.data));
          break;
      }
    });
  }, []);
  const handleConfigData = (data: any) => {
    setConfigData({ ...configData, ...data });
  };

  return (
    <main>
      <Title title={"Settings"}></Title>
      <Menu></Menu>
      <Host onVendorClick={handleConfigData} configData={configData}></Host>
      <PassThrough setConfigData={setConfigData} configData={configData}></PassThrough>
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
