import { combineReducers, configureStore } from "@reduxjs/toolkit";
import commentsReducer from "./comments";
import professionsReducer from "./professions";
import qualitiesReducer from "./qualities";
import usersReducer from "./users";
import teamsReducer from "./teams";

const rootReducer = combineReducers({
    qualities: qualitiesReducer,
    professions: professionsReducer,
    users: usersReducer,
    teams: teamsReducer,
    comments: commentsReducer
});

export function createStore() {
    return configureStore({
        reducer: rootReducer
    });
}
