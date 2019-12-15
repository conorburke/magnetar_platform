import React from "react";
import "./App.css";

import { BrowserRouter, Route } from "react-router-dom";

import Header from "./components/Header";
import Home from "./components/Home";
import Users from "./components/Users";
import Tools from "./components/Tools";
import Profile from "./components/Profile";

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className="App">
        <Header />
        <Route exact path="/" component={Home} />
        <Route exact path="/users" component={Users} />
        <Route exact path="/tools" component={Tools} />
        <Route exact path="/profile" component={Profile} />
      </div>
    </BrowserRouter>
  );
};

export default App;
