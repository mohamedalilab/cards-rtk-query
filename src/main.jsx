import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { store } from "./app/store";
import App from "./App";
import { makeServer } from "./mocks/server"


// Start Mirage in both development and production
if (typeof window !== "undefined") {
  makeServer({
    environment: import.meta.env.PROD ? "production" : "development",
  })
}

const container = document.getElementById("root");

// check if root element is exist
if (container) {
  createRoot(container).render(
    <Provider store={store}>
      <App />
    </Provider>
  );
} else {
  throw new Error("Missing #root element in index.html");
}
