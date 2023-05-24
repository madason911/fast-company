import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
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
    const [searchQuery] = useState("");
    const [selectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 10;

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    function filterUsers(data) {
        const filteredUsers = searchQuery
            ? data.filter(
                  (user) =>
                      user.name
                          .toLowerCase()
                          .indexOf(searchQuery.toLowerCase()) !== -1
              )
            : data;
        return filteredUsers;
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);

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
                <PlayerFilters />
                {count > 0 && (
                    <UserTable
                        userId={userId}
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                    />
                )}
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
