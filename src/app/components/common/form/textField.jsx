import React, { useState } from "react";
import PropTypes from "prop-types";

const inputStyle = {
    fontSize: "0.9rem"
};

const TextField = ({ label, type, name, value, onChange, error, min, max, placeholder, style }) => {
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = ({ target }) => {
        onChange({ name: target.name, value: target.value });
    };
    const getInputClasses = () => {
        return "form-control text-field " + (error ? " is-invalid" : "");
    };
    const toggleShowPassword = () => {
        setShowPassword((prevState) => !prevState);
    };
    return (
        <div
            style={style}
            className="mb-4"
        >
            <label className="form-label" htmlFor={name}> {label}</label>
            <div className="input-group has-validation">
                <input
                    style={inputStyle}
                    type={showPassword ? "text" : type}
                    placeholder={placeholder}
                    min={min}
                    max={max}
                    id={name}
                    name={name}
                    value={value}
                    onChange={handleChange}
                    className={getInputClasses()}
                />

                {type === "password" && (
                    <button
                        className="btn btn-outline-secondary"
                        type="button"
                        onClick={toggleShowPassword}
                    >
                        <i
                            className={
                                "bi bi-eye" + (showPassword ? "-slash" : "")
                            }
                        ></i>
                    </button>
                )}
                {error && <div className="invalid-feedback ">{error}</div>}
            </div>
        </div>
    );
};
TextField.defaultProps = {
    type: "text"
};
TextField.propTypes = {
    label: PropTypes.string,
    type: PropTypes.string,
    name: PropTypes.string,
    value: PropTypes.string,
    min: PropTypes.string,
    max: PropTypes.string,
    onChange: PropTypes.func,
    error: PropTypes.string,
    placeholder: PropTypes.string,
    style: PropTypes.object
};

export default TextField;
