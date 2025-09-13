import React from "react";
import { Navigate } from "react-router-dom";

export default function GovApproval() {
  const userRole = localStorage.getItem("userRole");

  // Only universities can access
  if (userRole !== "university") {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="container mt-5">
      <h1 className="text-center fw-bold mb-4" style={{ color: "#9BEB46" }}>
        Government Approval
      </h1>
      <p className="text-center text-light">
        This page is only accessible by Universities.
      </p>

      <div className="card shadow p-4 mt-4">
        <h4>Submit Certificates for Govt Approval</h4>
        <form>
          <div className="mb-3">
            <label className="form-label">Upload Certificate</label>
            <input type="file" className="form-control" />
          </div>
          <div className="mb-3">
            <label className="form-label">Remarks</label>
            <textarea className="form-control" rows="3"></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">
            Submit for Approval
          </button>
        </form>
      </div>
    </div>
  );
}
