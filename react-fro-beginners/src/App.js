import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import MovieHome from "./movie/routes/MovieHomejs";
function App() {
  return (
    <Router>
      <Switch>
        <Route path="/">
          <MovieHome />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
