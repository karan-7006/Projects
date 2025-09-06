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
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div className="container">
          <a className="navbar-brand fw-bold fs-3 d-flex align-items-center pe-5" href="#">
            <img
              src="/Logo.png"
              alt="Logo"
              width="40"
              height="40"
              className="me-2 d-inline-block align-text-top"
            />
            <span className="text-info">C</span>ertis<span className="text-info">V</span>erify
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <header
        className="text-white text-center py-6 pt-5"
        style={{
          background: "radial-gradient(circle at top left, #0051cc, #0099ff, #00e6ff)",
          boxShadow: "0 8px 20px rgba(0, 102, 255, 0.5)",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div className="container">
          <h1
            className="display-3 fw-bold mb-4"
            style={{
              textShadow: "2px 2px 8px rgba(0, 0, 0, 0.3)",
              letterSpacing: "2px",
              lineHeight: "1.1",
              fontFamily: '"Lobster", cursive'
            }}
          >
            Certificate Verification System
          </h1>
          <p
            className="lead fs-4 mb-3"
            style={{
              fontWeight: "600",
              textShadow: "1px 1px 6px rgba(0, 0, 0, 0.25)",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            Secure &bull; Reliable &bull; Blockchain-Powered Verification
          </p>

          {/* Optional subtle animated wave shape or overlay */}
          {/* <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "60px",
              background:
                "radial-gradient(circle, rgba(255,255,255,0.15), transparent 70%)",
              pointerEvents: "none",
            }}
          /> */}
        </div>
      </header>

      <section
        className="about-us-section container my-5 py-5"
        style={{ backgroundColor: "#f0f8ff", borderRadius: "15px", boxShadow: "0 8px 30px rgba(0, 123, 255, 0.2)" }}
      >
        <div className="row align-items-center">
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.unsplash.com/photo-1581091012184-59a021a42b7c?auto=format&fit=crop&w=600&q=80"
              alt="Certificate and Verification"
              style={{ width: "100%", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
            />
          </div>

          {/* Text Section */}
          <div className="col-md-6">
            <h2 className="fw-bold mb-4" style={{ color: "#004aad", letterSpacing: "1.5px" }}>
              About Our Certificate Verification System
            </h2>
            <p className="fs-5 mb-3" style={{ color: "#222", lineHeight: "1.7" }}>
              Our platform provides a <strong>secure</strong> and <strong>reliable</strong> way to verify educational and professional certificates using <strong>blockchain technology</strong>. We eliminate forgery risks by offering transparent, tamper-proof verification that both issuers and employers can trust.
            </p>
            <p className="fs-5 mb-4" style={{ color: "#222", lineHeight: "1.7" }}>
              With a user-friendly interface, fast processing, and robust security standards, we ensure your credentials are verified instantly and accurately. Join thousands of users who trust our advanced certificate validation to make informed decisions.
            </p>
            <a
              href="#"
              className="btn btn-primary btn-lg"
              style={{ borderRadius: "50px", padding: "10px 40px", fontWeight: "600" }}
            >
              Learn More
            </a>
          </div>

          <div className="col-md-6">
            <h2 className="fw-bold mb-4" style={{ color: "#004aad", letterSpacing: "1.5px" }}>
              About Our Certificate Verification System
            </h2>
            <p className="fs-5 mb-3" style={{ color: "#222", lineHeight: "1.7" }}>
              Our platform provides a <strong>secure</strong> and <strong>reliable</strong> way to verify educational and professional certificates using <strong>blockchain technology</strong>. We eliminate forgery risks by offering transparent, tamper-proof verification that both issuers and employers can trust.
            </p>
            <p className="fs-5 mb-4" style={{ color: "#222", lineHeight: "1.7" }}>
              With a user-friendly interface, fast processing, and robust security standards, we ensure your credentials are verified instantly and accurately. Join thousands of users who trust our advanced certificate validation to make informed decisions.
            </p>
            <a
              href="#"
              className="btn btn-primary btn-lg"
              style={{ borderRadius: "50px", padding: "10px 40px", fontWeight: "600" }}
            >
              Learn More
            </a>
          </div>
          {/* Image Section */}
          <div className="col-md-6 mb-4 mb-md-0">
            <img
              src="https://images.unsplash.com/photo-1581091012184-59a021a42b7c?auto=format&fit=crop&w=600&q=80"
              alt="Certificate and Verification"
              style={{ width: "100%", borderRadius: "15px", boxShadow: "0 8px 20px rgba(0, 0, 0, 0.15)" }}
            />
          </div>
        </div>
      </section>


      {/* Verification Form */}
      <section className="py-5" style={{ background: "#f8f9fa" }}>
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7">
              <div
                className="card border-0 shadow-lg p-4"
                style={{
                  borderRadius: "20px",
                  background: "rgba(255, 255, 255, 0.9)",
                  backdropFilter: "blur(12px)",
                }}
              >
                <div className="card-body">
                  <h3 className="card-title text-center mb-4 fw-bold text-primary">
                    Verify Your Certificate
                  </h3>

                  {/* Certificate ID Input */}
                  <form>
                    <div className="mb-3">
                      <label
                        htmlFor="certificateId"
                        className="form-label fw-semibold"
                      >
                        Enter Certificate ID
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="certificateId"
                        placeholder="e.g. CERT123456"
                      />
                    </div>

                    {/* Drag and Drop Upload */}
                    <div
                      className="border border-2 border-primary rounded p-4 text-center mb-3"
                      style={{
                        cursor: "pointer",
                        background: "#f0f8ff",
                        transition: "all 0.3s ease",
                      }}
                      onDrop={handleDrop}
                      onDragOver={handleDragOver}
                      onClick={() => document.getElementById("fileUpload").click()}
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
                          <span className="text-primary fw-semibold">
                            click to upload
                          </span>
                        </p>
                      )}
                    </div>

                    {/* Verify Button */}
                    <div className="text-center">
                      <button
                        type="submit"
                        className="btn btn-primary w-100 fw-semibold"
                        style={{
                          transition: "0.3s",
                        }}
                        onMouseOver={(e) =>
                          (e.target.style.backgroundColor = "#004aad")
                        }
                        onMouseOut={(e) =>
                          (e.target.style.backgroundColor = "#0d6efd")
                        }
                      >
                        🔍 Verify Now
                      </button>
                    </div>
                  </form>

                  {/* Result Section */}
                  <div className="mt-4 text-center" id="resultBox">
                    <p className="text-muted fst-italic">
                      Enter a certificate ID or upload a file to see verification
                      results here.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        className="text-white text-center py-5"
        style={{
          background: "linear-gradient(135deg, #0057ff, #00d4ff)",
          boxShadow: "0 -4px 20px rgba(0, 115, 255, 0.7)",
          letterSpacing: "0.03em",
          fontWeight: "600",
        }}
      >
        <div className="container">
          <h4 className="mb-3" style={{ textShadow: "1px 1px 8px rgba(0,0,0,0.4)" }}>
            Contact Us
          </h4>
          <p className="mb-2" style={{ fontSize: "1.1rem" }}>
            Email:{" "}
            <a href="mailto:support@example.com" className="text-white fw-bold">
              support@example.com
            </a>{" "}
            | Phone:{" "}
            <a href="tel:+1234567890" className="text-white fw-bold">
              +1 234 567 890
            </a>
          </p>
          <p className="mb-4" style={{ fontSize: "1rem", fontStyle: "italic" }}>
            123 Certification Lane, Veracity City, VC 98765
          </p>

          <div className="d-flex justify-content-center gap-4 mb-4" style={{ fontSize: "1.5rem" }}>
            {/* Use fontawesome or bootstrap icons if available */}
            <a href="#!" className="text-white" aria-label="Facebook" title="Facebook">
              <i className="bi bi-facebook"></i>
            </a>
            <a href="#!" className="text-white" aria-label="Twitter" title="Twitter">
              <i className="bi bi-twitter"></i>
            </a>
            <a href="#!" className="text-white" aria-label="Instagram" title="Instagram">
              <i className="bi bi-instagram"></i>
            </a>
            <a href="#!" className="text-white" aria-label="LinkedIn" title="LinkedIn">
              <i className="bi bi-linkedin"></i>
            </a>
          </div>

          <form className="d-flex justify-content-center mb-3" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Subscribe to our newsletter"
              className="form-control form-control-sm w-auto me-2"
              style={{ maxWidth: "300px", borderRadius: "50px", paddingLeft: "15px" }}
            />
            <button type="submit" className="btn btn-light btn-sm rounded-pill px-4">
              Subscribe
            </button>
          </form>

          <small style={{ display: "block", opacity: 0.7, fontWeight: "500" }}>
            © 2025 Certificate Verification Platform. All rights reserved.
          </small>
        </div>
      </footer>

    </div>
  );
}
