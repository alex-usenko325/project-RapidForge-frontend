import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import { BrowserRouter } from "react-router-dom";
import { store, persistor } from "./redux/store";
import { Toaster } from "react-hot-toast";
import { CssBaseline, ThemeProvider, CircularProgress } from "@mui/material";
import App from "./App.jsx";
import "modern-normalize";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <PersistGate loading={<CircularProgress />} persistor={persistor}>
          <App />
        </PersistGate>
        <Toaster position="top-right" toastOptions={{ duration: 2000 }} />
      </ThemeProvider>
    </BrowserRouter>
  </Provider>
);
