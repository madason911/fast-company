import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { getTeamsForUser } from "../../store/teams";
import GOALS from "../../enums/goals-text";
import EXP from "../../enums/experience-text";

const userCardContenStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const playerCardStyle = {
    padding: "0 2rem",
    fontSize: "1.1rem",
    textAlign: "left"
};

const TeamCard = () => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const teams = useSelector(getTeamsForUser(currentUser._id));

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
            {teams &&
                teams.map((card) => (
                    <div
                        key={card._id}
                        style={playerCardStyle}
                        className="user-card mb-3"
                    >
                        <div className="card-body">
                            <button
                                className="position-absolute top-0 end-0 btn btn-sm"
                                onClick={handleClick}
                            >
                                <i className="user-card__option bi bi-gear"></i>
                            </button>

                            <h2>Карточка Команды</h2>
                            <div style={userCardContenStyle}>
                                <div className="d-flex flex-column text-left">
                                    <div className="mt-3">
                                        <div className="user-card__info">
                                            <p className="mb-0">
                                                Игра: {getGameText(card)}
                                            </p>
                                            <p className="mb-0">
                                                Цель игры: {GOALS[card.goal]}
                                            </p>
                                            <p className="mb-0">
                                                Максимальный ранг:{" "}
                                                {card.maxRate}
                                            </p>
                                            <p className="mb-0">
                                                Минимальный ранг: {card.minRate}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column text-left">
                                    <div className="mt-3">
                                        <div className="user-card__info">
                                            {card.game === "cs" ? (
                                                <p className="mb-0">
                                                    Минимальное звание:{" "}
                                                    {card.currRank}
                                                </p>
                                            ) : (
                                                ""
                                            )}
                                            <p className="mb-0">
                                                Общее время в игре:{" "}
                                                {card.totalTime}
                                            </p>
                                            <p className="mb-0">
                                                Турнирный Опыт:{" "}
                                                {EXP[card.experience]}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {card.description ? (
                                <div className="mt-3">
                                    <span>Описание</span>
                                    <p>{card.description}</p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                ))}
        </>
    );
};
TeamCard.propTypes = {
    user: PropTypes.object
};

export default TeamCard;
