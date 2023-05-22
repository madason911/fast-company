import React, { useState } from "react";
import { useParams } from "react-router";
import PlayerCardForm from "../components/ui/playerCardForm";
import TeamCardForm from "../components/ui/teamCardForm";

const CardForm = () => {
    const { type } = useParams();
    const [formType] = useState(
        type === "player" ? type : "team"
    );
    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 auth_form">
                    {formType === "player" ? (
                        <>
                            <h3 className="mb-4">Создание карточки игрока</h3>
                            <PlayerCardForm />
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Создание карточки команды</h3>
                            <TeamCardForm />
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default CardForm;
