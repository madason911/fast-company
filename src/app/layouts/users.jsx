import React, { useEffect } from "react";
import { useParams, useHistory } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import UserPage from "../components/page/userPage";
import UsersListPage from "../components/page/usersListPage";
import { useAuth } from "../hooks/useAuth";
import UserProvider from "../hooks/useUsers";
const Users = () => {
    const params = useParams();
    const history = useHistory();
    const { currentUser } = useAuth();
    const { userId, edit } = params;
    // if (edit && userId !== currentUser._id) {
    //     console.log(history.location.pathname);
    //     // history.push(history.location.pathname + "/edit");
    // }
    useEffect(() => {
        if (edit && userId !== currentUser._id) {
            // console.log(history.location);
            history.push("/users/" + currentUser._id + "/edit");
        }
    }, []);
    return (
        <>
            <UserProvider>
                {userId ? (
                    edit ? (
                        <EditUserPage />
                    ) : (
                        <UserPage userId={userId} />
                    )
                ) : (
                    <UsersListPage />
                )}
            </UserProvider>
        </>
    );
};

export default Users;
