import React from "react";
import DonationPage from "./DonationPage";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import LandingPage from "./LandingPage";

export default function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/" exact render={() => <LandingPage />} />
        <Route path="/donation" render={() => <DonationPage />} />
        <Route path="/:id" render={() => <div>404 Page not Found</div>} />
      </Switch>
    </BrowserRouter>
  );
}
