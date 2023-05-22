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
        usersRequested: (state) => {
            state.isLoading = true;
        },
        usersReceved: (state, action) => {
            state.entities = action.payload;
            state.dataStatus = true;
            state.isLoading = false;
        },
        usersRequestFailed: (state, action) => {
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
    usersRequested,
    usersReceved,
    authRequestFailed,
    usersRequestFailed,
    // authRequestSuccess,
    // userCreated,
    userLoggedOut,
    userUpdated
} = actions;

const authRequested = createAction("users/authRequested");
const userCreateRequested = createAction("users/userCreateRequested");
const userCreateFailed = createAction("users/userCreateFailed");
const userUpdateRequested = createAction("users/userUpdateRequested");
const userUpdateFailed = createAction("users/userUpdateFailed");
// const userCardCreateRequested = createAction("users/userCardCreateRequested");
// const userCardCreateFailed = createAction("users/userCardCreateFailed");

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
            history.push("/users");
        } catch (error) {
            dispatch(userCreateFailed(error.message));
        }
    };
}

export const loadUsersList = () => async (dispatch, getState) => {
    dispatch(usersRequested());
    try {
        const { content } = await userService.get();
        dispatch(usersReceved(content));
    } catch (error) {
        dispatch(usersRequestFailed(error.message));
    }
};

export const getUserById = (id) => (state) => {
    if (state.users.entities) {
        return state.users.entities.find((u) => u._id === id);
    }
};

export const getCurrentUserData = () => (state) => {
    return state.users.entities
        ? state.users.entities.find((u) => u._id === state.users.auth.userId)
        : null;
};

export const updateUserData = (data) => async (dispatch) => {
    dispatch(userUpdateRequested());
    try {
        const { content } = await userService.update(data);
        dispatch(userUpdated(content));
        history.push(`/users/${content._id}`);
    } catch (error) {
        dispatch(userUpdateFailed(error.message));
    }
};

export const logOut = () => (dispatch) => {
    localStorageService.removeAuthData();
    dispatch(userLoggedOut());
    history.push("/");
};

export const getUsers = () => (state) => state.users.entities;

export const getIsLoggedIn = () => (state) => state.users.isLoggedIn;

export const getDataStatus = () => (state) => state.users.dataStatus;

export const getCurrentUserId = () => (state) => state.users.auth.userId;

export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export const getAuthErrors = () => (state) => state.users.error;

export default usersReducer;
