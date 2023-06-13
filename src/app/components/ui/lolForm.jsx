import React, { useEffect, useState } from "react";
import { getCurrentUserData, updateUserData } from "../../store/users";
import { validator } from "../../utils/ validator";
import { useDispatch, useSelector } from "react-redux";
import SelectField from "../common/form/selectField";
import TextField from "../common/form/textField";
import TextAreaField from "../common/form/textAreaField";

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
    { label: "Убийца", value: "Убийца" },
    { label: "Воин", value: "Воин" },
    { label: "Маг", value: "Маг" },
    { label: "Стрелок", value: "Стрелок" },
    { label: "Поддержка", value: "Поддержка" },
    { label: "Танк", value: "Танк" }
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

const LolForm = () => {
    const dispatch = useDispatch();
    const currentUser = useSelector(getCurrentUserData());
    const [data, setData] = useState({
        _id: currentUser._id + "_lol",
        owner: currentUser._id,
        goal: "",
        nick: "",
        maxRate: "",
        currRate: "",
        totalTime: "",
        role: "",
        position: "",
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
        nick: {
            isRequired: {
                message: "Укажите свой ник в игре!"
            }
        },
        maxRate: {
            isRequired: {
                message: "Выберите максимальный ретинг!"
            }
        },
        currRate: {
            isRequired: {
                message: "Выберите текущий ретинг!"
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

    const handleSubmit = (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        dispatch(
            updateUserData({
                ...currentUser,
                lol: { ...data }
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
                label="Никнейм в игре"
                name="nick"
                value={data.nick}
                onChange={handleChange}
                error={errors.nick}
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
                label="Текущий ранг"
                name="currRate"
                value={data.currRate}
                onChange={handleChange}
                error={errors.currRate}
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

export default LolForm;
