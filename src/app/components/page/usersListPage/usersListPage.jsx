import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import UserTable from "../../ui/usersTable";
import { useSelector } from "react-redux";
import { getCurrentUserId, getUsersCards } from "../../../store/users";
import PlayerFilters from "../../ui/playerFilters";
import SearchStatus from "../../ui/searchStatus";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const openUserAccStyle = {
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500,
    width: "200px",
    margin: "auto"
};

const UsersListPage = () => {
    const users = useSelector(getUsersCards());
    const userId = useSelector(getCurrentUserId());
    const [currentPage, setCurrentPage] = useState(1);
    const [filters, setFilters] = useState({
        game: "",
        goal: "",
        nick: "",
        maxRate: "",
        currRate: "",
        currRank: "",
        totalTime: "",
        role: "",
        position: "",
        experience: ""
    });
    const pageSize = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, []);

    useEffect(() => {
        setFilters({
            game: filters.game,
            goal: "",
            nick: "",
            maxRate: "",
            currRate: "",
            currRank: "",
            totalTime: "",
            role: "",
            position: "",
            experience: ""
        });
    }, [filters.game]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };

    function filterUsers() {
        return filterUsersByNick(
            filterUsersByExp(
                filterUsersByRole(
                    filterUsersByPosition(
                        filterUsersByCurrRate(
                            filterUsersByMaxRate(
                                filterUsersByGoal(filterUsersByGame(users))
                            )
                        )
                    )
                )
            )
        );
    }

    function filterUsersByCurrRate(users) {
        if (!filters.currRate) {
            return users;
        }
        return users?.filter((user) => {
            if (user.game === "lol") {
                return user.currRate === filters.currRate;
            }
            return (
                parseInt(user.currRate, 10) >= parseInt(filters.currRate, 10)
            );
        });
    }

    function filterUsersByMaxRate(users) {
        if (!filters.maxRate) {
            return users;
        }
        return users?.filter((user) => {
            if (user.game === "lol") {
                return user.maxRate === filters.maxRate;
            }
            return parseInt(user.maxRate, 10) >= parseInt(filters.maxRate, 10);
        });
    }

    function filterUsersByPosition(users) {
        if (!filters.position) {
            return users;
        }
        return users?.filter((user) => user.position === filters.position);
    }

    function filterUsersByGame(users) {
        if (!filters.game) {
            return users;
        }
        return users?.filter((user) => user.game === filters.game);
    }

    function filterUsersByRole(users) {
        if (!filters.role) {
            return users;
        }
        return users?.filter((user) => user.role === filters.role);
    }

    function filterUsersByExp(users) {
        if (!filters.experience) {
            return users;
        }
        return users?.filter((user) => user.experience === filters.experience);
    }

    function filterUsersByNick(users) {
        if (!filters.nick) {
            return users;
        }
        return users?.filter((user) => user.nick.includes(filters.nick));
    }

    function filterUsersByGoal(users) {
        if (!filters.goal) {
            return users;
        }
        return users?.filter((user) => user.goal === filters.goal);
    }

    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const usersCrop = paginate(filteredUsers, currentPage, pageSize);

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1 className="mt-5">Поиск игроков</h1>
                <SearchStatus length={count} type={"player"} />
                <Link
                    style={openUserAccStyle}
                    className="nav-link mt-5 mb-5"
                    aria-current="page"
                    to={"/users/" + userId}
                >
                    Создать заявку
                </Link>
                <PlayerFilters filters={filters} setFilters={setFilters} />
                {count > 0 && <UserTable userId={userId} users={usersCrop} />}
                <div className="d-flex justify-content-center">
                    <Pagination
                        itemsCount={count}
                        pageSize={pageSize}
                        currentPage={currentPage}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </div>
    );
};
UsersListPage.propTypes = {
    users: PropTypes.array
};

export default UsersListPage;
