import React, { useState, useEffect } from "react";
import axios from "axios";


export const AcceptorDashboard = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedLocation, setSelectedLocation] = useState("all");
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    const fetchDonors = async () => {
      try {
        const response = await axios.get("http://localhost:8080/api/Get");
        setDonors(response.data);
      } catch (error) {
        console.error("Error fetching donors:", error);
      }
    };

    fetchDonors();
  }, []);

  const filteredDonors = donors.filter((donor) => {
    const bloodGroup = donor.bloodGroup || "";
    const location = donor.location || "";

    return (
      bloodGroup.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedLocation === "all" || location === selectedLocation)
    );
  });

  return (
    <div className="container mt-4">
      {/* Improved Heading */}
    <div className="find">
      <h2 className="dashboard-heading">Find Blood Donors</h2>
      </div>
<div className="down">
      <div className="row g-3 mb-4">
        <div className="col-md-6">
          <input
            type="text"
            className="form-control"
            placeholder="Search by blood group..."
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="col-md-6">
          <select
            className="form-select"
            value={selectedLocation}
            onChange={(e) => setSelectedLocation(e.target.value)}
          >
            <option value="all">All Locations</option>
            {[...new Set(donors.map((d) => d.location))].map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table custom-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Blood Group</th>
              <th>Location</th>
              <th>Phone</th>
            </tr>
          </thead>
          <tbody>
            {filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.fullname}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.location}</td>
                <td>{donor.phoneNumber}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      </div>
    </div>
  );
};
