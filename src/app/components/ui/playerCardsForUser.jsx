import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import GOALS from "../../enums/goals-text";
import ROLES from "../../enums/roles-text";
import EXP from "../../enums/experience-text";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const userCardContenStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const ForCardStyle = {
    padding: "0 2rem",
    fontSize: "1.1rem",
    textAlign: "left"
};

const PlayerCardsForUser = () => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const getUserCards = () => {
        return Object.keys(currentUser)
            .map((key) => {
                if (key === "cs" || key === "dota" || key === "lol") {
                    return {
                        ...currentUser[key],
                        key
                    };
                }
                return null;
            })
            .filter(Boolean);
    };

    const getGameText = (card) => {
        if (card.key === "cs") {
            return "Counter-Strike";
        } else if (card.key === "dota") {
            return "Dota 2";
        }
        return "League of Legends";
    };

    return (
        <>
            {getUserCards().map((card) => (
                <div
                    key={card.key}
                    style={ForCardStyle}
                    className="user-card mb-3"
                >
                    <div className="card-body">
                        <button
                            className="position-absolute top-0 end-0 btn btn-sm"
                            onClick={handleClick}
                        >
                            <i className="user-card__option bi bi-gear"></i>
                        </button>

                        <h2>Карточка игрока</h2>
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
                                            Максимальный ранг: {card.maxRate}
                                        </p>
                                        <p className="mb-0">
                                            Текущий ранг: {card.currRate}
                                        </p>
                                        <p className="mb-0">
                                            Текущее звание: {card.currRank}
                                        </p>
                                        <p className="mb-0">
                                            Общее время в игре: {card.totalTime}
                                        </p>
                                        <p className="mb-0">
                                            Тактическая роль: {ROLES[card.role]}
                                        </p>
                                        <p className="mb-0">
                                            Искомая позиция: {card.position}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="d-flex flex-column text-left">
                                <div className="mt-3">
                                    <div className="user-card__info">
                                        <p className="mb-0">
                                            Турнирный опыт:{" "}
                                            {EXP[card.experience]}
                                        </p>
                                        <p className="mb-0">
                                            Faceit:{" "}
                                            <Link>
                                                https://www.faceit.com/NothingToSay
                                            </Link>
                                        </p>
                                        <p className="mb-0">
                                            Steam:{" "}
                                            <Link>
                                                https://steamcommunity.com/id/NothingToSay
                                            </Link>
                                        </p>
                                        <p className="mb-0">
                                            Discord: #2634 NothingToSay
                                        </p>
                                        <p className="mb-0">
                                            Telegramm: @NothingToSay_17
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
PlayerCardsForUser.propTypes = {
    user: PropTypes.object
};

export default PlayerCardsForUser;
