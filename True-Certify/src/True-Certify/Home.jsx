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
          backgroundColor: "#121212",
          borderBottom: "2px solid #9BEB46",
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.6)",
        }}
      >
        <div className="container">
          {/* Brand */}
          <a
            className="navbar-brand fw-bold fs-3 d-flex align-items-center mx-auto"
            href="#"
            style={{ fontFamily: "Papyrus, fantasy" }}
          >
            <img
              src="/Logo.png"
              alt="Logo"
              width="45"
              height="45"
              className="me-2 d-inline-block align-text-top"
              style={{ filter: "drop-shadow(0px 0px 6px rgba(155,235,70,0.8))" }}
            />
            <span
              style={{
                color: "#9BEB46",
                textShadow: "0 0 10px rgba(155,235,70,0.9), 0 0 20px rgba(155,235,70,0.6)",
              }}
            >
              T
            </span>
            <span style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>rue</span>
            <span
              style={{
                color: "#9BEB46",
                textShadow: "0 0 10px rgba(155,235,70,0.9), 0 0 20px rgba(155,235,70,0.6)",
              }}
            >
              C
            </span>
            <span style={{ textShadow: "0 0 8px rgba(255,255,255,0.6)" }}>ertify</span>
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
          {/* <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
            <ul className="navbar-nav me-3">
              {["Home", "About", "Features", "Verify", "Contact"].map((item, idx) => (
                <li className="nav-item" key={idx}>
                  <a
                    className="nav-link fw-semibold"
                    href={`#${item.toLowerCase()}`}
                    style={{
                      color: "#fff",
                      textShadow: "0 0 6px rgba(255,255,255,0.4)",
                      transition: "all 0.3s ease",
                    }}
                    onMouseOver={(e) => {
                      e.target.style.color = "#9BEB46";
                      e.target.style.textShadow =
                        "0 0 10px rgba(155,235,70,0.9), 0 0 25px rgba(155,235,70,0.6)";
                    }}
                    onMouseOut={(e) => {
                      e.target.style.color = "#fff";
                      e.target.style.textShadow = "0 0 6px rgba(255,255,255,0.4)";
                    }}
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>

            CTA Button
            <a
              href="#verify"
              className="btn fw-bold px-4 rounded-pill"
              style={{
                backgroundColor: "#9BEB46",
                color: "#121212",
                boxShadow: "0 0 15px rgba(155,235,70,0.6)",
                transition: "all 0.3s ease",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#7ED321";
                e.target.style.boxShadow = "0 0 20px rgba(126,211,33,0.9)";
                e.target.style.transform = "translateY(-2px)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#9BEB46";
                e.target.style.boxShadow = "0 0 15px rgba(155,235,70,0.6)";
                e.target.style.transform = "translateY(0)";
              }}
            >
              🚀 Get Started
            </a>
          </div> */}
        </div>
      </nav>



      {/* Hero Section */}
      <header
        className="text-white text-center d-flex align-items-center justify-content-center pt-4"
        style={{
          minHeight: "40vh",
          backgroundColor: "#121212",
          position: "relative",
          overflow: "hidden",
          borderBottom: "2px solid #9BEB46",
        }}
      >
        {/* Floating neon bubbles */}
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
          {[...Array(12)].map((_, i) => (
            <div
              key={i}
              style={{
                position: "absolute",
                bottom: "-100px",
                left: `${Math.random() * 100}%`,
                width: `${20 + Math.random() * 35}px`,
                height: `${20 + Math.random() * 35}px`,
                background: "rgba(155, 235, 70, 0.18)", // Neon green glow
                borderRadius: "50%",
                filter: "blur(4px)",
                animationName: "rise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${3 + Math.random() * 6}s`,
                animationDelay: `${Math.random() * 12}s`,
                zIndex: 0,
              }}
            />
          ))}
        </div>

        <div className="container position-relative" style={{ zIndex: 1 }}>
          {/* Title */}
          <h1
            className="display-3 fw-bold mb-4"
            style={{
              color: "#ffffffff",
              fontFamily: "Papyrus, fantasy",
              textShadow:
                "0 0 12px rgba(155, 235, 70, 0.8), 0 0 25px rgba(155, 235, 70, 0.6)",
              letterSpacing: "2px",
              lineHeight: "1.2",
            }}
          >
            Certificate Verification System
          </h1>

          {/* Subtitle */}
          <p
            className="lead fs-4 mb-4 fw-bold"
            style={{
              fontFamily: "Georgia",
              color: "#fff",
              textShadow: "0 0 8px rgba(0,0,0,0.6)",
              maxWidth: "750px",
              margin: "0 auto",
            }}
          >
            🔐 <span style={{ color: "#0FFF50" }}>Secure</span> • ⚡{" "}
            <span style={{ color: "#04D9FF" }}>Reliable</span> • ⛓️{" "}
            <span style={{ color: "#FFFF33" }}>Blockchain-Powered Verification</span>
          </p>

          {/* CTA Button */}
          {/* <a
            href="#verify"
            className="btn btn-lg fw-bold shadow-lg"
            style={{
              borderRadius: "50px",
              padding: "12px 40px",
              backgroundColor: "#9BEB46",
              color: "#121212",
              textShadow: "0 0 6px rgba(0,0,0,0.6)",
              boxShadow: "0 0 20px rgba(155, 235, 70, 0.6)",
              transition: "all 0.3s ease",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#7ED321";
              e.target.style.boxShadow = "0 0 25px rgba(126, 211, 33, 0.9)";
              e.target.style.transform = "translateY(-3px)";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "#9BEB46";
              e.target.style.boxShadow = "0 0 20px rgba(155, 235, 70, 0.6)";
              e.target.style.transform = "translateY(0)";
            }}
          >
            🚀 Start Verification
          </a> */}
        </div>

        {/* CSS Animations */}
        <style>
          {`
      @keyframes rise {
        0% {
          transform: translateY(0) scale(1);
          opacity: 0.7;
        }
        100% {
          transform: translateY(-110vh) scale(1.3);
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
          backgroundColor: "#121212",
          boxShadow: "0 8px 30px rgba(155, 235, 70, 0.2)",
          borderTop: "2px solid #9BEB46",
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
                border: "2px solid #9BEB46",
                boxShadow: "0 0 20px #9BEB46",
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
              style={{ color: "#9BEB46", fontFamily: "Papyrus, fantasy" }}
            >
              About Our System
            </h2>
            <p
              className="fs-5 mb-4"
              style={{ color: "#fff", fontFamily: "Georgia" }}
            >
              A <strong>secure & reliable</strong> way to verify certificates with{" "}
              <strong>blockchain technology</strong>. Instantly validate documents,
              reduce forgery, and build trust between institutions, employers, and
              students.
            </p>
            <p
              className="fs-5 mb-4"
              style={{ color: "#fff", fontFamily: "Georgia" }}
            >
              With a <strong>user-friendly interface</strong>, fast processing, and{" "}
              <strong>robust security standards</strong>, we ensure your credentials
              are <strong>verified instantly</strong> and <strong>accurately</strong>.
              Join thousands of users who trust our{" "}
              <strong>advanced certificate validation</strong> to make informed
              decisions.
            </p>
            <a
              href="#learn-more"
              className="btn btn-lg fw-bold shadow-sm"
              style={{
                borderRadius: "50px",
                padding: "10px 35px",
                background: "#9BEB46",
                color: "#121212",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#7ED321")}
              onMouseOut={(e) => (e.target.style.background = "#9BEB46")}
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
              style={{ color: "#9BEB46", fontFamily: "Papyrus, fantasy" }}
            >
              Advanced Security
            </h2>
            <p
              className="fs-5 mb-4"
              style={{ color: "#fff", fontFamily: "Georgia" }}
            >
              With <strong>multi-layer encryption</strong> and{" "}
              <strong>digital signatures</strong>, each certificate is timestamped
              and stored on an <strong>immutable blockchain ledger</strong>, ensuring
              tamper-proof verification.
            </p>
            <p
              className="fs-5 mb-4"
              style={{ color: "#fff", fontFamily: "Georgia" }}
            >
              Whether you're an <strong>educational institution</strong>, employer,
              or certificate holder, our platform provides{" "}
              <strong>instant verification</strong> with detailed{" "}
              <strong>audit trails and compliance reporting</strong> for regulatory
              requirements.
            </p>
            <a
              href="#security-features"
              className="btn btn-lg fw-bold shadow-sm"
              style={{
                borderRadius: "50px",
                padding: "10px 35px",
                background: "#9BEB46",
                color: "#121212",
                transition: "0.3s",
              }}
              onMouseOver={(e) => (e.target.style.background = "#7ED321")}
              onMouseOut={(e) => (e.target.style.background = "#9BEB46")}
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
                border: "2px solid #9BEB46",
                boxShadow: "0 0 20px #9BEB46",
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
        transform: scale(1.08);
        transition: transform 0.3s ease-in-out;
        box-shadow: 0 0 30px #9BEB46;
      }
    `}
        </style>
      </section>




      {/* Verification Form */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#121212",
          backgroundSize: "300% 300%",
          position: "relative",
          overflow: "hidden",
          borderTop: "2px solid #9BEB46",
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
                background: "rgba(155, 235, 70, 0.15)",
                borderRadius: "50%",
                filter: "blur(3px)",
                animationName: "rise",
                animationTimingFunction: "linear",
                animationIterationCount: "infinite",
                animationDuration: `${3 + Math.random() * 5}s`,
                animationDelay: `${Math.random() * 10}s`,
                zIndex: 0,
              }}
            />
          ))}
        </div>

        <div className="container" style={{ position: "relative", zIndex: 1 }}>
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div
                className="card border-0 p-4"
                style={{
                  borderRadius: "25px",
                  background: "rgba(18, 18, 18, 0.95)",
                  border: "2px solid #9BEB46",
                  boxShadow: "0 0 25px rgba(155, 235, 70, 0.4)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "scale(1.03)";
                  e.currentTarget.style.boxShadow =
                    "0 0 40px rgba(155, 235, 70, 0.7)";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "scale(1)";
                  e.currentTarget.style.boxShadow =
                    "0 0 25px rgba(155, 235, 70, 0.4)";
                }}
              >
                <div className="card-body">
                  <h3
                    className="card-title text-center mb-4 fw-bold"
                    style={{
                      color: "#ffffffff",
                      fontFamily: "Papyrus, fantasy",
                      fontWeight: "700",
                      fontSize: "2rem",
                      textShadow: "0 0 8px rgba(155, 235, 70, 0.9)",
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
                        background: "#1a1a1a",
                        borderColor: "#9BEB46",
                        color: "#ccc",
                        transition: "all 0.3s ease",
                      }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById("fileUpload").click()}
                      onMouseOver={(e) =>
                        (e.currentTarget.style.background = "#2a2a2a")
                      }
                      onMouseOut={(e) =>
                        (e.currentTarget.style.background = "#1a1a1a")
                      }
                    >
                      <input
                        type="file"
                        id="fileUpload"
                        hidden
                        onChange={handleFileChange}
                        accept=".pdf,.jpg,.jpeg,.png"
                      />
                      {file ? (
                        <p className="fw-semibold" style={{ color: "#9BEB46" }}>
                          ✅ {file.name} uploaded
                        </p>
                      ) : (
                        <p className="fw-bold" style={{ color: "#aaa" }}>
                          Drag & drop your certificate file here, or{" "}
                          <span style={{ color: "#9BEB46" }}>click to upload</span>
                        </p>
                      )}
                    </div>

                    {/* Verify Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn w-100 fw-bold py-2"
                        style={{
                          borderRadius: "50px",
                          fontSize: "1.1rem",
                          background: "#9BEB46",
                          color: "#121212",
                          boxShadow: "0 0 15px rgba(155, 235, 70, 0.6)",
                          transition: "all 0.3s ease",
                        }}
                        onMouseOver={(e) => {
                          e.target.style.backgroundColor = "#7ED321";
                          e.target.style.boxShadow =
                            "0 0 25px rgba(126, 211, 33, 0.9)";
                        }}
                        onMouseOut={(e) => {
                          e.target.style.backgroundColor = "#9BEB46";
                          e.target.style.boxShadow =
                            "0 0 15px rgba(155, 235, 70, 0.6)";
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
                      background: "#1a1a1a",
                      border: "1px dashed #9BEB46",
                      color: "#9BEB46",
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

        {/* CSS Animations */}
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
          backgroundColor: "#121212",
          position: "relative",
          overflow: "hidden",
          borderTop: "2px solid #9BEB46",

        }}
      >
        <div className="container">
          <h2
            className="fw-bold text-center mb-5 display-5"
            style={{ color: "#ffffffff", fontFamily: "Papyrus, fantasy", textShadow: "1px 1px 6px rgba(0,0,0,0.2)" }}
          >
            How It Works
          </h2>

          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-3">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46", 
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46"; 
                  e.currentTarget.style.borderColor = "#7ED321"; 
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #e7f042ff, #e9bb11ff)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  📤
                </div>
                <h5 className="fw-bold mb-3" style={{ fontFamily: "Papyrus, fantasy" , color: "#9BEB46" }}>1. Upload Certificate</h5>
                <p className="text-light fw-bold" style={{ fontFamily: "Georgia" }}>
                  Upload your certificate (PDF or image) by dragging & dropping or selecting a file.
                </p>
              </div>
            </div>


            {/* Step 2 */}
            <div className="col-md-3">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46", 
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46";
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px", height: "70px", borderRadius: "50%",
                    background: "linear-gradient(135deg, #4383e9ff, #00b7ffff)",
                    color: "#fff", fontSize: "2rem"
                  }}
                >
                  🔒
                </div>
                <h5 className="fw-bold mb-3" style={{ fontFamily: "Papyrus, fantasy" , color: "#9BEB46" }}>2. Generate Hash</h5>
                <p className="text-light fw-bold" style={{ fontFamily: "Georgia" }}>
                  The system generates a unique <strong>SHA-256 hash</strong> and stores it securely on the blockchain.
                </p>
              </div>
            </div>


            {/* Step 3 */}
            <div className="col-md-3">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46",  
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46"; // ✅ Neon glow
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
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
                  🔍
                </div>
                <h5 className="fw-bold mb-3" style={{ fontFamily: "Papyrus, fantasy" , color: "#9BEB46" }}>3. Verify</h5>
                <p className="text-light fw-bold" style={{ fontFamily: "Georgia" }}>
                  The system cross-checks your uploaded certificate’s hash with blockchain records.
                </p>
              </div>
            </div>


            {/* Step 4 */}
            <div className="col-md-3">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease"
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow = "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46";
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow = "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
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
                  ✅
                </div>
                <h5 className="fw-bold mb-3" style={{ fontFamily: "Papyrus, fantasy" ,color: "#9BEB46" }}>4. Get Results</h5>
                <p className="text-light fw-bold" style={{ fontFamily: "Georgia" }}>
                  Instantly know if the certificate is <strong>Valid</strong>, <strong>Tampered</strong>, or <strong>Not Found</strong>.
                </p>
              </div>
            </div>

          </div>
        </div>

      </section >


      {/* Backend Working Section */}
      <section
        className="py-5"
        style={{
          backgroundColor: "#121212",
          position: "relative",
          overflow: "hidden",
          borderTop: "2px solid #9BEB46",

        }}
      >
        <div className="container">
          <h2
            className="fw-bold text-center mb-5 display-5"
            style={{
              color: "#ffffffff",
              fontFamily: "Papyrus, fantasy",
              textShadow: "1px 1px 6px rgba(0,0,0,0.2)",
            }}
          >
            How the Backend Works
          </h2>

          <div className="row g-4">
            {/* Step 1 */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46";
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #ff758c, #ff7eb3)",
                    color: "#fff",
                    fontSize: "2rem",
                  }}
                >
                  ⚙️
                </div>
                <h5
                  className="fw-bold mb-3"
                  style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
                >
                  1. Hash Generation
                </h5>
                <p
                  className="text-light fw-bold"
                  style={{ fontFamily: "Georgia" }}
                >
                  Every uploaded certificate is transformed into a{" "}
                  <strong>SHA-256 hash</strong>, acting as its unique digital
                  fingerprint.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46";
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #00c6ff, #0072ff)",
                    color: "#fff",
                    fontSize: "2rem",
                  }}
                >
                  🔗
                </div>
                <h5
                  className="fw-bold mb-3"
                  style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
                >
                  2. Blockchain Storage
                </h5>
                <p
                  className="text-light fw-bold"
                  style={{ fontFamily: "Georgia" }}
                >
                  The hash is securely stored on an{" "}
                  <strong>immutable blockchain ledger</strong>, ensuring
                  tamper-proof verification anytime.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="col-md-4">
              <div
                className="card h-100 text-center p-4"
                style={{
                  borderRadius: "20px",
                  background: "#121212",
                  border: "2px solid #9BEB46",
                  boxShadow: "0 8px 25px rgba(0,0,0,0.15)",
                  transition:
                    "transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease",
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.transform = "translateY(-10px)";
                  e.currentTarget.style.boxShadow =
                    "0 15px 40px rgba(0,0,0,0.25), 0 0 15px #9BEB46";
                  e.currentTarget.style.borderColor = "#7ED321";
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.boxShadow =
                    "0 8px 25px rgba(0,0,0,0.15)";
                  e.currentTarget.style.borderColor = "#9BEB46";
                }}
              >
                <div
                  className="mx-auto mb-3 d-flex align-items-center justify-content-center"
                  style={{
                    width: "70px",
                    height: "70px",
                    borderRadius: "50%",
                    background: "linear-gradient(135deg, #43e97b, #38f9d7)",
                    color: "#fff",
                    fontSize: "2rem",
                  }}
                >
                  🔍
                </div>
                <h5
                  className="fw-bold mb-3"
                  style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
                >
                  3. Verification
                </h5>
                <p
                  className="text-light fw-bold"
                  style={{ fontFamily: "Georgia"}}
                >
                  On upload/scan, the certificate’s hash is{" "}
                  <strong>cross-checked</strong> with blockchain records. <br /> ✅
                  Match → Valid, ⚠ Mismatch → Fake.
                </p>
              </div>
            </div>
          </div>

          {/* Extra Note */}
          <div className="mt-5 text-center">
            <p
              className="fs-5 fw-semibold fst-italic"
              style={{
                color: "#ffffffff",
                textShadow: "1px 1px 5px rgba(0,0,0,0.4)",
                fontFamily: "Georgia",
              }}
            >
              🔐 Blockchain ensures <strong>no tampering</strong> — giving
              universities, employers, and students complete{" "}
              <span style={{ color: "#ff0000ff" }}>trust & transparency</span>.
            </p>
          </div>
        </div>
      </section>




      {/* Footer */}
      <footer
        className="pt-5 text-white"
        style={{
          backgroundColor: "#121212",
          borderTop: "2px solid #9BEB46",
          boxShadow: "0 -6px 25px rgba(155, 235, 70, 0.3)",
          fontFamily: "Courier, monospace",
        }}
      >
        <div className="container">
          <div className="row gy-4">
            {/* About Section */}
            <div className="col-md-3">
              <h5
                className="fw-bold mb-3"
                style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
              >
                About Us
              </h5>
              <p style={{ fontSize: "0.95rem", opacity: 0.85, fontFamily: "Georgia" }}>
                <strong>TrueCertify</strong> is a blockchain-powered platform that
                ensures <strong>secure, tamper-proof certificate verification</strong>{" "}
                for universities, employers, and students worldwide.
              </p>
            </div>

            {/* Quick Links */}
            <div className="col-md-2">
              <h5
                className="fw-bold mb-3"
                style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
              >
                Quick Links
              </h5>
              <ul className="list-unstyled">
                <li>
                  <a href="#about" className="text-white text-decoration-none" style={{fontFamily: "Georgia"}}>
                    About
                  </a>
                </li>
                <li>
                  <a href="#features" className="text-white text-decoration-none" style={{fontFamily: "Georgia"}}>
                    Features
                  </a>
                </li>
                <li>
                  <a href="#verify" className="text-white text-decoration-none" style={{fontFamily: "Georgia"}}>
                    Verify
                  </a>
                </li>
                <li>
                  <a href="#faq" className="text-white text-decoration-none" style={{fontFamily: "Georgia"}}>
                    FAQ
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-white text-decoration-none" style={{fontFamily: "Georgia"}}>
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div className="col-md-3">
              <h5
                className="fw-bold mb-3"
                style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
              >
                Contact Us
              </h5>
              <p className="mb-1" style={{fontFamily: "Georgia"}}>📧 trulycertify@gmail.com</p>
              <p className="mb-1" style={{fontFamily: "Georgia"}}>📞 +91 234 567 890</p>
              <p style={{fontFamily: "Georgia"}}>📍 SNME Campus, Anasan Gam, Ahmedabad City, Gujarat</p>

              {/* Social Icons */}
              <div className="d-flex gap-3 fs-4 mt-3">
                <a
                  href="https://facebook.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#9BEB46")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <i className="bi bi-facebook"></i>
                </a>
                <a
                  href="https://twitter.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#9BEB46")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <i className="bi bi-twitter"></i>
                </a>
                <a
                  href="https://instagram.com/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#9BEB46")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <i className="bi bi-instagram"></i>
                </a>
                <a
                  href="https://linkedin.com/in/yourprofile"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#9BEB46")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <i className="bi bi-linkedin"></i>
                </a>
                <a
                  href="https://youtube.com/channel/yourchannel"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-white"
                  style={{ transition: "0.3s" }}
                  onMouseOver={(e) => (e.currentTarget.style.color = "#9BEB46")}
                  onMouseOut={(e) => (e.currentTarget.style.color = "#fff")}
                >
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>

            {/* Newsletter & Complaint */}
            <div className="col-md-4">
              <h5
                className="fw-bold mb-3"
                style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
              >
                Stay Updated
              </h5>
              <form
                className="d-flex mb-3"
                onSubmit={(e) => e.preventDefault()}
              >
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="form-control form-control-sm me-2 text-dark"
                  style={{
                    borderRadius: "50px",
                    paddingLeft: "15px",
                    border: "2px solid #9BEB46",
                    fontFamily: "Georgia",
                  }}
                />
                <button
                  type="submit"
                  className="btn fw-bold btn-sm rounded-pill px-4"
                  style={{
                    background: "#9BEB46",
                    color: "#121212",
                    transition: "0.3s",
                    fontFamily: "Georgia",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background = "#7ED321")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "#9BEB46")
                  }
                >
                  Subscribe
                </button>
              </form>

              <h6
                className="fw-bold mb-2"
                style={{ fontFamily: "Papyrus, fantasy", color: "#9BEB46" }}
              >
                Complaint / Feedback
              </h6>
              <form onSubmit={(e) => e.preventDefault()}>
                <textarea
                  className="form-control mb-2 text-dark"
                  rows="2"
                  placeholder="Write your complaint or feedback..."
                  style={{
                    borderRadius: "10px",
                    border: "2px solid #9BEB46",
                    fontFamily: "Georgia",
                  }}
                ></textarea>
                <button
                  type="submit"
                  className="btn fw-bold btn-sm rounded-pill"
                  style={{
                    background: "#9BEB46",
                    color: "#121212",
                    transition: "0.3s",
                    fontFamily: "Georgia",
                  }}
                  onMouseOver={(e) =>
                    (e.target.style.background = "#7ED321")
                  }
                  onMouseOut={(e) =>
                    (e.target.style.background = "#9BEB46")
                  }
                >
                  Submit
                </button>
              </form>
            </div>
          </div>

          <hr
            className="my-4"
            style={{ borderColor: "#9BEB46" }}
          />

          {/* Bottom Bar */}
          <div className="d-flex flex-column flex-md-row justify-content-between align-items-center">
            <small style={{ opacity: 0.8, fontFamily: "Georgia" }}>
              © 2025 <strong>TrueCertify</strong>. All rights reserved.
            </small>
            <div className="mt-3 mt-md-0">
              <a
                href="#privacy"
                className="text-white text-decoration-none me-3"
                style={{ fontFamily: "Georgia" }}
              >
                Privacy Policy
              </a>
              <a href="#terms" className="text-white text-decoration-none" style={{ fontFamily: "Georgia" }}>
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </footer>



    </div >
  );
}
