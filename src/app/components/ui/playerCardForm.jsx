import React, { useEffect, useState } from "react";
import { validator } from "../../utils/ validator";
// import TextField from "../common/form/textField";
// import { useDispatch } from "react-redux";
// import { signUp } from "../../store/users";
import CsForm from "./csForm";
import SelectField from "../common/form/selectField";

// const defaultGamesOptions = {
//     cs: {
//         goal: "",
//         maxRate: 0,
//         currRate: 0,
//         currDegree: [],
//         totalTime: 0,
//         role: "",
//         position: "",
//         experience: false,
//         nick: "",
//         steam: "",
//         faceit: "",
//         discord: "",
//         telegramm: ""
//     },
//     dota: {
//         goal: "",
//         maxRate: 0,
//         currRate: 0,
//         totalTime: 0,
//         role: "",
//         position: "",
//         experience: false,
//         nick: "",
//         steam: "",
//         discord: "",
//         telegramm: ""
//     },
//     lol: {
//         goal: "",
//         maxRate: 0,
//         currRate: 0,
//         totalTime: 0,
//         role: "",
//         position: "",
//         experience: false,
//         nick: "",
//         steam: "",
//         discord: "",
//         telegramm: ""
//     }
// };

const games = [
    { label: "cs", value: "cs" },
    { label: "dota", value: "dota" },
    { label: "lol", value: "lol" }
];

const PlayerCardForm = () => {
    // const dispatch = useDispatch();
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
    // const isValid = Object.keys(errors).length === 0;

    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     const isValid = validate();
    //     if (!isValid) return;
    //     const newData = {
    //         ...data
    //     };
    //     dispatch(signUp(newData));
    // };

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
                ? <CsForm />
                : "УПС"
            }
        </div>
    );
};

export default PlayerCardForm;
