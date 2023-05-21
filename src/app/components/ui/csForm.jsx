import React, { useEffect, useState } from "react";
import { validator } from "../../utils/ validator";
// import { useDispatch } from "react-redux";
// import { signUp } from "../../store/users";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";

const goals = [
    { label: "Про игры", value: "aboutGames" },
    { label: "Развлекательный", value: "entertaining" },
    { label: "Поднятие рейтинга", value: "rateUp" }
];

const experienceStatuses = [
    { label: "Есть", value: "yes" },
    { label: "Нет", value: "no" }
];

const roles = [
    { label: "Командный игрок", value: "player" },
    { label: "Капитан", value: "leader" }
];

const positions = [
    { label: "Fragger", value: "Fragger" },
    { label: "Support", value: "Support" },
    { label: "Awper", value: "Awper" },
    { label: "Lurker", value: "Lurker" }
];

const ranks = [
    { label: "Silver I", value: "Silver I" },
    { label: "Silver II", value: "Silver II" },
    { label: "Silver III", value: "Silver III" },
    { label: "Silver IV", value: "Silver IV" },
    { label: "Silver Elite", value: "Silver Elite" },
    { label: "Silver Elite Master", value: "Silver Elite Master" },
    { label: "Gold Nova I", value: "Gold Nova I" },
    { label: "Gold Nova II", value: "Gold Nova II" },
    { label: "Gold Nova III", value: "Gold Nova III" },
    { label: "Gold Nova Master", value: "Gold Nova Master" },
    { label: "Master Guardian I", value: "Master Guardian I" },
    { label: "Master Guardian II", value: "Master Guardian II" },
    { label: "Master Guardian Elite", value: "Master Guardian Elite" },
    { label: "Distinguished Master Guardian", value: "Distinguished Master Guardian" },
    { label: "Legendary Eagle", value: "Legendary Eagle" },
    { label: "Legendary Eagle Master", value: "Legendary Eagle Master" },
    { label: "Supreme Master First Class", value: "Supreme Master First Class" },
    { label: "The Global Elite", value: "The Global Elite" }
];

const CsForm = () => {
    // const dispatch = useDispatch();
    const [data, setData] = useState({
        goal: "",
        nick: "",
        maxRate: "0",
        currRate: "0",
        currRank: "",
        totalTime: "0",
        role: "",
        position: "",
        experience: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfog = {
        goal: {
            isRequired: {
                message: "Выберите цель игры!"
            }
        },
        nick: {
            isRequired: {
                message: "Укажите свой ник в игре!"
            }
        },
        maxRate: {
            isRequired: {
                message: "Укажите максимальный ретинг!"
            }
        },
        currRate: {
            isRequired: {
                message: "Укажите текущий ретинг!"
            }
        },
        currRank: {
            isRequired: {
                message: "Выберите свой ранг!"
            }
        },
        totalTime: {
            isRequired: {
                message: "Укажите общее время в игре!"
            }
        },
        role: {
            isRequired: {
                message: "Выберите свою роль в игре!"
            }
        },
        position: {
            isRequired: {
                message: "Выберите свою позицию в игре!"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const isValid = Object.keys(errors).length === 0;
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        console.log(data);
        // const newData = {
        //     ...data
        // };
        // dispatch(signUp(newData));
    };

    return (
        <form onSubmit={handleSubmit}>
            <SelectField
                options={goals}
                label="Цель игры"
                name="goal"
                value={data.goal}
                onChange={handleChange}
                error={errors.goal}
            />
            <TextField
                label="Никнейм в игре"
                name="nick"
                value={data.nick}
                onChange={handleChange}
                error={errors.nick}
            />
            <TextField
                label="Максимальный рейтинг"
                name="maxRate"
                type="number"
                min="0"
                max="10000"
                value={data.maxRate}
                onChange={handleChange}
                error={errors.maxRate}
            />
            <TextField
                label="Текущий рейтинг"
                name="currRate"
                type="number"
                min="0"
                max="10000"
                value={data.currRate}
                onChange={handleChange}
                error={errors.currRate}
            />
            <SelectField
                options={ranks}
                label="Текущее звание"
                name="currRank"
                value={data.currRank}
                onChange={handleChange}
                error={errors.currRank}
            />
            <TextField
                label="Общее время в игре"
                name="totalTime"
                type="number"
                min="0"
                value={data.totalTime}
                onChange={handleChange}
                error={errors.totalTime}
            />
            <SelectField
                options={roles}
                label="Тактическая роль"
                name="role"
                value={data.role}
                onChange={handleChange}
                error={errors.role}
            />
            <SelectField
                options={positions}
                label="Позиция в игре"
                name="position"
                value={data.position}
                onChange={handleChange}
                error={errors.position}
            />
            <SelectField
                options={experienceStatuses}
                label="Турнирный опыт"
                name="experience"
                value={data.experience}
                onChange={handleChange}
                error={errors.experience}
            />
             <button
                type="submit"
                disabled={!isValid}
                className="btn btn-primary w-100 mx-auto"
            >
                Подтвердить
            </button>
        </form>
    );
};

export default CsForm;
