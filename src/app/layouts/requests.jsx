import React, { useState } from "react";
import img from "../../img/avatar.png";

const filterStyle = {
    background: "#202136",
    border: "2px solid #00BBFE",
    padding: "3rem 3rem 0",
    borderRadius: "10px"
};

const cardStyle = {
    position: "relative",
    fontSize: "1.3rem",
    padding: "20px 20px 0",
    display: "flex",
    justifyContent: "space-around",
    alignItems: "center"
};

const imgStyle = {
    width: "100px",
    height: "100px"
};

const btns = {
    display: "flex",
    gap: "2rem"
};

const applyBtnStyle = {
    fontSize: "1.3rem",
    color: "#fff",
    fontWeight: "600",
    background: "#1FDC00"
};

const cancelBtnStyle = {
    fontSize: "1.3rem",
    color: "#fff",
    fontWeight: "600",
    background: "#DC4200"
};

const requestTextStyle = {
    marginTop: "10px"
};

const requestNumberStyle = {
    background: "#fff",
    position: "absolute",
    width: "40px",
    height: "40px",
    top: "-15px",
    left: "-15px",
    borderRadius: "50%",
    color: "#111226",
    fontWeight: "700",
    display: "flex",
    justifyContent: "center",
    alignItems: "center"
};

const Requests = () => {
    const [requests, setRequests] = useState([
        // { name: "NothingToSay", time: "42 минут назад" },
        // { name: "Collapse", time: "40 минут назад" },
        { name: "Zeus", time: "1 минуту назад" }
    ]);

    const handleClick = () => {
        setRequests([]);
    };
    return (
        <div className="container p-4" style={filterStyle}>
            <h1 className="text-center">Заявки на вступление </h1>
            {requests.length ? (
                requests.map((request, index) => (
                    <div key={index} className="user-card mb-3">
                        <div style={cardStyle}>
                            <div
                                style={requestNumberStyle}
                                className="request-number"
                            >
                                {index + 1}
                            </div>
                            <img style={imgStyle} src={img}></img>
                            <div>
                                <span className="name">{request.name} - </span>
                                <span className="time mt-3">
                                    {request.time}
                                </span>
                                <p style={requestTextStyle}>
                                    Желает вступить к вам в команду
                                </p>
                            </div>
                            <div style={btns}>
                                <button
                                    onClick={handleClick}
                                    style={applyBtnStyle}
                                    className="btn"
                                >
                                    Одобрить
                                </button>
                                <button style={cancelBtnStyle} className="btn">
                                    Отклонить
                                </button>
                            </div>
                        </div>
                    </div>
                ))
            ) : (
                <h2>Заявка одобрена!</h2>
            )}
        </div>
    );
};

export default Requests;
