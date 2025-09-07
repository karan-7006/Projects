import React, { useState, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const [file, setFile] = useState(null);

  // Drag & Drop Handlers
  const handleDrop = useCallback((event) => {
    event.preventDefault();
    const uploadedFile = event.dataTransfer.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  }, []);

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    if (uploadedFile) {
      setFile(uploadedFile);
    }
  };

  return (
    <div>

      {/* Navbar */}
      <nav
        className="navbar navbar-expand-lg navbar-dark shadow-sm sticky-top"
        style={{
          background: "linear-gradient(135deg, #004aad, #011f47ff, #004aad)",
          boxShadow: "0 4px 15px rgba(0,0,0,0.3)"
        }}
      >
        <div className="container">
          {/* Brand */}
          <a
            className="navbar-brand fw-bold fs-3 d-flex align-items-center mx-auto"
            href="#"
          >
            <img
              src="/Logo.png"
              alt="Logo"
              width="45"
              height="45"
              className="me-2 d-inline-block align-text-top"
              style={{ filter: "drop-shadow(0px 0px 6px rgba(0,0,0,0.4))" }}
            />
            <span style={{ color: "#FFFF33", textShadow: "0 0 8px rgba(0, 230, 255, 0.8)" }}>T</span>
            <span style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}>rue</span>-
            <span style={{ color: "#FFFF33", textShadow: "0 0 8px rgba(0, 230, 255, 0.8)" }}>C</span>
            <span style={{ textShadow: "0 0 6px rgba(255,255,255,0.6)" }}>erify</span>
          </a>


          {/* Toggle button for mobile */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Nav Links */}
          <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            {/* <ul className="navbar-nav me-3">
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#home">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#about">About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#features">Features</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#verify">Verify</a>
              </li>
              <li className="nav-item">
                <a className="nav-link fw-semibold" href="#contact">Contact</a>
              </li>
            </ul> */}

            {/* CTA Button */}
            {/* <a 
              href="#verify" 
              className="btn btn-light fw-bold px-4 rounded-pill shadow-sm"
              style={{ transition: "all 0.3s ease" }}
              onMouseOver={(e) => {
                e.target.style.background = "#00e6ff";
                e.target.style.color = "#000";
              }}
              onMouseOut={(e) => {
                e.target.style.background = "#fff";
                e.target.style.color = "#000";
              }}
            >
              Get Started
            </a> */}
          </div>
        </div>
      </nav>


      {/* Hero Section */}
      <header
        className="text-white text-center d-flex align-items-center justify-content-center"
        style={{
          minHeight: "35vh",
          background: "linear-gradient(135deg, #00aeffff, #004aad, #000000ff)",
          backgroundSize: "400% 400%",
          animation: "gradientBG 10s ease infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating bubbles container */}
        <div
          className="bubbles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "-100px",
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "50%",
                filter: "blur(2px)",
                animationName: "rise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${1 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 20}s`,
                zIndex: 0,
              }}
            />
          ))}
        </div>

        {/* Animated Glow Circles */}
        {/* <div
          style={{
            position: "absolute",
            width: "200px",
            height: "200px",
            background: "rgba(250, 250, 250, 0.15)",
            borderRadius: "50%",
            top: "10%",
            left: "15%",
            filter: "blur(80px)",
            animation: "float 8s infinite alternate",
          }}
        ></div>
        <div
          style={{
            position: "absolute",
            width: "300px",
            height: "300px",
            background: "rgba(255,255,255,0.1)",
            borderRadius: "50%",
            bottom: "10%",
            right: "10%",
            filter: "blur(100px)",
            animation: "float 12s infinite alternate-reverse",
          }}
        ></div> */}

        <div className="container position-relative">
          <h1
            className="display-3 fw-bold mb-4"
            style={{
              textShadow: "0 0 15px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 115, 255, 0.6)",
              letterSpacing: "2px",
              lineHeight: "1.1",
              fontFamily: '"Lobster", cursive',
            }}
          >
            Certificate Verification System
          </h1>
          <p
            className="lead fs-4 mb-4"
            style={{
              fontWeight: "600",
              textShadow: "1px 1px 8px rgba(0, 0, 0, 0.4)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            🔐 <span style={{ color: "#0FFF50" }}>Secure</span> • ⚡ <span style={{ color: "#04D9FF" }}>Reliable</span> • ⛓️ <span style={{ color: "#FFFF33" }}>Blockchain-Powered Verification</span>
          </p>

          {/* CTA Button
          <a
            href="#verify"
            className="btn btn-lg fw-bold shadow-lg"
            style={{
              borderRadius: "50px",
              padding: "12px 40px",
              background: "linear-gradient(135deg, #00e6ff, #0072ff)",
              color: "#fff",
              textShadow: "0 2px 6px rgba(0,0,0,0.3)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.background = "linear-gradient(135deg, #0072ff, #00e6ff)";
              e.target.style.transform = "translateY(-3px)";
              e.target.style.boxShadow = "0 12px 25px rgba(0,0,0,0.3)";
            }}
            onMouseOut={(e) => {
              e.target.style.background = "linear-gradient(135deg, #00e6ff, #0072ff)";
              e.target.style.transform = "translateY(0)";
              e.target.style.boxShadow = "0 6px 15px rgba(0,0,0,0.2)";
            }}
          >
            🚀 Start Verification
          </a> */}
        </div>

        {/* CSS Animations */}
        {/* <style>
          {`
            @keyframes gradientBG {
              0% { background-position: 0% 50%; }
              50% { background-position: 100% 50%; }
              100% { background-position: 0% 50%; }
            }
            @keyframes float {
              0% { transform: translateY(0); }
              100% { transform: translateY(-30px); }
            }
          `}
        </style> */}
        {/* CSS Animations injected via style tag */}
        <style>
          {`
      @keyframes rise {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-110vh) scale(1.2);
          opacity: 0;
        }
      }
    `}
        </style>
      </header>


      {/* About Us Section */}
      <section
        className="about-us-section container-fluid py-5 px-5"
        style={{
          background: "linear-gradient(135deg, #000000ff, #004aad)",
          boxShadow: "0 8px 30px rgba(0, 123, 255, 0.2)",
        }}
      >
        {/* Row 1 */}
        <div className="row align-items-center mb-5">
          {/* Image */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.pexels.com/photos/6651190/pexels-photo-6651190.jpeg"
              alt="Certificate Verification"
              className="img-fluid floating-img"
              style={{
                height: "350px",
                width: "90%",
                borderRadius: "15px",
                boxShadow: "0 6px 18px rgba(255, 255, 255, 1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>

          {/* Text */}
          <div className="col-md-6">
            <h2
              className="fw-bold mb-3"
              style={{ color: "#FFFF33", fontFamily: '"Lobster", cursive' }}
            >
              About Our System
            </h2>
            <p
              className="fs-5 mb-4 text"
              style={{ color: "#ffffffff", fontFamily: '"Lobster", cursive' }}
            >
              A <strong>secure & reliable</strong> way to verify certificates with{" "}
              <strong>blockchain technology</strong>. Instantly validate documents,
              reduce forgery, and build trust between institutions, employers, and
              students.
            </p>
            <p
              className="fs-5 mb-4 text"
              style={{ color: "#ffffffff", fontFamily: '"Lobster", cursive' }}
            >
              With a <strong>user-friendly interface</strong>, fast processing, and{" "}
              <strong>robust security standards</strong>, we ensure your credentials
              are <strong>verified instantly</strong> and <strong>accurately</strong>
              . Join thousands of users who trust our{" "}
              <strong>advanced certificate validation</strong> to make informed
              decisions.
            </p>
            <a
              href="#learn-more"
              className="btn btn-lg shadow-sm"
              style={{
                borderRadius: "50px",
                padding: "10px 35px",
                fontWeight: "600",
                backgroundColor: "#FFFF33",
              }}
            >
              Learn More
            </a>
          </div>
        </div>

        {/* Row 2 */}
        <div className="row align-items-center">
          {/* Text */}
          <div className="col-md-6 order-md-1 order-2 mb-4 mb-md-0">
            <h2
              className="fw-bold mb-3"
              style={{ color: "#0FFF50", fontFamily: '"Lobster", cursive' }}
            >
              Advanced Security
            </h2>
            <p
              className="fs-5 mb-4 text"
              style={{ color: "#ffffffff", fontFamily: '"Lobster", cursive' }}
            >
              With <strong>multi-layer encryption</strong> and{" "}
              <strong>digital signatures</strong>, each certificate is timestamped
              and stored on an <strong>immutable blockchain ledger</strong>, ensuring
              tamper-proof verification.
            </p>
            <p
              className="fs-5 mb-4 text"
              style={{ color: "#ffffffff", fontFamily: '"Lobster", cursive' }}
            >
              Whether you're an <strong>educational institution</strong>, employer,
              or certificate holder, our platform provides{" "}
              <strong>instant verification</strong> with detailed{" "}
              <strong>audit trails and compliance </strong> reporting for regulatory
              requirements.
            </p>
            <a
              href="#security-features"
              className="btn btn-lg shadow-sm"
              style={{
                borderRadius: "50px",
                padding: "10px 35px",
                fontWeight: "600",
                backgroundColor: "#0FFF50",
              }}
            >
              View Security
            </a>
          </div>

          {/* Image */}
          <div className="col-md-6 order-md-2 order-1">
            <img
              src="https://images.pexels.com/photos/6661143/pexels-photo-6661143.jpeg"
              alt="Document Verification"
              className="img-fluid floating-img"
              style={{
                height: "350px",
                width: "90%",
                borderRadius: "15px",
                boxShadow: "0 6px 18px rgba(255, 255, 255, 1)",
                transition: "transform 0.3s ease-in-out",
                cursor: "pointer",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>
        </div>

        {/* CSS Animations */}
        <style>
          {`
      @keyframes float {
        0%, 100% {
          transform: translateY(0);
        }
        50% {
          transform: translateY(-15px);
        }
      }
      .floating-img {
        animation: float 4s ease-in-out infinite;
      }
      .floating-img:hover {
        transform: scale(1.1);
        transition: transform 0.3s ease-in-out;
      }
    `}
        </style>
      </section>



      {/* Verification Form */}
      <section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #004aad, #000000ff)",
          backgroundSize: "300% 300%",
          animation: "gradientShift 15s ease infinite",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Floating bubbles container */}
        <div
          className="bubbles"
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            bottom: 0,
            right: 0,
            overflow: "hidden",
            pointerEvents: "none",
            zIndex: 0,
          }}
        >
          {[...Array(10)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "-100px",
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 30}px`,
                height: `${20 + Math.random() * 30}px`,
                background: "rgba(255, 255, 255, 0.15)",
                borderRadius: "50%",
                filter: "blur(2px)",
                animationName: "rise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${1 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 20}s`,
                zIndex: 0,
              }}
            />
          ))}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius: "25px",
                  background: "rgba(132, 181, 218, 0.95)",
                  backdropFilter: "blur(15px)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.02)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0, 100, 255, 0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0, 0, 0, 0.15)";
                }}
              >
                <div className="card-body">
                  <h3
                    className="card-title text-center mb-4 fw-bold"
                    style={{
                      color: "#ffffffff",
                      fontFamily: '"Lobster", cursive',
                      fontWeight: "700",
                      fontSize: "2rem",
                      textShadow: "1px 1px 6px rgba(0, 0, 0, 1)",
                    }}
                  >
                    🔍 <strong>Verify Your Certificate</strong>
                  </h3>

                  {/* Form */}
                  <form>
                    {/* Drag and Drop Upload */}
                    <div
                      className="border border-2 rounded p-5 text-center mb-4"
                      style={{
                        cursor: "pointer",
                        borderStyle: "dashed",
                        background: "#f0f8ff",
                        borderColor: "#0d6efd",
                        transition: "all 0.3s ease",
                      }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById("fileUpload").click()}
                      onMouseOver={(e) => (e.currentTarget.style.background = "#e0f0ff")}
                      onMouseOut={(e) => (e.currentTarget.style.background = "#f0f8ff")}
                    >
                      <input
                        type="file"
                        id="fileUpload"
                        hidden
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {file ? (
                        <p className="fw-semibold text-success">
                          ✅ {file.name} uploaded
                        </p>
                      ) : (
                        <p className="text-muted">
                          Drag & drop your certificate file here, or{" "}
                          <span className="text-primary fw-bold">click to upload</span>
                        </p>
                      )}
                    </div>

                    {/* Verify Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary text-danger w-100 fw-bold py-2"
                        style={{
                          borderRadius: "50px",
                          fontSize: "1.1rem",
                          boxShadow: "0 6px 15px rgba(0,0,0,0.2)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#0FFF50";
                          e.target.style.boxShadow = "0 10px 25px rgba(0, 100, 255, 0.4)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#FFFF33";
                          e.target.style.boxShadow = "0 6px 15px rgba(0, 0, 0, 0.2)";
                        }}
                      >
                        🚀 Verify Now
                      </button>
                    </div>
                  </form>

                  {/* Result Section */}
                  <div
                    className="mt-4 text-center p-3 rounded"
                    style={{
                      background: "#f8faff",
                      border: "1px dashed #0d6efd",
                      color: "#555",
                      fontStyle: "italic",
                    }}
                    id="resultBox"
                  >
                    <p className="mb-0">
                      Upload a certificate file to see instant{" "}
                      <strong>verification results</strong> here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* CSS Animations injected via style tag */}
        <style>
          {`
      @keyframes rise {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-110vh) scale(1.2);
          opacity: 0;
        }
      }
    `}
        </style>
      </section>



      {/* How It Works Section */}
      < section
        className="py-5"
        style={{
          background: "linear-gradient(135deg, #000000ff, #004aad)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="container">
          <h2
            className="fw-bold text-center mb-5 display-5"
            style={{ color: "#ffffffff", fontFamily: '"Lobster", cursive', textShadow: "1px 1px 6px rgba(0,0,0,0.2)" }}
          >
            How It Works
          </h2>

          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-3">
              <div
                className="card h-100 border-0 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#FFFF33",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  📤
                </div>
                <h5 className="fw-bold mb-3">1. Upload Certificate</h5>
                <p className="text-muted fw-bold">
                  Upload your certificate (PDF or image) by dragging & dropping or selecting a file.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-3">
              <div
                className="card h-100 border-0 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#fb35acff",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  🔒
                </div>
                <h5 className="fw-bold mb-3">2. Generate Hash</h5>
                <p className="text-muted fw-bold">
                  The system generates a unique <strong>SHA-256 hash</strong> and stores it securely on the blockchain.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-3">
              <div
                className="card h-100 border-0 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#0FFF50",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  🔍
                </div>
                <h5 className="fw-bold mb-3">3. Verify</h5>
                <p className="text-muted fw-bold">
                  The system cross-checks your uploaded certificate’s hash with blockchain records.
                </p>
              </div>
            </div>

            {/* Step 4 */}
            <div className="col-md-3">
              <div
                className="card h-100 border-0 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#04D9FF",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #f7971e, #ffd200)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  ✅
                </div>
                <h5 className="fw-bold mb-3">4. Get Results</h5>
                <p className="text-muted fw-bold">
                  Instantly know if the certificate is <strong>Valid</strong>, <strong>Tampered</strong>, or <strong>Not Found</strong>.
                </p>
              </div>
            </div>
          </div>
        </div>

      </section >


      {/* Backend Working Section */}
      < section
        className="py-5 text-white"
        style={{
          background: "linear-gradient(135deg, #004aad, #000000ff)",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <div className="container position-relative">
          <h2 className="fw-bold text-center text-primary mb-5 display-5 text-light" style={{ fontFamily: '"Lobster", cursive', textShadow: "1px 1px 4px rgba(0,0,0,0.4)" }}>
            How the Backend Works
          </h2>

          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-4">
              <div
                className="card h-100 border-0 text-center p-4 text-dark"
                style={{
                  borderRadius: "20px",
                  background: "#0FFF50",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                    color: "white",
                    fontSize: "2rem"
                  }}
                >
                  ⚙️
                </div>
                <h5 className="fw-bold mb-3">1. Hash Generation</h5>
                <p className="text-muted fw-bold">
                  Every uploaded certificate is transformed into a <strong>SHA-256 hash</strong>,
                  acting as its unique digital fingerprint.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-4">
              <div
                className="card h-100 border-0 text-center p-4 text-dark"
                style={{
                  borderRadius: "20px",
                  background: "#FFFF33",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                    color: "white",
                    fontSize: "2rem"
                  }}
                >
                  🔗
                </div>
                <h5 className="fw-bold mb-3">2. Blockchain Storage</h5>
                <p className="text-muted fw-bold">
                  The hash is securely stored on an <strong>immutable blockchain ledger</strong>,
                  ensuring tamper-proof verification anytime.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4">
              <div
                className="card h-100 border-0 text-center p-4 text-dark"
                style={{
                  borderRadius: "20px",
                  background: "#fb35acff",
                  boxShadow: "0 8px 30px rgba(0,0,0,0.2)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.3)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 30px rgba(0,0,0,0.2)";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    color: "white",
                    fontSize: "2rem"
                  }}
                >
                  🔍
                </div>
                <h5 className="fw-bold mb-3">3. Verification</h5>
                <p className="text-muted fw-bold">
                  On upload/scan, the certificate’s hash is <strong>cross-checked</strong>
                  with blockchain records. <br />✅ Match → Valid, ⚠ Mismatch → Fake.
                </p>
              </div>
            </div>
          </div>

          {/* Extra Note */}
          <div className="mt-5 text-center">
            <p className="fs-5 fw-semibold fst-italic" style={{ color: "#ffffffff", textShadow: "1px 1px 5px rgba(0,0,0,0.4)" }}>
              🔐 Blockchain ensures <strong>no tampering</strong> — giving universities, employers, and students
              complete <span style={{ color: "#ff0000ff" }}>trust & transparency</span>.
            </p>
          </div>
        </div>
      </section >



      {/* Footer */}
      <footer
        className="text-white pt-5"
        style={{
          background: "linear-gradient(135deg, #000000ff, #003272ff, #004aad)",
          boxShadow: "0 -4px 20px rgba(0, 115, 255, 0.5)",
          fontWeight: "500",
        }}
      >
        <div className="container">
          <div className="row gy-4">

            {/* About Section */}
            <div className="col-md-3">
              <h5 className="fw-bold mb-3">About Us</h5>
              <p style={{ fontSize: "0.95rem", opacity: 0.85 }}>
                TrueCertify is a blockchain-powered platform that ensures
                <strong> secure, tamper-proof certificate verification</strong>
                for universities, employers, and students worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2">
              <h5 className="fw-bold mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><a href="#about" className="text-white text-decoration-none">About</a></li>
                <li><a href="#features" className="text-white text-decoration-none">Features</a></li>
                <li><a href="#verify" className="text-white text-decoration-none">Verify</a></li>
                <li><a href="#faq" className="text-white text-decoration-none">FAQ</a></li>
                <li><a href="#contact" className="text-white text-decoration-none">Contact</a></li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-3">
              <h5 className="fw-bold mb-3">Contact Us</h5>
              <p className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="me-2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4z" />
                  <path d="M.05 4.555L8 9.414l7.95-4.859A1 1 0 0 0 15 4H1a1 1 0 0 0-.95.555z" />
                </svg>
                trulycertify@gmail.com
              </p>
              <p className="mb-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="me-2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M3.654 1.328a.678.678 0 0 1 .746-.07l2.524 1.261a.678.678 0 0 1 .329.572v3.069a.678.678 0 0 1-.678.678H6.746a11.286 11.286 0 0 0 5.102 5.101v-1.029a.678.678 0 0 1 .678-.678h3.07a.678.678 0 0 1 .572.33l1.262 2.524a.678.678 0 0 1-.069.746l-2.487 2.49a2.745 2.745 0 0 1-3.336.49c-2.507-1.29-4.708-3.491-6-6A2.745 2.745 0 0 1 3.654 1.328z" />
                </svg>
                +91 234 567 890
              </p>
              <p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  fill="currentColor"
                  viewBox="0 0 16 16"
                  className="me-2"
                  style={{ verticalAlign: "middle" }}
                >
                  <path d="M12.166 8.94a.5.5 0 0 1-.652.11L8 6.508 4.486 9.05a.5.5 0 0 1-.676-.737l4-4.5a.5.5 0 0 1 .68-.045L12 7.357a.5.5 0 0 1 .166.583z" />
                  <path d="M7.093 1.9a8 8 0 1 0 6.158 12.93L7 14.25V1.9z" />
                </svg>
                SNME Campus, Anasan Gam, Ahmedabad City, Gujarat
              </p>

              <div className="d-flex gap-3 fs-4">
                {/* Facebook SVG */}
                <a href="https://facebook.com/yourprofile" target="_blank" rel="noopener noreferrer" title="Facebook" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M22.675 0H1.325A1.325 1.325 0 000 1.325v21.351A1.325 1.325 0 001.325 24h11.495v-9.294h-3.125v-3.622h3.125V8.413c0-3.1 1.893-4.788 4.658-4.788 1.325 0 2.463.099 2.796.143v3.243l-1.918.001c-1.504 0-1.796.716-1.796 1.764v2.313h3.587l-.467 3.622h-3.12V24h6.116A1.326 1.326 0 0024 22.675V1.325A1.325 1.325 0 0022.675 0z" />
                  </svg>
                </a>

                {/* Twitter SVG */}
                <a href="https://twitter.com/yourprofile" target="_blank" rel="noopener noreferrer" title="Twitter" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M23.954 4.569c-.885.389-1.83.654-2.825.775 1.014-.611 1.794-1.574 2.163-2.723-.951.555-2.005.959-3.127 1.184-.897-.959-2.173-1.56-3.591-1.56-3.179 0-5.515 2.966-4.797 6.045-4.09-.205-7.713-2.164-10.141-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616v.061c0 2.385 1.693 4.374 3.946 4.828-.413.111-.849.171-1.296.171-.314 0-.615-.03-.916-.086.631 1.953 2.445 3.377 4.604 3.416-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.395 4.768 2.209 7.557 2.209 9.142 0 14.307-7.721 13.995-14.646z" />
                  </svg>
                </a>

                {/* Instagram SVG */}
                <a href="https://instagram.com/yourprofile" target="_blank" rel="noopener noreferrer" title="Instagram" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2zm4.5 3a4.5 4.5 0 00-4.5 4.5A4.5 4.5 0 0012 14a4.5 4.5 0 004.5-4.5A4.5 4.5 0 0012 5zm6.406-.094a1.125 1.125 0 11-2.25 0 1.125 1.125 0 012.25 0zM12 8.5a3.5 3.5 0 11-3.5 3.5A3.5 3.5 0 0112 8.5z" />
                  </svg>
                </a>

                {/* LinkedIn SVG */}
                <a href="https://linkedin.com/in/yourprofile" target="_blank" rel="noopener noreferrer" title="LinkedIn" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M22.225 0H1.771C.792 0 0 .77 0 1.722v20.556c0 .952.792 1.722 1.771 1.722h20.451C23.202 24 24 23.23 24 22.278V1.722c0-.952-.798-1.722-1.775-1.722zM7.122 20.452H3.547v-11.6h3.575v11.6zM5.336 7.752a2.069 2.069 0 112.066-2.07 2.07 2.07 0 01-2.066 2.07zM20.452 20.452h-3.576v-5.572c0-1.332-.027-3.042-1.854-3.042-1.854 0-2.136 1.446-2.136 2.939v5.675h-3.575v-11.6h3.434v1.588h.049c.478-.9 1.64-1.852 3.374-1.852 3.608 0 4.273 2.374 4.273 5.458v6.406z" />
                  </svg>
                </a>

                {/* YouTube SVG */}
                <a href="https://youtube.com/channel/yourchannel" target="_blank" rel="noopener noreferrer" title="YouTube" className="text-white">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                    height="24"
                    fill="currentColor"
                  >
                    <path d="M23.498 6.186c-.27-1.022-1.077-1.824-2.107-2.093C19.796 3.5 12 3.5 12 3.5s-7.796 0-9.391.593c-1.03.269-1.837 1.071-2.107 2.093C.5 7.79.5 12 .5 12s0 4.21.002 5.814c.27 1.022 1.077 1.823 2.107 2.093C4.204 20.5 12 20.5 12 20.5s7.796 0 9.391-.593c1.03-.27 1.837-1.07 2.107-2.093.002-1.604.002-5.814.002-5.814s0-4.21-.002-5.814zM9.75 15.02V8.979l6.345 3.018-6.345 3.022z" />
                  </svg>
                </a>
              </div>
            </div>


            {/* Newsletter */}
            <div className="col-md-4">
              <h5 className="fw-bold mb-3">Stay Updated</h5>
              <form className="d-flex mb-3" onSubmit={(e) => e.preventDefault()}>
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control form-control-sm me-2"
                  style={{ borderRadius: "50px", paddingLeft: "15px" }}
                />
                <button type="submit" className="btn btn-danger fw-bold btn-sm rounded-pill px-4">
                  Subscribe
                </button>
              </form>
              <h6 className="fw-bold mb-2">Complaint / Feedback</h6>
              <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                  className="form-control mb-2"
                  rows="2"
                  placeholder="Write your complaint or feedback..."
                  style={{ borderRadius: "10px" }}
                ></textarea>
                <button type="submit" className="btn btn-warning btn-sm fw-bold rounded-pill">
                  Submit
                </button>
              </form>
            </div>
          </div>

          <hr className="my-4" style={{ borderColor: "rgba(255,255,255,0.3)" }} />

          {/* Bottom Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <small style={{ opacity: 0.8 }}>
              © 2025 <strong>TrueCertify</strong>. All rights reserved.
            </small>
            <div className="mt-3 mt-md-0">
              <a href="#privacy" className="text-white text-decoration-none me-3">Privacy Policy</a>
              <a href="#terms" className="text-white text-decoration-none">Terms of Service</a>
            </div>
          </div>
        </div>
      </footer>


    </div >
  );
}
