import React, { useState } from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import GOALS from "../../enums/goals-text";
import ROLES from "../../enums/roles-text";
import EXP from "../../enums/experience-text";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import { Box, Modal } from "@mui/material";

const userCardContenStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const openUserAccStyle = {
    borderRadius: "0 0 10px 10px",
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500,
    width: "200px",
    margin: "auto",
    position: "absolute",
    bottom: 0
};

const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: "70%",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4
};

const playerCardStyle = {
    padding: "0 2rem",
    fontSize: "1.1rem",
    textAlign: "left"
};

const PlayerCard = ({ user }) => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const history = useHistory();
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };

    const getGameText = (user) => {
        if (user.game === "cs") {
            return "Counter-Strike";
        } else if (user.game === "dota") {
            return "Dota 2";
        }
        return "League of Legends";
    };

    return (
        <>
            <button
                style={openUserAccStyle}
                onClick={handleOpen}
                className="nav-link mt-5 "
                aria-current="page"
            >
                Открыть игрока
            </button>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <div style={playerCardStyle} className="user-card mb-3">
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
                                                Игра: {getGameText(user)}
                                            </p>
                                            <p className="mb-0">
                                                Цель игры: {GOALS[user.goal]}
                                            </p>
                                            <p className="mb-0">
                                                Максимальный ранг:{" "}
                                                {user.maxRate}
                                            </p>
                                            <p className="mb-0">
                                                Текущий ранг: {user.currRate}
                                            </p>
                                            <p className="mb-0">
                                                Текущее звание: {user.currRank}
                                            </p>
                                            <p className="mb-0">
                                                Общее время в игре:{" "}
                                                {user.totalTime}
                                            </p>
                                            <p className="mb-0">
                                                Тактическая роль:{" "}
                                                {ROLES[user.role]}
                                            </p>
                                            <p className="mb-0">
                                                Искомая позиция: {user.position}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                                <div className="d-flex flex-column text-left">
                                    <div className="mt-3">
                                        <div className="user-card__info">
                                            <p className="mb-0">
                                                Турнирный опыт:{" "}
                                                {EXP[user.experience]}
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
                            {user.description ? (
                                <div className="mt-3">
                                    <span>Описание</span>
                                    <p>{user.description}</p>
                                </div>
                            ) : (
                                ""
                            )}
                        </div>
                    </div>
                </Box>
            </Modal>
        </>
    );
};
PlayerCard.propTypes = {
    user: PropTypes.object
};

export default PlayerCard;
