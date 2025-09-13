import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

function UserEdit() {
    const redirect = useNavigate();

    const [user, setUser] = useState({
        id: "",
        name: "",
        email: "",
        password: "",
        type: "",
        status: ""
    });

    const [showPassword, setShowPassword] = useState(false);

    useEffect(() => {
        getData();
    }, []);

    const getData = async () => {
        try {
            const res = await axios.get(
                `http://localhost:3000/user/${localStorage.getItem("userId")}`
            );
            setUser(res.data);
        } catch (err) {
            console.error("Error fetching user:", err);
            toast.error("Failed to load profile data");
        }
    };

    const getChange = (e) => {
        setUser({
            ...user,
            [e.target.name]: e.target.value
        });
    };

    const updateData = async (e) => {
        e.preventDefault();

        try {
            if (!user.email.trim() || !user.password.trim() || !user.name.trim()) {
                toast.error("Please fill all required details");
                return false;
            }

            const res = await axios.patch(
                `http://localhost:3000/user/${user.id}`,
                user
            );

            localStorage.setItem("username", res.data.name);
            toast.success("Profile Updated");
            redirect("/");
        } catch (error) {
            console.error("Update failed:", error);
            toast.error("Failed to update profile");
        }
    };

    return (
        <div
            className="d-flex align-items-center justify-content-center min-vh-100"
            style={{
                backgroundImage: "url('https://images.pexels.com/photos/4862865/pexels-photo-4862865.jpeg')",
                backgroundSize: "cover",
                backgroundPosition: "center"
            }}
        >
            <div
                className="p-5 shadow-lg"
                style={{
                    width: "100%",
                    maxWidth: "600px",
                    borderRadius: "25px",
                    background: "rgba(18, 18, 18, 0.95)",
                    border: "3px solid #9BEB46",
                    boxShadow: "0 0 25px rgba(155, 235, 70, 0.6)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
            >
                <h2
                    className="text-center fw-bold mb-4"
                    style={{
                        color: "#9BEB46",
                        fontFamily: "Papyrus, fantasy",
                        textShadow: "0 0 12px rgba(155, 235, 70, 0.8)"
                    }}
                >
                    <u>Edit Your Profile</u>
                </h2>

                <form onSubmit={updateData}>
                    {/* Type Dropdown */}
                    <div className="mb-3">
                        <label htmlFor="type" className="form-label fw-semibold text-white">
                            Type
                        </label>
                        <select
                            id="type"
                            name="type"
                            value={user.type}
                            onChange={getChange}
                            className="form-select"
                            required
                        >
                            <option value="">-- Select Type --</option>
                            <option value="Company">Company</option>
                            <option value="University">University</option>
                        </select>
                    </div>

                    {/* Name */}
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label fw-semibold text-white">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={user.name}
                            onChange={getChange}
                            className="form-control"
                            placeholder="Enter your name"
                            required
                        />
                    </div>

                    {/* Email */}
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label fw-semibold text-white">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={getChange}
                            className="form-control"
                            placeholder="Enter your email"
                            required
                        />
                    </div>

                    {/* Password with Show/Hide */}
                    <div className="mb-4">
                        <label
                            htmlFor="password"
                            className="form-label fw-semibold text-white"
                        >
                            Password
                        </label>
                        <div className="input-group">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                value={user.password}
                                onChange={getChange}
                                className="form-control"
                                placeholder="Enter your password"
                                required
                            />
                            <button
                                type="button"
                                className="btn btn-outline-light"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {/* Submit */}
                    <button
                        type="submit"
                        className="btn w-100 fw-bold"
                        style={{
                            background: "#9BEB46",
                            color: "#121212",
                            borderRadius: "50px",
                            boxShadow: "0 0 15px rgba(155, 235, 70, 0.6)",
                            transition: "all 0.3s ease-in-out",
                        }}
                        onMouseOver={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                            e.currentTarget.style.boxShadow =
                                "0 0 25px rgba(155, 235, 70, 0.2), 0 0 50px rgba(155, 235, 70, 0.6)";
                        }}
                        onMouseOut={(e) => {
                            e.currentTarget.style.transform = "scale(1)";
                            e.currentTarget.style.boxShadow =
                                "0 0 15px rgba(155, 235, 70, 0.6)";
                        }}
                        onMouseDown={(e) => {
                            e.currentTarget.style.transform = "scale(0.97)";
                        }}
                        onMouseUp={(e) => {
                            e.currentTarget.style.transform = "scale(1.05)";
                        }}
                    >
                        Update Profile
                    </button>

                </form>
            </div>
        </div>
    );
}

export default UserEdit;
