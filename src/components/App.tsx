import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import LayoutContainer from "./layouts/LayoutContainer";
import CalculatorPage from "./pages/CalculatorPage";
import EditHistoryPage from "./pages/EditHistoryPage";
import EditPage from "./pages/EditPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => (
  <AppContextProvider>
    <BrowserRouter>
      <LayoutContainer>
        <Routes>
          <Route path="/edit" element={<EditPage />} />
          <Route path="/edit-history/:id" element={<EditHistoryPage />} />
          <Route path="/history" element={<HistoryPage />} />
          <Route path="/" element={<CalculatorPage />} />
        </Routes>
      </LayoutContainer>
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
