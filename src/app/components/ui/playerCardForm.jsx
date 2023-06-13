import React, { useEffect, useState } from "react";
import { validator } from "../../utils/ validator";
import CsForm from "./csForm";
import SelectField from "../common/form/selectField";
import DotaForm from "./dotaForm";
import LolForm from "./lolForm";
import games from "../../enums/games";

const PlayerCardForm = () => {
    const [data, setData] = useState({
        game: ""
    });
    const [errors, setErrors] = useState({});

    const handleChange = (target) => {
        setData((prevState) => ({
            ...prevState,
            [target.name]: target.value
        }));
    };
    const validatorConfog = {
        game: {
            isRequired: {
                message: "Пожалуйста, выберите игру!"
            }
        }
    };
    useEffect(() => {
        validate();
    }, [data]);
    const validate = () => {
        const errors = validator(data, validatorConfog);
        setErrors(errors);
        return Object.keys(errors).length === 0;
    };

    return (
        <div>
            <SelectField
                options={games}
                label="Игра"
                name="game"
                value={data.game}
                onChange={handleChange}
                error={errors.game}
            />
            {data.game === "cs" ? (
                <CsForm type={"player"} />
            ) : data.game === "dota" ? (
                <DotaForm type={"player"} />
            ) : data.game === "lol" ? (
                <LolForm type={"player"} />
            ) : (
                <h2>Выберите игру!</h2>
            )}
        </div>
    );
};

export default PlayerCardForm;
