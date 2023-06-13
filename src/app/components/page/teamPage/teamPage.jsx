import React from "react";
import PropTypes from "prop-types";
import Comments from "../../ui/comments";
import { useSelector } from "react-redux";
import { getTeamById } from "../../../store/teams";
import TeamProfile from "../../ui/teamProfile";

const UserPage = ({ teamId }) => {
    const team = useSelector(getTeamById(teamId));

    if (team) {
        return (
            <div className="page container">
                <div className="row gutters-sm">
                    <div className="col mb-3">
                        <TeamProfile team={team} />
                    </div>
                </div>
                <div className="row">
                    <div className="col">
                        <Comments />
                    </div>
                </div>
            </div>
        );
    } else {
        return <h1>Loading</h1>;
    }
};

UserPage.propTypes = {
    teamId: PropTypes.string.isRequired
};

export default UserPage;
