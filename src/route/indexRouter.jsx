import React from "react";
import { HashRouter, Redirect, Route, Switch } from "react-router-dom";
import NewsSandBox from "./../views/sandbox/NewsSandBox";
import Login from "./../views/Login/Login";

function indexRouter() {
  return (
    <HashRouter>
      <Switch>
        <Route path="/login" component={Login} />
        {/* <Route path="/" component={NewsSandBox} />*/}
        <Route
          path="/"
          render={() =>
            localStorage.getItem("token") ? (
              <NewsSandBox />
            ) : (
              <Redirect to="/login" />
            )
          }
        />
      </Switch>
    </HashRouter>
  );
}

export default indexRouter;
