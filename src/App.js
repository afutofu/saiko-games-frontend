import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import Navbar from "./container/Navbar/Navbar";
import FrontPage from "./pages/FrontPage/FrontPage";
import GamePage from "./pages/GamePage/GamePage";
import GameSearchPage from "./pages/GameSearchPage/GameSearchPage";

import styles from "./App.module.css";

const App = () => {
  return (
    <Router>
      <div className={styles.app}>
        <Navbar />
        <Switch>
          <Route path="/" exact component={FrontPage} />
          <Route path="/games" exact component={GameSearchPage} />
          <Route path="/games/:gameId" exact component={GamePage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
