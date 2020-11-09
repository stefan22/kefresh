import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import ReactDOM from 'react-dom';
import App from './ui/App';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route exact path={ '/' } component={ App } />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
