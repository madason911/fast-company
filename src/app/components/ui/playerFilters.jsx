import React from "react";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import games from "../../enums/games";
import goals from "../../enums/goals";
import TextField from "../common/form/textField";
import CsFilterForm from "./csFilterForm";
import LolFilterForm from "./lolFilterForm";
import DotaFilterForm from "./dotaFilterForm";

const filterStyle = {
    background: "#202136",
    border: "2px solid #00BBFE",
    padding: "3rem 3rem 0",
    borderRadius: "10px"
};

const PlayerFilters = ({ filters, setFilters }) => {
    console.log(filters);

    const handleChange = (target) => {
        setFilters((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <div style={filterStyle}>
            <div className="row text-start">
                <div className="col">
                    <SelectField
                        options={games}
                        label="Игра"
                        name="game"
                        defaultOption={"выберите игру для поиска"}
                        value={filters.game}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Цель игры"
                        name="goal"
                        defaultOption={"выберите цель игры"}
                        value={filters.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <TextField
                        label="Cтрана"
                        name="country"
                        placeholder={"выберите страну проживания"}
                        value={filters.country}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Часовой пояс"
                        name="utc"
                        defaultOption={"выберите часовой пояс проживания"}
                        value={filters.utc}
                        onChange={handleChange}
                    />
                </div>
            </div>
            {filters.game === "cs" ? (
                <CsFilterForm filters={filters} setFilters={setFilters} />
            ) : filters.game === "dota" ? (
                <DotaFilterForm filters={filters} setFilters={setFilters} />
            ) : filters.game === "lol" ? (
                <LolFilterForm filters={filters} setFilters={setFilters} />
            ) : (
                ""
            )}
        </div>
    );
};

PlayerFilters.propTypes = {
    filters: PropTypes.object,
    setFilters: PropTypes.func
};

export default PlayerFilters;
