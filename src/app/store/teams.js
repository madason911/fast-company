import { createAction, createSlice } from "@reduxjs/toolkit";
// import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import teamService from "../services/team.service";
import userService from "../services/user.service";
// import { generateAuthError } from "../utils/generateAuthError";
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
        // authRequestSuccess: (state, action) => {
        //     state.auth = action.payload;
        //     state.isLoggedIn = true;
        // },
        // authRequestFailed: (state, action) => {
        //     state.error = action.payload;
        // },
        // userCreated: (state, action) => {
        //     state.entities.push(action.payload);
        // },
        // userLoggedOut: (state, action) => {
        //     state.entities = null;
        //     state.isLoggedIn = false;
        //     state.auth = null;
        //     state.dataLoaded = false;
        // },
        // userUpdated: (state, action) => {
        //     state.entities[
        //         state.entities.findIndex((u) => u._id === action.payload._id)
        //     ] = action.payload;
        // },
        // authRequested: (state) => {
        //     state.error = null;
        // }
    }
});

const { reducer: usersReducer, actions } = usersSlice;
const {
    teamsRequested,
    teamsReceved,
    authRequestFailed,
    teamsRequestFailed,
    // authRequestSuccess,
    // userCreated,
    userLoggedOut,
    userUpdated
} = actions;

const authRequested = createAction("teams/authRequested");
const userCreateRequested = createAction("teams/userCreateRequested");
const userCreateFailed = createAction("teams/userCreateFailed");
const userUpdateRequested = createAction("teams/userUpdateRequested");
const userUpdateFailed = createAction("teams/userUpdateFailed");
// const userCardCreateRequested = createAction("teams/userCardCreateRequested");
// const userCardCreateFailed = createAction("teams/userCardCreateFailed");

// function createUserCard(payload) {
//     return async function (dispatch) {
//         dispatch(userCardCreateRequested());
//         try {

//         } catch (error) {
//             dispatch(userCardCreateFailed(error.message));
//         }
//     };
// }

// export const login =
//     ({ payload, redirect }) =>
//     async (dispatch) => {
//         const { email, password } = payload;
//         dispatch(authRequested());
//         try {
//             const data = await authService.login({ email, password });
//             dispatch(authRequestSuccess({ userId: data.localId }));
//             localStorageService.setTokens(data);
//             history.push(redirect);
//         } catch (error) {
//             const { code, message } = error.response.data.error;
//             if (code === 400) {
//                 const errorMessage = generateAuthError(message);
//                 dispatch(authRequestFailed(errorMessage));
//             } else {
//                 dispatch(authRequestFailed(error.message));
//             }
//         }
//     };

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

export const getCurrentUserData = () => (state) => {
    return state.teams.entities
        ? state.teams.entities.find((u) => u._id === state.teams.auth.userId)
        : null;
};

export const updateUserData = (data) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(data);
        dispatch(userUpdated(content));
        history.push(`/teams/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const getTeams = () => (state) => state.teams.entities;

export const getIsLoggedIn = () => (state) => state.teams.isLoggedIn;

export const getDataStatus = () => (state) => state.teams.dataStatus;

export const getCurrentUserId = () => (state) => state.teams.auth.userId;

export const getUsersLoadingStatus = () => (state) => state.teams.isLoading;

export const getAuthErrors = () => (state) => state.teams.error;

export default usersReducer;
