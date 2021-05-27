import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";

import "assets/plugins/nucleo/css/nucleo.css";
import "assets/scss/argon-dashboard-react.scss";
import "@fortawesome/fontawesome-free/css/all.min.css";

import Items from "pages/Items";

function App() {
  return (
    <div className="App">
      <Router>
        <Route exact path="/" component={Items} />
      </Router>
    </div>
  );
}

export default App;
