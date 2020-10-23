import React from "react";
import { Switch } from "react-router-dom";

import Browse from "../pages/Browse";
import Playlist from "../pages/Playlist";
import SignIn from "../pages/SignIn";
import SignInSuccess from "../pages/SignInSuccess";
import Route from "./Route";

const Routes = () => (
  <Switch>
    <Route exact path="/" component={SignIn} />
    <Route exact path="/sign-in-success" component={SignInSuccess} />
    <Route path="/me" component={Browse} isPrivate />
    <Route path="/playlists/:id" component={Playlist} isPrivate />
  </Switch>
);

export default Routes;
