import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";

const userCardContenStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const playerCardStyle = {
    padding: "0 2rem",
    fontSize: "1.1rem",
    textAlign: "left"
};

const PlayerCard = () => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const getUserCards = () => {
        return Object.keys(currentUser).map(key => {
            if (
                key === "cs" ||
                key === "dota" ||
                key === "lol"
                ) {
                    return {
                        ...currentUser[key],
                        key
                    };
            }
            return null;
        }).filter(Boolean);
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
            {
                getUserCards().map(card => (
                    <div key={card.key} style={playerCardStyle} className="user-card mb-3">
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
                                            <p className="mb-0">Игра: {getGameText(card)}</p>
                                            <p className="mb-0">Цель игры: {card.goal}</p>
                                            <p className="mb-0">Максимальный ранг: {card.maxRate}</p>
                                            <p className="mb-0">Текущий ранг: {card.currRate}</p>
                                            <p className="mb-0">Текущее звание: {card.currRank}</p>
                                            <p className="mb-0">Общее время в игре: {card.totalTime}</p>
                                            <p className="mb-0">Тактическая роль: {card.role}</p>
                                            <p className="mb-0">Искомая позиция: {card.position}</p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column text-left">
                                    <div className="mt-3">
                                        <div className="user-card__info">
                                            <p className="mb-0">Турнирный опыт: {card.experience}</p>
                                            <p className="mb-0">Faceit: {card.faceit}</p>
                                            <p className="mb-0">Steam: {card.steam || ""}</p>
                                            <p className="mb-0">Discord: {card.discord || ""}</p>
                                            <p className="mb-0">Telegramm: {card.telegramm || ""}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {
                                card.description
                                    ? <div className="mt-3">
                                        <span>Описание</span>
                                        <p>{card.description}</p>
                                    </div>
                                    : ""
                            }
                        </div>
                    </div>
                ))
            }
        </>
    );
};
PlayerCard.propTypes = {
    user: PropTypes.object
};

export default PlayerCard;
