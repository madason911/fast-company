import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import Players from "./layouts/players";
import Teams from "./layouts/teams";
import Login from "./layouts/login";
import CardForm from "./layouts/card-form";
import Main from "./layouts/main";
import News from "./layouts/news";
import Tournaments from "./layouts/tournaments";
import NavBar from "./components/ui/navBar";
import { ToastContainer } from "react-toastify";
import ProtectedRoute from "./components/common/protectedRoute";
import LogOut from "./layouts/logOut";
import AppLoader from "./components/ui/hoc/appLoader";
import Requests from "./layouts/requests";

const layoutStyle = {
    background: "#202136",
    minHeight: "100vh"
};

function App() {
    return (
        <div style={layoutStyle}>
            <AppLoader>
                <NavBar />

                <Switch>
                    <ProtectedRoute
                        path="/users/:userId?/:edit?"
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
                    <Route path="/request" exact component={Requests} />
                    <Route path="/tournaments" exact component={Tournaments} />
                    <Route path="/card/:type?" component={CardForm} />
                    <Redirect to="/" />
                </Switch>
            </AppLoader>
            <ToastContainer />
        </div>
    );
}

export default App;
