import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Players from "./layouts/players";
import Teams from "./layouts/teams";
import Login from "./layouts/login";
import Main from "./layouts/main";
import News from "./layouts/news";
import Tournaments from "./layouts/tournaments";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";

function App() {
    return (
        <div>
            <AppLoader>
                <NavBar />

                <Switch>
                    <ProtectedRoute
                        path="/players/:playerId?/:edit?"
                        component={Players}
                    />
                    <ProtectedRoute
                        path="/teams/:teamId?/:edit?"
                        component={Teams}
                    />
                    <Route path="/login/:type?" component={Login} />
                    <Route path="/logout" component={LogOut} />
                    <Route path="/" exact component={Main} />
                    <Route path="/news" exact component={News} />
                    <Route path="/tournaments" exact component={Tournaments} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
