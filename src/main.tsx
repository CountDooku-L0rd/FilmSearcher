import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Providers from "./components/Providers/Providers.tsx";
import { BrowserRouter } from "react-router";

createRoot(document.getElementById("root")!).render(
  <BrowserRouter>
    <Providers>
      <App />
    </Providers>
    ,
  </BrowserRouter>,
);
