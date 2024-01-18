import { Host } from "./Host";
import "./App.css";
import "./codicon.css";
import Menu from "./Menu";
import PassThrough from "./PassThrough";

function App() {
  return (
    <main>
      <h1> Perseodasdasus</h1>
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
