import { Switch, Route, BrowserRouter } from "react-router-dom";
import { AppContextProvider } from "./AppContext";
import LayoutContainer from "./layouts/LayoutContainer";
import Calculator from "./pages/Calculator";
import Editor from "./pages/Editor";

const App = () => (
  <AppContextProvider>
    <BrowserRouter>
      <LayoutContainer>
        <Switch>
          <Route exact path="/edit" component={Editor} />
          <Route path="/" component={Calculator} />
        </Switch>
      </LayoutContainer>
    </BrowserRouter>
  </AppContextProvider>
);

export default App;
