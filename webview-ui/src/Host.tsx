import { VSCodeDropdown, VSCodeOption, VSCodeButton } from "@vscode/webview-ui-toolkit/react";
import { useState, useContext } from "react";
import { YamlContext } from "./context/YamlContext";

const vendorOption = ["ST", "NXP"];

export function Host() {
  const { yamlData, setYamlData } = useContext(YamlContext);
  const [deviceOptions, setDeviceOptions] = useState(["SR6X7"]);
  const handleVendorChange = (event: any) => {
    const selectedValue = event.target.value;
    if (selectedValue === "ST") {
      setDeviceOptions(["SR6x7"]);
      setYamlData({ ...yamlData, vendor: "ST" });
    } else if (selectedValue === "NXP") {
      setDeviceOptions(["S32E270", "S32E275"]);
      setYamlData({ ...yamlData, vendor: "NXP" });
    }
  };
  return (
    <section className="component-container">
      <h2>Host</h2>
      <section className="component-example">
        <div className="host-container">
          <div className="wrap-container">
            <div className="row-container">
              <p>Vendor</p>
              <VSCodeDropdown onChange={handleVendorChange} position="below">
                {vendorOption.map((option, index) => (
                  <VSCodeOption key={index}>{option}</VSCodeOption>
                ))}
              </VSCodeDropdown>
            </div>
            <div className="row-container">
              <p>Device</p>
              <VSCodeDropdown position="below">
                {deviceOptions.map((option, index) => (
                  <VSCodeOption key={index}>{option}</VSCodeOption>
                ))}
              </VSCodeDropdown>
            </div>
          </div>

          <div>
            <VSCodeButton appearance="secondary">Load</VSCodeButton>
          </div>
        </div>
      </section>
    </section>
  );
}
