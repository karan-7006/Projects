import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

export default function Login() {
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("userId")) {
      navigate("/");
    }
  }, [navigate]);

  const [form, setForm] = useState({
    email: "",
    password: ""
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { email, password } = form;

    if (!email || !password) {
      toast.error("Please fill in all required fields.");
      return;
    }

    try {
      const res = await axios.get(
        `http://localhost:3000/user?email=${email}`
      );

      if (res.data.length === 0) {
        toast.error("Email does not exist.");
        return;
      }

      const user = res.data[0];

      if (user.status === "block") {
        toast.error("Your account has been blocked.");
        return;
      }

      if (user.password !== password) {
        toast.error("Incorrect password.");
        return;
      }

      // ✅ Save user details in localStorage
      localStorage.setItem("userId", user.id);
      localStorage.setItem("username", user.name);
      localStorage.setItem("userRole", user.type.toLowerCase());


      if (user.type) {
        localStorage.setItem("userRole", user.type.toLowerCase());
      } else {
        localStorage.removeItem("userRole");
      }

      toast.success("Login successful!");
      navigate("/");
    } catch (error) {
      toast.error("Login failed. Please try again.");
      console.error(error);
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
          <u>Login Page</u>
        </h2>

        <form onSubmit={handleSubmit}>
          {/* Email */}
          <div className="mb-3">
            <label htmlFor="email" className="form-label fw-semibold text-white">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              className="form-control"
              placeholder="Enter your Email"
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
                value={form.password}
                onChange={handleChange}
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
            Login
          </button>
        </form>

        {/* Forgot password */}
        <div className="text-center mt-3">
          <button
            type="button"
            className="btn btn-link text-decoration-none"
            style={{ color: "#9BEB46" }}
            onClick={() =>
              toast.info("Forgot Password functionality not implemented.")
            }
          >
            Forgot Password?
          </button>
        </div>

        {/* Register link */}
        <div className="text-center mt-3">
          <p className="text-light">
            Don&apos;t have an account?{" "}
            <NavLink
              to="/registration"
              className="text-decoration-none"
              style={{ color: "#9BEB46" }}
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
}
