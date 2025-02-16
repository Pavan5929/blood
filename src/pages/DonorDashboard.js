// src/pages/DonorDashboard.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

export const DonorDashboard = () => {
  const { userData } = useAuth();
  const [formData, setFormData] = useState({
    fullname: '',
    age: '',
    bloodGroup: '',
    location: '',
    phoneNumber: ''
  });

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  useEffect(() => {
    const fetchData = async () => {
      if (!userData?.email) return;

      try {
        const response = await axios.get('http://localhost:8080/api/Get');
        const currentUser = response.data.find(user => user.email === userData.email);
        
        if (currentUser) {
          setFormData({
            fullname: currentUser.fullname || '',
            age: currentUser.age || '',
            bloodGroup: currentUser.bloodGroup || '',
            location: currentUser.location || '',
            phoneNumber: currentUser.phoneNumber || ''
          });
        }
      } catch (error) {
        console.error("Error fetching user data", error);
      }
    };

    fetchData();
  }, [userData?.email]);
const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userData?.email) {
        alert('Please log in first');
        return;
    }

    try {
        const response = await axios.put(`http://localhost:8080/api/update/email/${userData.email}`, {
            fullname: formData.fullname,
            age: parseInt(formData.age),
            bloodGroup: formData.bloodGroup,
            location: formData.location,
            phoneNumber: formData.phoneNumber
        });

        if (response.data) {
            alert('Details updated successfully!');
             setFormData({
                fullname: '',
                age: '',
                bloodGroup: '',
                location: '',
                phoneNumber: ''
            });
        }
    } catch (error) {
        console.error("Error updating details", error);
        
        // More detailed error handling
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            alert(error.response.data || 'Update failed');
        } else if (error.request) {
            // The request was made but no response was received
            alert('No response from server');
        } else {
            // Something happened in setting up the request that triggered an Error
            alert('Error: ' + error.message);
        }
    }
};
  return (
    <div className="container mt-4">
      <h2>Donor Registration</h2>
      {userData?.email && <p>Updating details for: {userData.email}</p>}
      
      <form onSubmit={handleSubmit} className="mt-3">
        <div className="row g-3">
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Full Name"
              value={formData.fullname}
              onChange={(e) => setFormData({...formData, fullname: e.target.value})}
              required
            />
          </div>
          
          <div className="col-md-6">
            <input
              type="number"
              className="form-control"
              placeholder="Age"
              value={formData.age}
              onChange={(e) => setFormData({...formData, age: e.target.value})}
              required
              min="18"
              max="65"
            />
          </div>
          
          <div className="col-md-6">
            <select
              className="form-select"
              value={formData.bloodGroup}
              onChange={(e) => setFormData({...formData, bloodGroup: e.target.value})}
              required
            >
              <option value="">Select Blood Group</option>
              {bloodGroups.map(group => (
                <option key={group} value={group}>{group}</option>
              ))}
            </select>
          </div>
          
          <div className="col-md-6">
            <input
              type="text"
              className="form-control"
              placeholder="Location"
              value={formData.location}
              onChange={(e) => setFormData({...formData, location: e.target.value})}
              required
            />
          </div>
          
          <div className="col-md-6">
            <input
              type="tel"
              className="form-control"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
              required
              pattern="[0-9]{10}"
            />
          </div>
          
          <div className="col-12">
            <button type="submit" className="btn btn-primary">
              Update Details
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default DonorDashboard;