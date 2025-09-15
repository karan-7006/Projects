import React, { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [rawText, setRawText] = useState("");
  const [certificate, setCertificate] = useState({
    name: "",
    roll_number: "",
    date: "",
    university: "",
  });
  const [backendCanonical, setBackendCanonical] = useState("");
  const [backendHash, setBackendHash] = useState("");
  const [localHash, setLocalHash] = useState("");
  const [verifyResult, setVerifyResult] = useState(null);
  const [error, setError] = useState("");

  const API_BASE = "http://127.0.0.1:5000";

  // ---------- Helpers ----------
  const toHex = (buf) =>
    Array.from(new Uint8Array(buf))
      .map((b) => b.toString(16).padStart(2, "0"))
      .join("");

  const sha256Bytes = async (data) => {
    const enc = new TextEncoder();
    const buf = enc.encode(data);
    const hash = await crypto.subtle.digest("SHA-256", buf);
    return hash;
  };

  const doubleSha256Hex = async (data) => {
    const first = await sha256Bytes(data);
    const second = await crypto.subtle.digest("SHA-256", first);
    return toHex(second);
  };

  const canonicalize = (cert) => {
    const keys = Object.keys(cert).sort();
    const obj = {};
    keys.forEach((k) => {
      const v = cert[k] ?? "";
      obj[k] = String(v).trim().replace(/\s+/g, " ");
    });
    return JSON.stringify(obj);
  };

  const showError = (message) => {
    setError(message);
    setTimeout(() => setError(""), 5000);
  };

  // ---------- Upload ----------
  const handleUpload = async () => {
    if (!file) {
      showError("Please choose a file");
      return;
    }
    setLoading(true);
    setVerifyResult(null);
    setError("");

    const fd = new FormData();
    fd.append("file", file);

    try {
      const res = await axios.post(`${API_BASE}/ocr`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
        timeout: 30000,
      });

      const data = res.data;
      setRawText(data.raw_text || "No text extracted");
      const extractedCert = data.certificate || {
        name: "",
        roll_number: "",
        date: "",
        university: "",
      };
      setCertificate(extractedCert);
      setBackendCanonical(data.canonical_string || "");
      setBackendHash(data.double_sha256_hash || "");

      const can = canonicalize(extractedCert);
      const local = await doubleSha256Hex(can);
      setLocalHash(local);
    } catch (err) {
      if (err.response) {
        showError(
          `Upload failed: ${
            err.response.data?.error ||
            err.response.data?.detail ||
            "Server error"
          }`
        );
      } else if (err.request) {
        showError("⚠️ Could not connect to server. Is Flask running?");
      } else {
        showError(`Error: ${err.message}`);
      }
    } finally {
      setLoading(false);
    }
  };

  // ---------- Field change ----------
  const handleFieldChange = async (k, v) => {
    const updated = { ...certificate, [k]: v };
    setCertificate(updated);
    setBackendCanonical("");
    setBackendHash("");
    try {
      const can = canonicalize(updated);
      const local = await doubleSha256Hex(can);
      setLocalHash(local);
    } catch (err) {
      console.error("Hash computation error:", err);
    }
  };

  // ---------- Server functions ----------
  const computeOnServer = async () => {
    try {
      const res = await axios.post(`${API_BASE}/hash_certificate`, certificate);
      setBackendCanonical(res.data.canonical_string);
      setBackendHash(res.data.double_sha256_hash);
    } catch {
      showError("Server computation failed");
    }
  };

  const storeOnServer = async () => {
    const hashToStore = backendHash || localHash;
    if (!hashToStore) {
      showError("Compute hash first");
      return;
    }
    try {
      await axios.post(`${API_BASE}/store_certificate`, {
        certificate,
        hash: hashToStore,
      });
      alert("✅ Certificate stored successfully");
    } catch {
      showError("Failed to store certificate");
    }
  };

  const verifyOnServer = async () => {
    const toVerifyHash = backendHash || localHash;
    try {
      const res = await axios.post(`${API_BASE}/verify`, {
        certificate,
        hash: toVerifyHash,
      });
      setVerifyResult(res.data);
    } catch {
      showError("Verification failed");
    }
  };

  // ---------- UI ----------
  return (
    <div className="py-4 px-4" style={{ backgroundColor: "#121212", minHeight: "100vh" }}>
      {/* Title */}
      <h2
        className="mb-4 fw-bold text-center"
        style={{
          color: "#9BEB46",
          fontWeight: "900",
          textShadow: "0 0 12px rgba(155,235,70,0.9), 0 0 25px rgba(155,235,70,0.6)",
        }}
      >
        📜 Certificate OCR & Verification
      </h2>

      {/* Error */}
      {error && (
        <div
          className="alert alert-danger mb-4 rounded-3"
          role="alert"
          style={{ fontWeight: "600", boxShadow: "0 0 10px rgba(255,0,0,0.5)" }}
        >
          {error}
        </div>
      )}

      {/* Upload section */}
      <div className="card shadow-lg mb-4 rounded-4 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold mb-3" style={{ color: "#121212" }}>
            Upload Certificate
          </h5>
          <div className="d-flex align-items-center">
            <input
              type="file"
              accept="image/*,.jpg,.jpeg,.png"
              className="form-control rounded-pill"
              onChange={(e) => setFile(e.target.files[0])}
            />
            <button
              className="btn ms-2"
              style={{
                backgroundColor: "#9BEB46",
                color: "#121212",
                fontWeight: "700",
                letterSpacing: "0.05em",
                borderRadius: "50px",
                padding: "10px 24px",
                boxShadow:
                  "0 0 12px rgba(155, 235, 70, 0.8), 0 0 20px rgba(155, 235, 70, 0.5)",
                transition: "all 0.3s ease-in-out",
              }}
              onMouseOver={(e) => {
                e.target.style.backgroundColor = "#85d33d";
                e.target.style.boxShadow =
                  "0 0 15px rgba(155, 235, 70, 1), 0 0 30px rgba(155, 235, 70, 0.8)";
              }}
              onMouseOut={(e) => {
                e.target.style.backgroundColor = "#9BEB46";
                e.target.style.boxShadow =
                  "0 0 12px rgba(155, 235, 70, 0.8), 0 0 20px rgba(155, 235, 70, 0.5)";
              }}
              onClick={handleUpload}
              disabled={loading || !file}
            >
              {loading ? "Processing..." : "Upload & OCR"}
            </button>
          </div>
        </div>
      </div>

      {/* Raw OCR text */}
      <div className="card shadow-lg mb-4 rounded-4 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ color: "#121212" }}>
            Raw OCR Text
          </h5>
          <pre
            className="p-3 rounded-3"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#9BEB46",
              maxHeight: "200px",
              overflow: "auto",
              fontFamily: "'Courier New', monospace",
              boxShadow: "inset 0 0 8px rgba(155,235,70,0.4)",
            }}
          >
            {rawText || "No text extracted yet"}
          </pre>
        </div>
      </div>

      {/* Extracted Fields */}
      <div className="card shadow-lg mb-4 rounded-4 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ color: "#121212" }}>
            Extracted Fields
          </h5>
          <div className="row g-3">
            {["name", "roll_number", "date", "university"].map((field) => (
              <div className="col-md-6" key={field}>
                <label
                  className="form-label fw-semibold"
                  style={{ color: "#9BEB46" }}
                >
                  {field.charAt(0).toUpperCase() +
                    field.slice(1).replace("_", " ")}
                </label>
                <input
                  type="text"
                  className="form-control rounded-pill"
                  value={certificate[field]}
                  onChange={(e) => handleFieldChange(field, e.target.value)}
                  placeholder={`Enter ${field.replace("_", " ")}`}
                />
              </div>
            ))}
          </div>
          <div className="mt-4 d-flex flex-wrap gap-3">
            <button
              className="btn fw-bold px-4 rounded-pill"
              style={{
                backgroundColor: "#9BEB46",
                color: "#121212",
                boxShadow: "0 0 10px rgba(155,235,70,0.6)",
              }}
              onClick={computeOnServer}
            >
              Compute Hash
            </button>
            <button
              className="btn fw-bold px-4 rounded-pill"
              style={{
                backgroundColor: "#ffc107",
                color: "#121212",
                boxShadow: "0 0 10px rgba(255,193,7,0.6)",
              }}
              onClick={storeOnServer}
            >
              Store
            </button>
            <button
              className="btn fw-bold px-4 rounded-pill"
              style={{
                backgroundColor: "#0dcaf0",
                color: "#fff",
                boxShadow: "0 0 10px rgba(13,202,240,0.6)",
              }}
              onClick={verifyOnServer}
            >
              Verify
            </button>
          </div>
        </div>
      </div>

      {/* Canonical & Hash */}
      <div className="card shadow-lg mb-4 rounded-4 border-0">
        <div className="card-body">
          <h5 className="card-title fw-bold" style={{ color: "#121212" }}>
            Canonical & Hash
          </h5>

          <p style={{ color: "#9BEB46", fontWeight: "600" }}>
            Local Canonical:
          </p>
          <pre
            className="p-2 rounded-3"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#9BEB46",
              fontFamily: "'Courier New', monospace",
              boxShadow: "inset 0 0 8px rgba(155,235,70,0.4)",
            }}
          >
            {canonicalize(certificate)}
          </pre>

          <p style={{ color: "#9BEB46", fontWeight: "600" }}>
            Local double SHA-256:
          </p>
          <p
            className="p-2 rounded-3"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              wordBreak: "break-all",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {localHash || "Not computed"}
          </p>

          <p style={{ color: "#9BEB46", fontWeight: "600" }}>
            Server Canonical:
          </p>
          <p
            className="p-2 rounded-3"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              wordBreak: "break-all",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {backendCanonical || "Not computed"}
          </p>

          <p style={{ color: "#9BEB46", fontWeight: "600" }}>
            Server double SHA-256:
          </p>
          <p
            className="p-2 rounded-3"
            style={{
              backgroundColor: "#1e1e1e",
              color: "#fff",
              wordBreak: "break-all",
              fontFamily: "'Courier New', monospace",
            }}
          >
            {backendHash || "Not computed"}
          </p>

          <p
            className="fw-bold mt-3"
            style={{ fontSize: "1.1rem", color: "#9BEB46" }}
          >
            Verification:{" "}
            {backendHash && localHash ? (
              backendHash === localHash ? (
                <span className="text-success">✅ MATCH</span>
              ) : (
                <span className="text-danger">❌ DIFFER</span>
              )
            ) : (
              <span className="text-muted">⏳ Compute both to compare</span>
            )}
          </p>

          {verifyResult && (
            <div
              className="alert alert-dark mt-3 rounded-3"
              style={{
                backgroundColor: "#1e1e1e",
                color: "#9BEB46",
                border: "1px solid #9BEB46",
              }}
            >
              <pre>{JSON.stringify(verifyResult, null, 2)}</pre>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
