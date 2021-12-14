import React from "react";
import PropTypes from "prop-types";
import Quality from "./quality";
import { useQualities } from "../../../hooks/useQuality";

const QualitiesList = ({ qualities }) => {
    const { isLoading, getQualities } = useQualities();
    const updatedQualities = getQualities(qualities);
    if (!isLoading) {
        return updatedQualities.map((qual) => (
            <Quality key={qual._id} {...qual} />
        ));
    } else {
        return "Loading...!";
    }
};

QualitiesList.propTypes = {
    qualities: PropTypes.array
};

export default QualitiesList;
