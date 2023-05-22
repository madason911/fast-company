import React, { useEffect, useState } from "react";
import { getCurrentUserId } from "../../store/users";
import { validator } from "../../utils/ validator";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";
import { createTeamCard } from "../../store/teams";
import { nanoid } from "nanoid";

const goals = [
    { label: "Про игры", value: "aboutGames" },
    { label: "Развлекательный", value: "entertaining" },
    { label: "Поднятие рейтинга", value: "rateUp" }
];

const experienceStatuses = [
    { label: "Есть", value: "yes" },
    { label: "Нет", value: "no" }
];

const ranks = [
    { label: "Iron", value: "Iron" },
    { label: "Bronze", value: "Bronze" },
    { label: "Silver", value: "Silver" },
    { label: "Gold", value: "Gold" },
    { label: "Platinum", value: "Platinum" },
    { label: "Diamond", value: "Diamond" },
    { label: "Master", value: "Master" },
    { label: "Grandmaster", value: "Grandmaster" },
    { label: "Challenger", value: "Challenger" }
];

const LolTeamForm = () => {
    const dispatch = useDispatch();
    const currentUserId = useSelector(getCurrentUserId());
    const [data, setData] = useState({
        goal: "",
        teamName: "",
        maxRate: "",
        minRate: "",
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
                message: "Выберите максимальный ретинг!"
            }
        },
        minRate: {
            isRequired: {
                message: "Выберите минимальный ретинг!"
            }
        },
        totalTime: {
            isRequired: {
                message: "Укажите общее время в игре!"
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
        dispatch(
            createTeamCard({
                _id: nanoid(),
                leader: currentUserId,
                game: "lol",
                ...data
            })
        );
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
            <SelectField
                options={ranks}
                label="Максимальный ранг"
                name="maxRate"
                value={data.maxRate}
                onChange={handleChange}
                error={errors.maxRate}
            />
            <SelectField
                options={ranks}
                label="Минимальный ранг"
                name="minRate"
                value={data.minRate}
                onChange={handleChange}
                error={errors.minRate}
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

export default LolTeamForm;
