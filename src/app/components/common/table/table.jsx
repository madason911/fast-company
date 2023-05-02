import React from "react";
import PropTypes from "prop-types";
import TableBody from "./tableBody";

const Table = ({ onSort, selectedSort, columns, data, children }) => {
    return (
        <div className="table">
            {children || (
                <>
                    <TableBody {...{ columns, data }} />
                </>
            )}
        </div>
    );
};
Table.propTypes = {
    onSort: PropTypes.func,
    selectedSort: PropTypes.object,
    columns: PropTypes.object,
    data: PropTypes.array,
    children: PropTypes.array
};

export default Table;
