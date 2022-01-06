import Navbar from './Navbar';
import Ideas from './Ideas';
import NewIdea from './NewIdea';
import IdeaDetails from './IdeaDetails';
import AccountDetails from './AccountDetails';
import UserDetails from './UserDetails';
import Search from './Search';
import NotFound from './NotFound';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Ideas />
            </Route>
            <Route path="/ideas/new">
              <NewIdea />
            </Route>
            <Route path="/ideas/:idea">
              <IdeaDetails />
            </Route>
            <Route path="/users/account">
              <AccountDetails />
            </Route>
            <Route path="/users/:id">
              <UserDetails />
            </Route>
            <Route path="/search">
              <Search />
            </Route>
            <Route path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;
