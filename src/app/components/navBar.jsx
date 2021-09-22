import React from "react";
import { Link } from "react-router-dom";

const NavBar = () => {
    return (
        <ul className="nav m-3 fw-bold ">
            <li>
                <Link className="p-2 text-decoration-none" to="/">
                    Main
                </Link>
            </li>
            <li>
                <Link className="p-2 text-decoration-none" to="/login">
                    Login
                </Link>
            </li>
            <li>
                <Link className="p-2 text-decoration-none" to="/users">
                    Users
                </Link>
            </li>
        </ul>
    );
};

export default NavBar;
