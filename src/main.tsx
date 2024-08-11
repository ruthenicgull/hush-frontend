import ReactDOM from "react-dom/client";
import "./index.css";
import { ThemeProvider } from "@/components/theme/theme-provider";
import { RouterProvider } from "react-router-dom";
import router from "./router/router";
import { store } from "./app/store";
import { Provider } from "react-redux";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </Provider>
);
