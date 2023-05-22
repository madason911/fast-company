import React, { useEffect, useState } from "react";
import { validator } from "../../utils/ validator";
import SelectField from "../common/form/selectField";
import CsTeamForm from "./csTeamForm";
import DotaTeamForm from "./dotaTeamForm";
import LolTeamForm from "./lolTeamForm";

const games = [
    { label: "Counter Strike", value: "cs" },
    { label: "Dota 2", value: "dota" },
    { label: "League of Legends", value: "lol" }
];

const TeamCardForm = () => {
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
            {
                data.game === "cs"
                ? <CsTeamForm />
                : data.game === "dota"
                    ? <DotaTeamForm />
                    : data.game === "lol"
                        ? <LolTeamForm />
                        : <h2>Выберите игру!</h2>
            }
        </div>
    );
};

export default TeamCardForm;
