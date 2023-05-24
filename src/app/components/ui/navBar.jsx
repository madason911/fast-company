import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getIsLoggedIn } from "../../store/users";
import NavProfile from "./navProfile";

const navStyle = {
    background: "#27273F"
};

const linkStyle = {
    color: "#FFF",
    fontSize: "600"
};

const NavBar = () => {
    const isLoggedIn = useSelector(getIsLoggedIn());
    return (
        <div style={navStyle}>
            <nav className="navbar container mb-3">
                <div className="container-fluid">
                    <ul className="nav">
                        <li className="nav-item">
                            <Link
                                style={linkStyle}
                                className="nav-link "
                                aria-current="page"
                                to="/"
                            >
                                Главная
                            </Link>
                        </li>
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link
                                    style={linkStyle}
                                    className="nav-link "
                                    aria-current="page"
                                    to="/users"
                                >
                                    Игроки
                                </Link>
                            </li>
                        )}
                        {isLoggedIn && (
                            <li className="nav-item">
                                <Link
                                    style={linkStyle}
                                    className="nav-link "
                                    aria-current="page"
                                    to="/teams"
                                >
                                    Команды
                                </Link>
                            </li>
                        )}
                        <li className="nav-item">
                            <Link
                                style={linkStyle}
                                className="nav-link "
                                aria-current="page"
                                to="/tournaments"
                            >
                                Турниры
                            </Link>
                        </li>
                        <li className="nav-item">
                            <Link
                                style={linkStyle}
                                className="nav-link "
                                aria-current="page"
                                to="/news"
                            >
                                Новости
                            </Link>
                        </li>
                    </ul>
                    <div className="d-flex">
                        {isLoggedIn ? (
                            <NavProfile />
                        ) : (
                            <Link
                                style={linkStyle}
                                className="nav-link "
                                aria-current="page"
                                to="/login"
                            >
                                Авторизация
                            </Link>
                        )}
                    </div>
                </div>
            </nav>
        </div>
    );
};

export default NavBar;
