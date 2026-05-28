import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router";
import { Toaster } from "sonner";
import { useThemeStore } from "./stores/themeStore";

import "./index.css";
import App from "./App.jsx";

useThemeStore.getState().initTheme();

createRoot(document.getElementById("root")).render(
  <BrowserRouter basename={import.meta.env.BASE_URL}>
    <App />
    <Toaster richColors position="top-right" closeButton expand />
  </BrowserRouter>
);
