import React from "react";
import PropTypes from "prop-types";
import avatar from "../../../img/avatar.png";
import GOALS from "../../enums/goals-text";
import ROLES from "../../enums/roles-text";

import Table from "../common/table";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { getCurrentUserData, updateUserData } from "../../store/users";

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

const TeamsTable = ({ users, ...rest }) => {
    const currentUser = useSelector(getCurrentUserData());
    const dispatch = useDispatch();

    const handleRequest = (data) => {
        dispatch(
            updateUserData(data.leader, {
                requests: {
                    [currentUser._id]: currentUser._id
                }
            })
        );
    };
    const columns = {
        img: {
            path: "img",
            name: "Фото",
            component: (team) => <img src={avatar} />
        },
        name: {
            path: "name",
            name: "Имя",
            component: (team) => (
                <Link to={`/teams/${team._id}`}>{team.teamName}</Link>
            )
        },
        goal: {
            path: "goal",
            name: "Цель",
            component: (team) => <span>Цель: {GOALS[team.goal]}</span>
        },
        rate: {
            path: "rate",
            name: "Роль",
            component: (team) => <span>Текущий рейтинг: {team.currRate}</span>
        },
        role: {
            path: "role",
            name: "Роль",
            component: (team) => <span>Роль {ROLES[team.role]}</span>
        },
        country: {
            path: "country",
            name: "Страна",
            component: (team) => <span>Страна: Россия</span>
        },
        time: {
            path: "time",
            name: "Время",
            component: (team) => <span>Время: {team.totalTime}</span>
        },
        button: {
            path: "button",
            name: "Заявка",
            component: (team) => (
                <button
                    style={openUserAccStyle}
                    className="nav-link mt-5 "
                    aria-current="page"
                    onClick={() => handleRequest(team)}
                >
                    Вступить в команду
                </button>
            )
        }
    };
    return <Table columns={columns} data={users} />;
};

TeamsTable.propTypes = {
    users: PropTypes.array.isRequired
};

export default TeamsTable;
