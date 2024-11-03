import { CustomProvider } from "rsuite";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Provider } from "react-redux";
import SearchPage from "./pages/search/search.page";

import fa from "rsuite/locales/fa_IR";
import store from "./redux/store";

import "rsuite/dist/rsuite-rtl.min.css";
import "./App.css";
import "./assets/fonts/ERPyb/ERPyb.css";
import "./assets/fonts/newiconpack/icon.css";
import "react-multi-date-picker/styles/layouts/mobile.css";
import { Toaster } from "react-hot-toast";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomProvider rtl locale={fa}>
          <SearchPage />
          <Toaster />
        </CustomProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;
