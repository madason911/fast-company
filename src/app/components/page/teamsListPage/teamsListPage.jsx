import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { paginate } from "../../../utils/paginate";
import Pagination from "../../common/pagination";
import TeamsTable from "../../ui/teamsTable";
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
    const [filters, setFilters] = useState({
        game: "",
        goal: "",
        teamName: "",
        maxRate: "",
        currRate: "",
        currRank: "",
        totalTime: "",
        role: "",
        position: "",
        experience: "",
        membersCount: 0
    });
    const pageSize = 10;

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

    function filterTeams() {
        return filterTeamsByNick(
            filterTeamsByExp(
                filterTeamsByRole(
                    filterTeamsByPosition(
                        filterTeamsByCurrRate(
                            filterTeamsByMaxRate(
                                filterTeamsByGoal(filterTeamsByGame(teams))
                            )
                        )
                    )
                )
            )
        );
    }

    function filterTeamsByCurrRate(teams) {
        if (!filters.currRate) {
            return teams;
        }
        return teams?.filter((team) => {
            if (team.game === "lol") {
                return team.currRate === filters.currRate;
            }
            return (
                parseInt(team.currRate, 10) >= parseInt(filters.currRate, 10)
            );
        });
    }

    function filterTeamsByMaxRate(teams) {
        if (!filters.maxRate) {
            return teams;
        }
        return teams?.filter((team) => {
            if (team.game === "lol") {
                return team.maxRate === filters.maxRate;
            }
            return parseInt(team.maxRate, 10) >= parseInt(filters.maxRate, 10);
        });
    }

    function filterTeamsByPosition(teams) {
        if (!filters.position) {
            return teams;
        }
        return teams?.filter((team) => team.position === filters.position);
    }

    function filterTeamsByGame(teams) {
        if (!filters.game) {
            return teams;
        }
        return teams?.filter((team) => team.game === filters.game);
    }

    function filterTeamsByRole(teams) {
        if (!filters.role) {
            return teams;
        }
        return teams?.filter((team) => team.role === filters.role);
    }

    function filterTeamsByExp(teams) {
        if (!filters.experience) {
            return teams;
        }
        return teams?.filter((team) => team.experience === filters.experience);
    }

    function filterTeamsByNick(teams) {
        if (!filters.nick) {
            return teams;
        }
        return teams?.filter((team) => team.nick.includes(filters.nick));
    }

    function filterTeamsByGoal(teams) {
        if (!filters.goal) {
            return teams;
        }
        return teams?.filter((team) => team.goal === filters.goal);
    }

    const filteredTeams = filterTeams(teams);
    const count = filteredTeams && filteredTeams.length;
    const teamsCrop = paginate(filteredTeams, currentPage, pageSize);

    return (
        <div className="d-flex justify-content-center">
            <div className="d-flex flex-column">
                <h1 className="mt-5">Поиск команд</h1>
                <SearchStatus length={count} type={"team"} />
                <Link
                    style={openUserAccStyle}
                    className="nav-link mt-5 mb-5"
                    aria-current="page"
                    to={"/teams"}
                >
                    Создать заявку
                </Link>
                <TeamFilters filters={filters} setFilters={setFilters} />
                {count > 0 && <TeamsTable users={teamsCrop} />}
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
