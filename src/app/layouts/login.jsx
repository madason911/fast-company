import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
    const { type } = useParams();
    const [formType, setFormType] = useState(
        type === "register" ? type : "login"
    );
    const toggleFormType = (params) => {
        setFormType((prevState) =>
            prevState === "register" ? "login" : "register"
        );
    };

    return (
        <div className="container mt-5">
            <div className="row">
                <div className="col-md-6 offset-md-3 shadow p-4 auth_form">
                    {formType === "register" ? (
                        <>
                            <h3 className="mb-4">Регистрация</h3>
                            <RegisterForm />
                            <p>
                                Есть аккаунт?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Авторизуйтесь
                                </a>
                            </p>
                        </>
                    ) : (
                        <>
                            <h3 className="mb-4">Авторизация</h3>
                            <LoginForm />
                            <p>
                                Нет аккаунта?{" "}
                                <a role="button" onClick={toggleFormType}>
                                    {" "}
                                    Зарегистрируйся
                                </a>
                            </p>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};
export default Login;
