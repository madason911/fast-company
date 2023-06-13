import React from "react";
import PropTypes from "prop-types";
import avatar from "../../../img/avatar.png";
import GOALS from "../../enums/goals-text";
import ROLES from "../../enums/roles-text";

import Table from "../common/table";
import { Link } from "react-router-dom";
import PlayerCard from "./playerCard";

const UserTable = ({ users, userId, ...rest }) => {
    console.log(userId);
    const columns = {
        img: {
            path: "img",
            name: "Фото",
            component: (user) => <img src={avatar} />
        },
        name: {
            path: "name",
            name: "Имя",
            component: (user) => (
                <Link to={`/users/${user.owner}`}>{user.nick}</Link>
            )
        },
        goal: {
            path: "goal",
            name: "Цель",
            component: (user) => <span>Цель: {GOALS[user.goal]}</span>
        },
        rate: {
            path: "rate",
            name: "Роль",
            component: (user) => <span>Текущий рейтинг: {user.currRate}</span>
        },
        role: {
            path: "role",
            name: "Роль",
            component: (user) => <span>Роль: {ROLES[user.role]}</span>
        },
        country: {
            path: "country",
            name: "Страна",
            component: (user) => <span>Страна: Россия</span>
        },
        time: {
            path: "time",
            name: "Время",
            component: (user) => <span>Время: {user.totalTime}ч</span>
        },
        button: {
            path: "button",
            name: "Заявка",
            component: (user) => <PlayerCard user={user} />
        }
    };
    return <Table columns={columns} data={users} />;
};

UserTable.propTypes = {
    users: PropTypes.array.isRequired,
    userId: PropTypes.string.isRequired
};

export default UserTable;
