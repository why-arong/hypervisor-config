import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";
import { useState, useEffect } from "react";
import { initialData } from "./data/initialData";
import { YamlContext } from "./context/YamlContext";
import { Title } from "./components/Title";

function App() {
  const [yamlData, setYamlData] = useState(initialData);
  const value = { yamlData, setYamlData };
  useEffect(() => {
    window.addEventListener("message", (event) => {
      const message = event.data;
      switch (message.command) {
        case "init":
          setYamlData(JSON.parse(message.data));
          break;
      }
    });
  }, []);
  return (
    <YamlContext.Provider value={value}>
      <main>
        <Title title={"Settings"}></Title>
        <Menu></Menu>
        <Host></Host>
        <PassThrough></PassThrough>
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
    </YamlContext.Provider>
  );
}

export default App;
