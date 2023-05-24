import React from "react";
import PropTypes from "prop-types";
import _ from "lodash";

const columnStyle = {
    padding: "0"
};

const TableBody = ({ data, columns }) => {
    const renderContent = (item, column) => {
        if (columns[column].component) {
            const component = columns[column].component;
            if (typeof component === "function") {
                return component(item);
            }
            return component;
        }
        return _.get(item, columns[column].path);
    };
    return (
        <div className="users">
            {data.map((item) => (
                <div className="player-card" key={item._id}>
                    {Object.keys(columns).map((column) => (
                        <div
                            style={columnStyle}
                            key={column}
                        >
                            {renderContent(item, column)}
                        </div>
                    ))}
                </div>
            ))}
        </div>
    );
};

TableBody.propTypes = {
    data: PropTypes.array.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableBody;
