import { CustomProvider } from "rsuite";
import "rsuite/dist/rsuite-rtl.min.css";
import "./App.css";
import "./assets/fonts/ERPyb/ERPyb.css";
import "./assets/fonts/newiconpack/icon.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import SearchPage from "./components/pages/search/search.page";
import { Provider } from "react-redux";

import fa from "rsuite/locales/fa_IR";
import store from "./redux/store";

function App() {
  const queryClient = new QueryClient();
  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <CustomProvider rtl locale={fa}>
          <SearchPage />
        </CustomProvider>
      </QueryClientProvider>
    </Provider>
  );
}

export default App;