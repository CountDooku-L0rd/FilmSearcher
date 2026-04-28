import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import type { ReactNode } from "react";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <PrimeReactProvider>{children}</PrimeReactProvider>
    </Provider>
  );
};

export default Providers;
