import React, { useEffect, useState } from "react";
import { validator } from "../../utils/ validator";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { createTeamCard } from "../../store/teams";
import { nanoid } from "nanoid";
import { getCurrentUserId } from "../../store/users";

const goals = [
    { label: "Про игры", value: "aboutGames" },
    { label: "Развлекательные игры", value: "entertaining" },
    { label: "Поднятие рейтинга", value: "rateUp" }
];

const experienceStatuses = [
    { label: "Есть", value: "yes" },
    { label: "Нет", value: "no" }
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

const CsTeamForm = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({
        goal: "",
        teamName: "",
        maxRate: "",
        minRate: "",
        minRank: "",
        totalTime: "",
        experience: "",
        description: ""
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
        teamName: {
            isRequired: {
                message: "Укажите название команды!"
            }
        },
        maxRate: {
            isRequired: {
                message: "Укажите максимальный рейтинг!"
            }
        },
        minRate: {
            isRequired: {
                message: "Укажите минимальный рейтинг!"
            }
        },
        minRank: {
            isRequired: {
                message: "Выберите минимальный ранг!"
            }
        },
        totalTime: {
            isRequired: {
                message: "Укажите общее время в игре!"
            }
        },
        faceit: {
            isRequired: {
                message: "Укажите ссылку на FaceIt"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(createTeamCard({
            _id: nanoid(),
            leader: currentUserId,
            game: "cs",
            ...data
        }));
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
                label="Название команды"
                name="teamName"
                value={data.teamName}
                onChange={handleChange}
                error={errors.teamName}
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
                label="Минимальный рейтинг"
                name="minRate"
                type="number"
                min="0"
                max="10000"
                value={data.minRate}
                onChange={handleChange}
                error={errors.minRate}
            />
            <SelectField
                options={ranks}
                label="Звание"
                name="minRank"
                value={data.minRank}
                onChange={handleChange}
                error={errors.minRank}
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
                options={experienceStatuses}
                label="Турнирный опыт"
                name="experience"
                value={data.experience}
                onChange={handleChange}
                error={errors.experience}
            />
            <TextAreaField
                value={data.description || ""}
                onChange={handleChange}
                name="description"
                label="Описание"
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

export default CsTeamForm;
