import React from "react";
import authStore from "../stores/authStore";
import { useNavigate } from "react-router-dom";

const LoginForm = () => {
    const store = authStore();
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();

        await store.login();

        //Navigate
        navigate("/")
    }

    return(
        <form onSubmit={handleSubmit}>
            <input onChange={store.updateLoginForm} value={store.loginForm.email} type="email" name="email" />
            <input onChange={store.updateLoginForm} value={store.loginForm.password} type="password" name="password" />
            <button type="submit">Login</button>
        </form>
    )
}

export default LoginForm;