import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import usersReducer from "./users";
import teamsReducer from "./teams";

const rootReducer = combineReducers({
    users: usersReducer,
    teams: teamsReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
