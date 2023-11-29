"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { useRouter } from "next/navigation";


const RegisterForm = () => {
    const [registerForm, setRegisterForm] = useState({
        username: '',
        email: '',
        password: '',
    });

    const router = useRouter()

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterForm({ ...registerForm, [name]: value });
    };

    const handleSubmit = async (e) => {
        try {

            e.preventDefault();
            const { data } = await axios.post("/api/register", registerForm);
            if (data) {
                toast.success(data?.message)
                router.push("/login")
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response.data.error)
        }
    };

    return (
        <div className="container py-4">
            <h2>Register</h2>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="username" className="form-label">
                        Username
                    </label>
                    <input
                        type="text"
                        className="form-control"
                        id="username"
                        name="username"
                        value={registerForm.username}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={registerForm.email}
                        onChange={handleRegisterChange}
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
                        value={registerForm.password}
                        onChange={handleRegisterChange}
                        required
                    />
                </div>

                <button type="submit" className="btn btn-primary">
                    Register
                </button>
            </form>
        </div>
    );
};

export default RegisterForm;