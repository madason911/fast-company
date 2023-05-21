import React from "react";
import PropTypes from "prop-types";
import { useHistory } from "react-router";
import { useSelector } from "react-redux";
import { getCurrentUserData } from "../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const createRequestBtnStyle = {
    fontSize: "0.8rem",
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500,
    width: "190px",
    padding: "5px"
};

const createCardBtnsStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const UserCard = ({ user }) => {
    const history = useHistory();
    const currentUser = useSelector(getCurrentUserData());
    const handleClick = () => {
        history.push(history.location.pathname + "/edit");
    };
    return (
        <>
            <div className="user-card">
                <div className="card-body">
                    {currentUser._id === user._id && (
                        <button
                            className="position-absolute top-0 end-0 btn btn-sm"
                            onClick={handleClick}
                        >
                            <i className="user-card__option bi bi-gear"></i>
                        </button>
                    )}

                    <div className="d-flex flex-column align-items-center text-center position-relative">
                        <img
                            src={user.image}
                            className="rounded-circle"
                            width="150"
                        />
                        <div className="mt-3">
                            <h4>{user.name}</h4>
                            <div className="user-card__info">
                                <p className="mb-0">Страна: Россия</p>
                                <p className="mb-0">Часовой пояс: GMT+3</p>
                                <p className="mb-0">Удобное время для игры: 18:00-23:00</p>
                                <p className="mb-0">Возраст: 23</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div style={createCardBtnsStyle}>
                <Link
                    style={createRequestBtnStyle}
                    className="nav-link mt-2 " aria-current="page" to="/card/player"
                >
                    Создать карточку игрока
                </Link>
                <Link
                    style={createRequestBtnStyle}
                    className="nav-link mt-2 " aria-current="page" to="/card/team"
                >
                    Создать карточку команды
                </Link>
            </div>
        </>
    );
};
UserCard.propTypes = {
    user: PropTypes.object
};

export default UserCard;
