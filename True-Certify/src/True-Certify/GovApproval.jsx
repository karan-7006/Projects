import React, { useState } from "react";
import { Navigate } from "react-router-dom";

export default function GovApproval() {
  const userRole = (localStorage.getItem("userRole") || "").toLowerCase();
  const [activeTab, setActiveTab] = useState("upload");
  const [file, setFile] = useState(null);

  // Only universities can access
  if (userRole !== "university") {
    return <Navigate to="/" replace />;
  }

  // common input style
  const inputStyle = {
    background: "#1e1e1e",
    color: "#fff",
    border: "1px solid #9BEB46",
  };

  // Handlers for drag and drop
  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
  };

  return (
    <div
      className="d-flex align-items-center justify-content-center min-vh-100"
      style={{
        backgroundImage:
          "url('https://images.pexels.com/photos/4862865/pexels-photo-4862865.jpeg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div
        className="p-5 shadow-lg"
        style={{
          width: "100%",
          maxWidth: "800px",
          borderRadius: "25px",
          background: "rgba(18, 18, 18, 0.95)",
          border: "3px solid #9BEB46",
          boxShadow: "0 0 25px rgba(155, 235, 70, 0.6)",
        }}
      >
        {/* Title */}
        <h1
          className="text-center fw-bold mb-4"
          style={{
            color: "#9BEB46",
            fontFamily: "Papyrus, fantasy",
            textShadow: "0 0 12px rgba(155,235,70,0.8)",
          }}
        >
          Government Approval
        </h1>

        {/* Tabs */}
        <ul className="nav nav-tabs mb-4">
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "upload" ? "active" : ""}`}
              style={{
                background: activeTab === "upload" ? "#9BEB46" : "transparent",
                color: activeTab === "upload" ? "#121212" : "#9BEB46",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("upload")}
            >
              Institute Approval
            </button>
          </li>
          <li className="nav-item">
            <button
              className={`nav-link ${activeTab === "review" ? "active" : ""}`}
              style={{
                background: activeTab === "review" ? "#9BEB46" : "transparent",
                color: activeTab === "review" ? "#121212" : "#9BEB46",
                borderRadius: "10px 10px 0 0",
                fontWeight: "bold",
              }}
              onClick={() => setActiveTab("review")}
            >
              University Approval
            </button>
          </li>
        </ul>

        {/* Tab Content */}
        <div>
          {/* Upload Certificate Tab */}
          {activeTab === "upload" && (
            <form>
              <div className="mb-3">
                <label className="form-label text-light">College Name</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">Email</label>
                <input type="email" className="form-control" style={inputStyle} />
              </div>

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
                onClick={() => document.getElementById("fileUpload1").click()}
              >
                <input
                  type="file"
                  id="fileUpload1"
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

              <div className="mb-3">
                <label className="form-label text-light">Government Key</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>

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
              >
                Submit Certificate
              </button>
            </form>
          )}

          {/* Govt Review Request Tab */}
          {activeTab === "review" && (
            <form>
              <div className="mb-3">
                <label className="form-label text-light">University Name</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">University Key</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">College Name</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">College Key</label>
                <input type="text" className="form-control" style={inputStyle} />
              </div>
              <div className="mb-3">
                <label className="form-label text-light">Email</label>
                <input type="email" className="form-control" style={inputStyle} />
              </div>

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
                onClick={() => document.getElementById("fileUpload2").click()}
              >
                <input
                  type="file"
                  id="fileUpload2"
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
              >
                Submit Review Request
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
