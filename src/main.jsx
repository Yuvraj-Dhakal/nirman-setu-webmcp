import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import "./index.css";
import AppRoutes from "./routes/AppRoutes";
import registerWebMCPTools from "./webmcp/projectTools";

async function initializeWebMCP() {
  try {
    const registered = await registerWebMCPTools();

    if (registered) {
      console.log("✅ NirmanSetu WebMCP tools registered successfully.");
    } else {
      console.log("ℹ️ WebMCP is not available in this browser.");
    }
  } catch (error) {
    console.warn("⚠️ WebMCP registration failed:", error);
  }
}

initializeWebMCP();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  </StrictMode>
);