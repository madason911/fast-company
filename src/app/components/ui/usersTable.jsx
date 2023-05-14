import React from "react";
import PropTypes from "prop-types";
import avatar from "../../../img/avatar.png";

// import BookMark from "../common/bookmark";
// import Qualities from "./qualities";
import Table from "../common/table";
import { Link } from "react-router-dom";
// import Profession from "./profession";

const UserTable = ({
    users,
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
                <Link to={`/users/${user._id}`}>{user.name}</Link>
            )
        },
        goal: {
            path: "goal",
            name: "Цель",
            component: (user) => (
                <span>Турнирный уровень</span>
            )
        },
        rate: { path: "rate", name: "Оценка" },
        role: {
            path: "role",
            name: "Роль",
            component: (user) => (
                <span>entry tragger</span>
            )
        },
        country: {
            path: "country",
            name: "Страна",
            component: (user) => (
                <span>Россия</span>
            )
        },
        time: {
            path: "time",
            name: "Время",
            component: (user) => (
                <span>2350 часов</span>
            )
        },
        button: {
            path: "button",
            name: "Заявка",
            component: (user) => (
                <Link
                    className="nav-link mt-5 " aria-current="page" to="/login/register"
                >
                    Создать заявку
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
    onToggleBookMark: PropTypes.func.isRequired
};

export default UserTable;
