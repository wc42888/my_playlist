import React from 'react';
import { Provider } from 'react-redux';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from 'react-router-dom';
import { Login, PlayList } from './pages';
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
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>
    </Provider>
  );
}

export default App;
