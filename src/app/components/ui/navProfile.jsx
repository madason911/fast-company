import React, { useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCurrentUserData } from "../../store/users";

const iconStyle = {
    marginRight: "1rem"
};

const alertsStyle = {
    position: "relative"
};

const menuStyle = {
    width: "max-content"
};

// const alertsCountStyle = {
//     position: "absolute",
//     width: "15px",
//     height: "15px",
//     backgroundColor: "red",
//     top: "-3px",
//     right: "10px",
//     borderRadius: "50%",
//     fontSize: "0.7rem",
//     fontWeight: "900",
//     display: "flex",
//     justifyContent: "center",
//     alignItems: "center"
// };

const NavProfile = () => {
    const currentUser = useSelector(getCurrentUserData());
    const [isOpen, setOpen] = useState(false);
    const toggleMenu = () => {
        setOpen((prevState) => !prevState);
    };
    if (!currentUser) return "Загрузка...";
    return (
        <div className="dropdown">
            <div className="btn dropdown-toggle d-flex align-items-center">
                <div style={alertsStyle} className="alerts">
                    <Link to={`/request`}>
                        <i style={iconStyle} className="bi bi-bell"></i>
                    </Link>
                </div>
                <div className="me-2" onClick={toggleMenu}>
                    {currentUser.name}
                </div>
                <img
                    onClick={toggleMenu}
                    src={currentUser.image}
                    alt=""
                    height="40"
                    className="img-responsive rounded-circle"
                />
            </div>
            <div
                style={menuStyle}
                className={"dropdown-menu" + (isOpen ? " show" : "")}
            >
                <Link
                    to={`/users/${currentUser._id}`}
                    className="dropdown-item"
                >
                    Профиль
                </Link>
                <Link to="/logout" className="dropdown-item">
                    Выйты из сисетмы
                </Link>
            </div>
        </div>
    );
};

export default NavProfile;
