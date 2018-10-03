import React from "react";
import { Route, Switch } from "react-router-dom";

import App from "./App";
import Wall from './components/dash/components/home/Home';
import Page404 from "./components/page404/Page404";
import Tasks from "./components/dash/components/tasks/Tasks";

const AppRoutes = () => (
  <App>
    <Switch>
      <Route exact path="/" component={Wall} />
      <Route exact path="/tasks/" component={Tasks} />
      <Route component={Page404} />
    </Switch>
  </App>
);

export default AppRoutes;
