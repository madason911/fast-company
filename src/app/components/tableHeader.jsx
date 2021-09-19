import React from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    const renderSortDirection = (selectedSort) => {
        if (selectedSort.order === "desc") {
            return <i className="bi bi-caret-up-fill"></i>;
        }
        if (selectedSort.order === "asc") {
            return <i className="bi bi-caret-down-fill"></i>;
        }
    };
    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        {...{ role: columns[column].path && "button" }}
                        scope="col"
                    >
                        {columns[column].name}
                        {/* eslint-disable */}
                        {selectedSort.path &&
                        columns[column].path === selectedSort.path
                            ? renderSortDirection(selectedSort)
                            : ""}
                        {/* eslint-enable */}
                    </th>
                ))}

                {/* <th scope="col">Качества</th>
                <th onClick={() => handleSort("profession.name")} scope="col">
                    Провфессия
                </th>
                <th onClick={() => handleSort("completedMeetings")} scope="col">
                    Встретился, раз
                </th>
                <th onClick={() => handleSort("rate")} scope="col">
                    Оценка
                </th>
                <th onClick={() => handleSort("bookmark")} scope="col">
                    Избранное
                </th>
                <th /> */}
            </tr>
        </thead>
    );
};
TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.object.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
