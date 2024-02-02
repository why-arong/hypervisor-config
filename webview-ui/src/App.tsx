import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";
import { vscode } from "./utilities/vscode";
import fs from "fs";
import yaml from "yaml";

import React, { useState, useEffect } from "react";
import { set } from "yaml/dist/schema/yaml-1.1/set";

function App() {
  const [count, setCount] = useState(0);
  const [data, setData] = useState("abc");
  useEffect(() => {
    const messageHandler = (event: any) => {
      const message = event.data;
      setCount((prevCount) => prevCount + 1);
      setData((prevData) => {
        vscode.postMessage({
          command: "hello",
          text: prevData,
        });
        return message.path;
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
      <PassThrough data={data}></PassThrough>
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
