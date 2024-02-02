import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";
import { vscode } from "./utilities/vscode";

function App() {
  window.addEventListener("message", (event) => {
    const message = event.data; // The JSON data our extension sent
    vscode.postMessage({
      command: "hello",
      text: "Hey there perseous! 😄",
    });
  });
  return (
    <main>
      <h1> Perseous </h1>
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
  );
}

export default App;
