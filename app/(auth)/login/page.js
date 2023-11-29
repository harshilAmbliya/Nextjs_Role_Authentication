"use client";

import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";



const LoginForm = () => {
    const [loginForm, setLoginForm] = useState({
        email: '',
        password: '',
    });

    const router = useRouter()

    const handleLoginChange = (e) => {
        const { name, value } = e.target;
        setLoginForm({ ...loginForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const { data } = await axios.post("/api/login", loginForm);

            if (data) {
                toast.success(data?.message);
                // localStorage.setItem("authorizationToken", data?.token);
                Cookies.set("authorizationToken", data?.token)
                router.push("/")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error)
        }
    };

    return (
        <>
            <h2 className="text-center py-4">Login</h2>
            <div className="container  d-flex justify-content-center  align-items-center ">

                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="username" className="form-label">
                            Email
                        </label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            name="email"
                            value={loginForm.username}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">
                            Password
                        </label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            name="password"
                            value={loginForm.password}
                            onChange={handleLoginChange}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary">
                        Login
                    </button>
                </form>
            </div>
        </>
    );
};

export default LoginForm;