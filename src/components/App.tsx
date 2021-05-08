import { BrowserRouter, Route, Switch } from "react-router-dom";
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
        <Switch>
          <Route exact path="/edit" component={EditPage} />
          <Route exact path="/edit-history/:id" component={EditHistoryPage} />
          <Route exact path="/history" component={HistoryPage} />
          <Route path="/" component={CalculatorPage} />
        </Switch>
      </LayoutContainer>
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
