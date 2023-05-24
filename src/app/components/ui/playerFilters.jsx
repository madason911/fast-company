import React, { useState } from "react";
// import { getCurrentUserData, updateUserData } from "../../store/users";
// import { useDispatch, useSelector } from "react-redux";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const ageFieldStyle = {
    margin: "7px 0"
};

const filterStyle = {
    background: "#202136",
    border: "2px solid #00BBFE",
    padding: "3rem 3rem 0",
    borderRadius: "10px"
};

const goals = [
    { label: "Про игры", value: "aboutGames" },
    { label: "Развлекательные игры", value: "entertaining" },
    { label: "Поднятие рейтинга", value: "rateUp" }
];

// const experienceStatuses = [
//     { label: "Есть", value: "yes" },
//     { label: "Нет", value: "no" }
// ];

// const roles = [
//     { label: "Командный игрок", value: "player" },
//     { label: "Капитан", value: "leader" }
// ];

// const positions = [
//     { label: "Fragger", value: "Fragger" },
//     { label: "Support", value: "Support" },
//     { label: "Awper", value: "Awper" },
//     { label: "Lurker", value: "Lurker" }
// ];

// const ranks = [
//     { label: "Silver I", value: "Silver I" },
//     { label: "Silver II", value: "Silver II" },
//     { label: "Silver III", value: "Silver III" },
//     { label: "Silver IV", value: "Silver IV" },
//     { label: "Silver Elite", value: "Silver Elite" },
//     { label: "Silver Elite Master", value: "Silver Elite Master" },
//     { label: "Gold Nova I", value: "Gold Nova I" },
//     { label: "Gold Nova II", value: "Gold Nova II" },
//     { label: "Gold Nova III", value: "Gold Nova III" },
//     { label: "Gold Nova Master", value: "Gold Nova Master" },
//     { label: "Master Guardian I", value: "Master Guardian I" },
//     { label: "Master Guardian II", value: "Master Guardian II" },
//     { label: "Master Guardian Elite", value: "Master Guardian Elite" },
//     { label: "Distinguished Master Guardian", value: "Distinguished Master Guardian" },
//     { label: "Legendary Eagle", value: "Legendary Eagle" },
//     { label: "Legendary Eagle Master", value: "Legendary Eagle Master" },
//     { label: "Supreme Master First Class", value: "Supreme Master First Class" },
//     { label: "The Global Elite", value: "The Global Elite" }
// ];

const PlayerFilters = () => {
    // const dispatch = useDispatch();
    // const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState({
        goal: "",
        nick: "",
        maxRate: "",
        currRate: "",
        currRank: "",
        totalTime: "",
        role: "",
        position: "",
        experience: "",
        faceit: "",
        description: ""
    });

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };

    // const handleSubmit = (e) => {
    //     e.preventDefault();
    //     dispatch(
    //         updateUserData({
    //             ...currentUser,
    //             cs: { ...data }
    //         })
    //     );
    // };

    return (
        <div
            style={filterStyle}
        >
            <div className="row text-start">
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Игра"
                        name="goal"
                        defaultOption={"выберите игру для поиска"}
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Цель игры"
                        name="goal"
                        defaultOption={"выберите цель игры"}
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <TextField
                        label="Cтрана"
                        name="nick"
                        placeholder={"выберите страну проживания"}
                        value={data.nick}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Часовой пояс"
                        name="goal"
                        defaultOption={"выберите часовой пояс проживания"}
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row text-start">
                <div className="col">
                    <TextField
                        label="Максимальный ранг"
                        placeholder="напишите ваш максимальный ранг"
                        name="nick"
                        value={data.nick}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Текущий ранг"
                        name="goal"
                        defaultOption={"выберите текущий ранг"}
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <TextField
                        label="Общее время в игре"
                        placeholder={"напишите общее время в игре"}
                        name="nick"
                        value={data.nick}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Удобное время для игры"
                        name="goal"
                        defaultOption={"выберите удобное время для игры"}
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row text-start">
                <div className="col d-flex gap-3">
                    <TextField
                        label="Возраст"
                        placeholder={"от"}
                        name="nick"
                        value={data.nick}
                        onChange={handleChange}
                    />
                    <TextField
                        style={ageFieldStyle}
                        placeholder={"до"}
                        name="nick"
                        value={data.nick}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Тактическая роль в команде"
                        defaultOption={"выберите вашу роль"}
                        name="goal"
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                    <SelectField
                        options={goals}
                        label="Позиция в игре"
                        defaultOption={"выберите вашу позицию"}
                        name="goal"
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
                <div className="col">
                     <SelectField
                        options={goals}
                        label="Турнирный опыт"
                        defaultOption={"выберите турнирный опыт"}
                        name="goal"
                        value={data.goal}
                        onChange={handleChange}
                    />
                </div>
            </div>
            <div className="row text-center d-flex justify-content-center">
                <div className="col-3">
                    <TextField
                        label="Поиск по никнейму игрока"
                        placeholder={"напишите никнейм игрока"}
                        name="nick"
                        value={data.nick}
                        onChange={handleChange}
                    />
                </div>
            </div>
        </div>
    );
};

export default PlayerFilters;
