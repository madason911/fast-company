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

const UserTable = ({
    users,
    userId,
    onSort,
    selectedSort,
    onToggleBookMark,
    ...rest
}) => {
    const columns = {
        img: {
            path: "img",
            name: "Фото",
            component: (user) => (
                <img src={avatar} />
            )
        },
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user._id}`}>{user.nick}</Link>
            )
        },
        goal: {
            path: "goal",
            name: "Цель",
            component: (user) => (
                <span>Цель: {GOALS[user.goal]}</span>
            )
        },
        rate: {
            path: "rate",
            name: "Роль",
            component: (user) => (
                <span>Текущий рейтинг: {user.currRate}</span>
            )
        },
        role: {
            path: "role",
            name: "Роль",
            component: (user) => (
                <span>Роль {ROLES[user.role]}</span>
            )
        },
        country: {
            path: "country",
            name: "Страна",
            component: (user) => (
                <span>Страна: Россия</span>
            )
        },
        time: {
            path: "time",
            name: "Время",
            component: (user) => (
                <span>Время: {user.totalTime}ч</span>
            )
        },
        button: {
            path: "button",
            name: "Заявка",
            component: (user) => (
                <Link
                    style={openUserAccStyle}
                    className="nav-link mt-5 " aria-current="page" to={"/users/" + userId}
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

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    onToggleBookMark: PropTypes.func.isRequired,
    userId: PropTypes.string.isRequired
};

export default UserTable;
