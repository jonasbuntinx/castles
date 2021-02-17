import * as React from "react";
import { render } from "react-dom";
import { Root } from "~/Components/Root";

function app(): void {
  render(
    <React.StrictMode>
      <Root />
    </React.StrictMode>,
    document.getElementById("root")
  );
}

export { app };
