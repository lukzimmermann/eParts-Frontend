import "./App.css";
import "./index.css";
import App from "./App";
import React from "react";
import store from "./store/store";
import "primeicons/primeicons.css";
import { Provider } from "react-redux";
import ReactDOM from "react-dom/client";
import { PrimeReactProvider } from "primereact/api";
import "primereact/resources/themes/lara-dark-purple/theme.css";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <PrimeReactProvider value={{ unstyled: false }}>
        <App />
      </PrimeReactProvider>
    </Provider>
  </React.StrictMode>
);
