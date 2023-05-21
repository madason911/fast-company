import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
// import GroupList from "../../common/groupList";
import SearchStatus from "../../ui/searchStatus";
import UserTable from "../../ui/usersTable";
import _ from "lodash";
import { useSelector } from "react-redux";
// import {
//     getProfessions,
//     getProfessionsLoadingStatus
// } from "../../../store/professions";
import { getCurrentUserId, getUsers } from "../../../store/users";
import { Link } from "react-router-dom/cjs/react-router-dom.min";

const createRequestBtnStyle = {
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500,
    width: "200px",
    margin: "auto"

};

const UsersListPage = () => {
    const users = useSelector(getUsers());
    const currentUserId = useSelector(getCurrentUserId());
    // const professions = useSelector(getProfessions());
    // const professionsLoading = useSelector(getProfessionsLoadingStatus());
    const [currentPage, setCurrentPage] = useState(1);
    const [searchQuery] = useState("");
    const [selectedProf] = useState();
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 10;

    const handleDelete = (userId) => {
        console.log("delete user");
        // setUsers(users.filter((user) => user._id !== userId));
    };
    const handleToggleBookMark = (id) => {
        const newArray = users.map((user) => {
            if (user._id === id) {
                return { ...user, bookmark: !user.bookmark };
            }
            return user;
        });
        // setUsers(newArray);
        console.log(newArray);
    };

    useEffect(() => {
        setCurrentPage(1);
    }, [selectedProf, searchQuery]);

    // const handleProfessionSelect = (item) => {
    //     if (searchQuery !== "") setSearchQuery("");
    //     setSelectedProf(item);
    // };
    // const handleSearchQuery = ({ target }) => {
    //     setSelectedProf(undefined);
    //     setSearchQuery(target.value);
    // };

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
        return filteredUsers.filter((u) => u._id !== currentUserId);
    }
    const filteredUsers = filterUsers(users);
    const count = filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const usersCrop = paginate(sortedUsers, currentPage, pageSize);
    // const clearFilter = () => {
    //     setSelectedProf();
    // };

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1 className="mt-5">Поиск игроков</h1>
                <SearchStatus
                    length={count}
                />
                <Link
                    style={createRequestBtnStyle}
                    className="nav-link mt-5 " aria-current="page" to="/login/register"
                >
                    Создать заявку
                </Link>
                {count > 0 && (
                    <UserTable
                        users={usersCrop}
                        onSort={handleSort}
                        selectedSort={sortBy}
                        onDelete={handleDelete}
                        onToggleBookMark={handleToggleBookMark}
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
