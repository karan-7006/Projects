import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';

export default function Login() {

    useEffect(() => {
        if (localStorage.getItem("userId")) {
            redirect("/")
        }
    }, [])

    const [form, setform] = useState({
        email: "",
        password: ""
    })

    const redirect = useNavigate();

    const getchange = (e) => {
        setform({
            ...form,
            [e.target.name]: e.target.value
        })
        console.log(form)
    }

    const submit = async (e) => {
        e.preventDefault();

        try {
            
            const { email, password } = form 

            if (email === ""  || password === "") {
                console.log("Please Fill required details")
                toast.error("Please Fill required details")
                return false
            }

            // Email Match 
            const res = await axios.get(`http://localhost:3000/user?email=${email}`)
            console.log(res.data)
            if (res.data.length === 0) {
                console.log("Email Does not Match")
                toast.error("Email Does not Match")
                return false
            }

            let user = res.data[0]

            // Status Check
            if (user.status === "block") {
                console.log("Your Account has been Blocked")
                toast.error("Your Account has been Blocked")
                return false
            }

            // Password Match
            if (user.password !== password) {
                console.log("Password Does not Match")
                toast.error("Password Does not Match")
                return false
            }

            localStorage.setItem("userId", user.id)
            localStorage.setItem("username", user.name)
            redirect("/")
            console.log("Login Successfull")
            toast.success("Login Successfull")


        } catch (error) {
            
        }

    }

    return (
        <div>
            <div
                className="min-vh-100 d-flex align-items-center justify-content-center"
                style={{
                    backgroundImage: "url('https://images.pexels.com/photos/3368816/pexels-photo-3368816.jpeg')",
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                }}
            >
                <div className="bg-primary-subtle p-5 shadow" style={{ width: '100%', maxWidth: '600px', borderRadius:'50px' }}>
                    <h2
                        className="text-center display-5 fw-bold mb-4 text-primary"
                    >
                        <u>Login</u>
                    </h2>

                    <form onSubmit={submit}>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label fw-semibold">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={form.email}
                                onChange={getchange}
                                className="form-control"
                                placeholder="Enter your Email"
                                required
                            />
                        </div>

                        <div className="mb-4">
                            <label htmlFor="password" className="form-label fw-semibold">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={form.password}
                                onChange={getchange}
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                        </div>

                        <button type="submit" className="btn btn-primary w-100">
                            Login
                        </button>
                    </form>

                    <div className="text-center mt-3">
                        <a href="#" className="text-decoration-none text-primary">
                            Forgot Password?
                        </a>
                    </div>

                    <div className="text-center mt-3">
                        <p className="text-muted">
                            Don't have an account?{' '}
                            <NavLink to="/Register" className="text-decoration-none text-primary">
                                Register
                            </NavLink>
                        </p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
