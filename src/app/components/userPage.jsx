import React, { useEffect, useState } from "react";
import { useParams, useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import api from "../api";
import Quality from "./quality";

const UserPage = () => {
    const [user, setUser] = useState();
    const history = useHistory();
    const params = useParams();
    const { userId } = params;

    useEffect(() => {
        api.users.getById(userId).then((data) => setUser(data));
    }, []);

    const renderAllUsers = () => {
        history.replace("/users");
    };
    return (
        <>
            {/* eslint-disable */}
            {user ? (
                <div className="m-3">
                    <h1 className="mt-3 mb-3">{user?.name?.props?.children}</h1>
                    <h2 className="mt-2 mb-2">
                        {"Профессия: " + user.profession.name}
                    </h2>
                    {user.qualities.map((qual) => (
                        <Quality key={qual._id} {...qual} />
                    ))}
                    <h5 className="mb-4">
                        {"CompletedMeetengs: " + user.completedMeetings}
                    </h5>
                    <h3>{"Rate: " + user.rate}</h3>
                    <button onClick={() => renderAllUsers()}>
                        Все пользователи
                    </button>
                </div>
            ) : (
                <h1> Loading...</h1>
            )}
            {/* eslint-enable */}
        </>
    );
};
UserPage.propTypes = {
    user: PropTypes.object
};

export default UserPage;
