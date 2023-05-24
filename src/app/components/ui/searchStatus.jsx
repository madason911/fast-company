import React from "react";
import PropTypes from "prop-types";
const SearchStatus = ({ length, type }) => {
    const renderPlayerPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "человек готовы сыграть";
        }
        if (lastOne === 1) return "человек готов сыграть";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "человека готовы сыграть";
        return "человек готовы сыграть";
    };

    const renderTeamPhrase = (number) => {
        const lastOne = Number(number.toString().slice(-1));
        if (number > 4 && number < 15) {
            return "команд ищут игрока";
        }
        if (lastOne === 1) return "команда ищет игрока";
        if ([2, 3, 4].indexOf(lastOne) >= 0) return "команды ищет игрока";
        return "команд ищут игрока";
    };

    return (
        <h2 className="mt-5">
            <span style={{ color: "#00bbfe" }} className={"badge"}>
                {length > 0
                    ? `${
                          length +
                          " " +
                          (type === "player"
                              ? renderPlayerPhrase(length)
                              : renderTeamPhrase(length))
                      }`
                    : "Список пуст"}
            </span>
        </h2>
    );
};
SearchStatus.propTypes = {
    length: PropTypes.number,
    type: PropTypes.string
};

export default SearchStatus;
