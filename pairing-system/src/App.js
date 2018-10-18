import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import addStudent from './components/addStudent'
import Pairing from './components/pairing'
import history from './components/history';


class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/" component={Home} />
          <Route path="/history" component={history} />
          <Route path="/pairing" component={Pairing} />
          <Route path="/addStudent" component={addStudent} />

        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;