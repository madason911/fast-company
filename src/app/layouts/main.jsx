import React from "react";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const mainContentStyle = {
    display: "flex",
    justifyContent: "space-between"
};

const mainPageTitle = {
    textAlign: "center",
    marginBottom: "75px"
};

const mainImgStyle = {
    width: "850px",
    backgroundSize: "cover"
};

const criteriesTitleStyle = {
    width: "550px"
};

const authLinksStyle = {
    display: "flex",
    justifyContent: "space-around",
    marginTop: "60px",
    padding: "0 150px"
};

const authLinksTextStyle = {
    fontSize: "32px",
    fontWeight: 600
};

const authLinksButtonsStyle = {
    display: "flex",
    alignItems: "center",
    width: "300px",
    justifyContent: "space-between"
};

const loginBtnStyle = {
    background: "#00BBFE",
    color: "#fff",
    fontWeight: 500
};

const registerBtnStyle = {
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500
};

const criteriesStyle = {
    fontWeight: 700,
    border: "2px solid #02bbfe",
    background: "#202235",
    padding: "1rem",
    borderRadius: "10px"
};

const Main = () => {
    const criteries = [
        "Количество часов",
        "Текущий ранг",
        "Пиковый ранг",
        "Тактическая роль",
        "Цель от игры",
        "Страна",
        "Язык общения",
        "Часовой пояс",
        "Время игры",
        "Возраст",
        "Турнирный опыт"
    ];

    return (
        <div className="main-page">
            <div className="container mt-5">
                <h1 style={mainPageTitle}>
                    {" "}
                    Пополни ряды чемпионов <br /> со своей командой{" "}
                </h1>
                <div style={mainContentStyle}>
                    <div style={criteriesStyle}>
                        <h2 style={criteriesTitleStyle}>
                            Критерии при поиске тиммейта <br />
                            которые озвучили лучшие игроки
                        </h2>
                        <ul className="criteries__list">
                            {criteries.map((item, index) => {
                                return <li key={index}>{item}</li>;
                            })}
                        </ul>
                    </div>
                    <div style={mainImgStyle} className="main-page__img"></div>
                </div>
                <div style={authLinksStyle} className="auth-links">
                    <div
                        style={authLinksTextStyle}
                        className="auth-links__text"
                    >
                        <p>Начни поиск с регистрации</p>
                    </div>
                    <div
                        style={authLinksButtonsStyle}
                        className="auth-links__buttons"
                    >
                        <Link
                            style={loginBtnStyle}
                            className="nav-link "
                            aria-current="page"
                            to="/login/login"
                        >
                            Авторизация
                        </Link>
                        <Link
                            style={registerBtnStyle}
                            className="nav-link "
                            aria-current="page"
                            to="/login/register"
                        >
                            Регистрация
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Main;
