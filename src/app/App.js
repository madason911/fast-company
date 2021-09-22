import React from "react";
import Login from "./components/login";
import Main from "./components/main";
import Users from "./components/users";
import { Switch, Route } from "react-router-dom";
import NavBar from "./components/navBar";
import UserPage from "./components/userPage";

function App() {
    const user = {
        name: "Гаджи"
    };
    return (
        <div>
            <NavBar />
            <Switch>
                <Route path="/" exact component={Main} />
                <Route
                    path="/users/:userId"
                    exact
                    render={() => <UserPage user={user} />}
                />
                <Route path="/users" exact component={Users} />
                <Route path="/login" component={Login} />
            </Switch>
        </div>
    );
}

export default App;
