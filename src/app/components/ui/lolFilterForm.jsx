import React from "react";
import PropTypes from "prop-types";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import goals from "../../enums/goals";
import roles from "../../enums/roles";
import positions from "../../enums/lol-positions";
import experience from "../../enums/experience";
import ranks from "../../enums/lol-ranks";

const ageFieldStyle = {
    margin: "7px 0"
};

const LolFilterForm = ({ filters, setFilters }) => {
    const handleChange = (target) => {
        setFilters((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    return (
        <>
            <div className="row text-start">
                <div className="col">
                    <SelectField
                        options={ranks}
                        label="Максимальный рейтинг"
                        name="maxRate"
                        defaultOption={"выберите максимальный рейтинг"}
                        value={filters.maxRate}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={ranks}
                        label="Текущий рейтинг"
                        name="currRate"
                        defaultOption={"выберите текущий рейтинг"}
                        value={filters.currRate}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <TextField
                        label="Общее время в игре"
                        placeholder={"напишите общее время в игре"}
                        name="totalTime"
                        value={filters.totalTime}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Удобное время для игры"
                        name="easyTime"
                        defaultOption={"выберите удобное время для игры"}
                        value={filters.easyTime}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row text-start">
                <div className="col d-flex gap-3">
                    <TextField
                        label="Возраст"
                        placeholder={"от"}
                        name="since"
                        value={filters.since}
                        onChange={handleChange}
                    />
                    <TextField
                        style={ageFieldStyle}
                        placeholder={"до"}
                        name="till"
                        value={filters.till}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={roles}
                        label="Тактическая роль в команде"
                        defaultOption={"выберите вашу роль"}
                        name="role"
                        value={filters.role}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={positions}
                        label="Позиция в игре"
                        defaultOption={"выберите вашу позицию"}
                        name="position"
                        value={filters.position}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={experience}
                        label="Турнирный опыт"
                        defaultOption={"выберите турнирный опыт"}
                        name="experience"
                        value={filters.experience}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row text-center d-flex justify-content-center">
                <div className="col-3">
                    <TextField
                        label="Поиск по никнейму игрока"
                        placeholder={"напишите никнейм игрока"}
                        name="nick"
                        value={filters.nick}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </>
    );
};

LolFilterForm.propTypes = {
    filters: PropTypes.object,
    setFilters: PropTypes.func
};

export default LolFilterForm;
