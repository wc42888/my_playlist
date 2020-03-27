import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Login, PlayList, Redirect } from './pages';
import store from './store';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Switch>
          <Route path="/playlist" exact>
            <PlayList />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="*">
            <Redirect />
          </Route>
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
