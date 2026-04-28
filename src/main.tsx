import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import Providers from "./components/Providers/Providers.tsx";

createRoot(document.getElementById("root")!).render(
  <Providers>
    <App />
  </Providers>,
);
