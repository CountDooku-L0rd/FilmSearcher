import { PrimeReactProvider } from "primereact/api";
import { Provider } from "react-redux";
import { store } from "../../store/store";
import type { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../../FilmsApi/queryClient";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PrimeReactProvider>{children}</PrimeReactProvider>
      </QueryClientProvider>
    </Provider>
  );
};

export default Providers;
