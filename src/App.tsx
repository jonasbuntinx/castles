import * as React from "react";
import { render } from "react-dom";
import { Home } from "~/Pages/Home";

function app(): void {
  render(
    <React.StrictMode>
      <Home />
    </React.StrictMode>,
    document.getElementById("app")
  );
}

export { app };
