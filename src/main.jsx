import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { Provider } from "react-redux";
import { store } from "./app/store.js";
import { Bounce, ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <App />
    <ToastContainer
      position="top-right"
      autoClose={3000}
      hideProgressBar={true}
      newestOnTop={false}
      closeOnClick={false}
      pauseOnFocusLoss
      draggable
      pauseOnHover
      theme="light"
      transition={Bounce}
      toastClassName="rounded-lg shadow-md !min-h-0 !h-10 text-sm"    />
  </Provider>,
);
