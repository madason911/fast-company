import React from "react";
import PropTypes from "prop-types";
import GOALS from "../../enums/goals-text";
import EXP from "../../enums/experience-text";
import img from "../../../img/avatar.png";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersCards } from "../../store/users";
import UserTable from "./usersTable";

const userCardContenStyle = {
    display: "flex",
    justifyContent: "space-between",
    padding: "2rem 0"
};

const playerCardStyle = {
    padding: "0 2rem",
    fontSize: "1.1rem",
    textAlign: "left"
};

const imgStyle = {
    width: "150px",
    height: "150px"
};

const TeamProfile = ({ team }) => {
    const users = useSelector(getUsersCards());
    const currentUserId = useSelector(getCurrentUserId());
    const slicesUsers = users.filter(
        (user) => user.owner === currentUserId || user.nick === "Zeus"
    );
    const getGameText = (card) => {
        if (card.game === "cs") {
            return "Counter-Strike";
        } else if (card.game === "dota") {
            return "Dota 2";
        }
        return "League of Legends";
    };

    return (
        <>
            <div
                key={team._id}
                style={playerCardStyle}
                className="user-card mb-3"
            >
                <div className="card-body">
                    <button className="position-absolute top-0 end-0 btn btn-sm">
                        <i className="user-card__option bi bi-gear"></i>
                    </button>

                    <h2>Карточка Команды {team.teamName}</h2>
                    <div style={userCardContenStyle}>
                        <img style={imgStyle} src={img}></img>
                        <div className="d-flex flex-column text-left">
                            <div className="mt-3">
                                <div className="user-card__info">
                                    <p className="mb-0">
                                        Игра: {getGameText(team)}
                                    </p>
                                    <p className="mb-0">
                                        Цель игры: {GOALS[team.goal]}
                                    </p>
                                    <p className="mb-0">
                                        Максимальный ранг: {team.maxRate}
                                    </p>
                                    <p className="mb-0">
                                        Минимальный ранг: {team.minRate}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="d-flex flex-column text-left">
                            <div className="mt-3">
                                <div className="user-card__info">
                                    {team.game === "cs" ? (
                                        <p className="mb-0">
                                            Минимальное звание: {team.currRank}
                                        </p>
                                    ) : (
                                        ""
                                    )}
                                    <p className="mb-0">
                                        Общее время в игре: {team.totalTime}
                                    </p>
                                    <p className="mb-0">
                                        Количество игроков: 8{" "}
                                        {team?.members?.length}
                                    </p>
                                    <p className="mb-0">
                                        Турнирный Опыт: {EXP[team.experience]}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                    {team.description ? (
                        <div className="mt-3">
                            <span>Описание</span>
                            <p>{team.description}</p>
                        </div>
                    ) : (
                        ""
                    )}
                    <UserTable users={slicesUsers} />
                </div>
            </div>
        </>
    );
};
TeamProfile.propTypes = {
    team: PropTypes.object
};

export default TeamProfile;
