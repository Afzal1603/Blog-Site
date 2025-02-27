import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import ThemeProvider from "./Component/ThemeProvider";

createRoot(document.getElementById("root")).render(
  <PersistGate persistor={persistor}>
    <BrowserRouter>
      <Provider store={store}>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
  </PersistGate>
);
