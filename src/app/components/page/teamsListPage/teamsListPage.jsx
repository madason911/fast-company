import React, { useState } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import TeamsTable from "../../ui/teamsTable";
import _ from "lodash";
import { useSelector } from "react-redux";
import { getTeams } from "../../../store/teams";
import TeamFilters from "../../ui/teamFilters";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import SearchStatus from "../../ui/searchStatus";

const openUserAccStyle = {
    background: "#DC7000",
    color: "#fff",
    fontWeight: 500,
    width: "200px",
    margin: "auto"
};

const TeamsListPage = () => {
    const teams = useSelector(getTeams());
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState({ path: "name", order: "asc" });
    const pageSize = 10;

    const handlePageChange = (pageIndex) => {
        setCurrentPage(pageIndex);
    };
    const handleSort = (item) => {
        setSortBy(item);
    };

    function filterUsers(data) {
        return data;
    }
    const filteredUsers = filterUsers(teams);
    const count = filteredUsers && filteredUsers.length;
    const sortedUsers = _.orderBy(filteredUsers, [sortBy.path], [sortBy.order]);
    const teamsCrop = paginate(sortedUsers, currentPage, pageSize);

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1 className="mt-5">Поиск команд</h1>
                <SearchStatus length={count} type={"team"} />
                <Link
                    style={openUserAccStyle}
                    className="nav-link mt-5 mb-5"
                    aria-current="page"
                    to={"/users"}
                >
                    Создать заявку
                </Link>
                <TeamFilters />
                {count > 0 && (
                    <TeamsTable
                        users={teamsCrop}
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
TeamsListPage.propTypes = {
    teams: PropTypes.array
};

export default TeamsListPage;
