import {
  VSCodeDataGrid,
  VSCodeDataGridCell,
  VSCodeDataGridRow,
} from "@vscode/webview-ui-toolkit/react";

export function PhysicalResources() {
  const rowData = [{ cell1: "UART" }, { cell1: "I2C" }, { cell1: "SPI" }, { cell1: "MMC" }];

  return (
    <section className="physical-resources">
      <VSCodeDataGrid aria-label="With Custom Titles">
        <VSCodeDataGridRow row-type="header">
          <VSCodeDataGridCell cell-type="columnheader" grid-column="1">
            Physical Resources
          </VSCodeDataGridCell>
        </VSCodeDataGridRow>
        {rowData.map((row) => (
          <VSCodeDataGridRow>
            <VSCodeDataGridCell grid-column="1">{row.cell1}</VSCodeDataGridCell>
          </VSCodeDataGridRow>
        ))}
      </VSCodeDataGrid>
    </section>
  );
}
