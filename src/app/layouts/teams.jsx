import React from "react";
import { useSelector } from "react-redux";
import { useParams, Redirect } from "react-router-dom";
import EditUserPage from "../components/page/editUserPage";
import TeamsListPage from "../components/page/teamsListPage";
import UsersLoader from "../components/ui/hoc/usersLoader";
import { getCurrentUserId } from "../store/users";
import TeamPage from "../components/page/teamPage/teamPage";
const Users = () => {
    const params = useParams();
    const { teamId, edit } = params;
    const currentTeamId = useSelector(getCurrentUserId());
    return (
        <div className="page container bg-opacity-100">
            <UsersLoader>
                {teamId ? (
                    edit ? (
                        teamId === currentTeamId ? (
                            <EditUserPage />
                        ) : (
                            <Redirect to={`/teams/${teamId}/edit`} />
                        )
                    ) : (
                        <TeamPage teamId={teamId} />
                    )
                ) : (
                    <TeamsListPage />
                )}
            </UsersLoader>
        </div>
    );
};

export default Users;
