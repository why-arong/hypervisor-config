import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";
import { vscode } from "./utilities/vscode";
import { useState, useEffect } from "react";
import { initialData } from "./data/initialData";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState(initialData);
  useEffect(() => {
    const messageHandler = (event: any) => {
      const message = event.data;
      setCount((prevCount) => prevCount + 1);
      setData((prevData) => {
        vscode.postMessage({
          command: "hello",
          text: message.data,
        });
        return message.data;
      });
    };

    window.addEventListener("message", messageHandler);

    return () => {
      // Cleanup event listener on component unmount
      window.removeEventListener("message", messageHandler);
    };
  }, [count]); // Include count in the dependencies to ensure the effect runs when count changes
  return (
    <main>
      <h1> Perseous </h1>
      <Menu></Menu>
      <Host></Host>
      <PassThrough yamlData={data}></PassThrough>
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
