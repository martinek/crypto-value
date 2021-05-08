import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import LayoutContainer from "./layouts/LayoutContainer";
import CalculatorPage from "./pages/CalculatorPage";
import EditorPage from "./pages/EditorPage";
import HistoryPage from "./pages/HistoryPage";

const App = () => (
  <AppContextProvider>
    <BrowserRouter>
      <LayoutContainer>
        <Switch>
          <Route exact path="/edit" component={EditorPage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route path="/" component={CalculatorPage} />
        </Switch>
      </LayoutContainer>
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
