import { createAction, createSlice } from "@reduxjs/toolkit";
import localStorageService from "../services/localStorage.service";
import teamService from "../services/team.service";
import userService from "../services/user.service";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
    ? {
          entities: null,
          isLoading: true,
          error: null,
          auth: { userId: localStorageService.getUserId() },
          isLoggedIn: true,
          dataStatus: false
      }
    : {
          entities: null,
          isLoading: false,
          error: null,
          auth: null,
          isLoggedIn: false,
          dataStatus: false
      };

const usersSlice = createSlice({
    name: "teams",
    initialState,
    reducers: {
        teamsRequested: (state) => {
            state.isLoading = true;
        },
        teamsReceved: (state, action) => {
            state.entities = action.payload;
            state.dataStatus = true;
            state.isLoading = false;
        },
        teamsRequestFailed: (state, action) => {
            state.error = action.payload;
            state.isLoading = false;
        }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    teamsRequested,
    teamsReceved,
    authRequestFailed,
    teamsRequestFailed,
    userLoggedOut,
    userUpdated
} = actions;

const authRequested = createAction("teams/authRequested");
const userCreateRequested = createAction("teams/userCreateRequested");
const userCreateFailed = createAction("teams/userCreateFailed");
const userUpdateRequested = createAction("teams/userUpdateRequested");
const userUpdateFailed = createAction("teams/userUpdateFailed");

export const createTeamCard =
    ({ ...rest }) =>
    async (dispatch) => {
        dispatch(authRequested());
        try {
            dispatch(
                createTeam({
                    ...rest
                })
            );
        } catch (error) {
            dispatch(authRequestFailed(error.message));
        }
    };

function createTeam(payload) {
    return async function (dispatch) {
        dispatch(userCreateRequested());
        try {
            await teamService.create(payload);
            history.push("/teams");
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
}

export const loadTeamsList = () => async (dispatch, getState) => {
    dispatch(teamsRequested());
    try {
        const { content } = await teamService.get();
        dispatch(teamsReceved(content));
    } catch (error) {
        dispatch(teamsRequestFailed(error.message));
    }
};

export const getTeamsForUser = (id) => (state) => {
    if (state.teams.entities) {
        return state.teams.entities.filter((u) => u.leader === id);
    }
};

export const getTeams = () => (state) => state.teams.entities;

export default usersReducer;
