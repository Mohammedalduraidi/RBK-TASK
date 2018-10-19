import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import Home from './components/home';
import Pairing from './components/pairing'
import history from './components/history';
import AddStudent from "./components/addStudent"
import SimpleModal from './components/alo'
class App extends Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/history" component={history} />
          <Route path="/pairing" component={Pairing} />
          <Route path="/addStudent" component={AddStudent} />
          <Route path="/" component={Home} />

        </Switch>
      </BrowserRouter>

    );
  }
}

export default App;