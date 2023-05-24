import React from "react";
import PropTypes from "prop-types";
import avatar from "../../../img/avatar.png";
import GOALS from "../../enums/goals-text";
import ROLES from "../../enums/roles-text";

import Table from "../common/table";
import { Link } from "react-router-dom";

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

const TeamsTable = ({
    users,
    onSort,
    selectedSort,
    ...rest
}) => {
    const columns = {
        img: {
            path: "img",
            name: "Фото",
            component: (team) => (
                <img src={avatar} />
            )
        },
        name: {
            path: "name",
            name: "Имя",
            component: (team) => (
                <Link to={`/users/${team._id}`}>{team.teamName}</Link>
            )
        },
        goal: {
            path: "goal",
            name: "Цель",
            component: (team) => (
                <span>Цель: {GOALS[team.goal]}</span>
            )
        },
        rate: {
            path: "rate",
            name: "Роль",
            component: (team) => (
                <span>Текущий рейтинг: {team.currRate}</span>
            )
        },
        role: {
            path: "role",
            name: "Роль",
            component: (team) => (
                <span>Роль {ROLES[team.role]}</span>
            )
        },
        country: {
            path: "country",
            name: "Страна",
            component: (team) => (
                <span>Страна: Россия</span>
            )
        },
        time: {
            path: "time",
            name: "Время",
            component: (team) => (
                <span>Время: {team.totalTime}</span>
            )
        },
        button: {
            path: "button",
            name: "Заявка",
            component: (team) => (
                <Link
                    style={openUserAccStyle}
                    className="nav-link mt-5 " aria-current="page" to="/login/register"
                >
                    Открыть игрока
                </Link>
            )
        }
    };
    return (
        <Table
            onSort={onSort}
            selectedSort={selectedSort}
            columns={columns}
            data={users}
        />
    );
};

TeamsTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired
};

export default TeamsTable;
