// src/components/UpdateForm.js
import React, { useState, useEffect } from 'react';

export const UpdateForm = ({ user, onUpdate, onClose }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    age: '',
    bloodGroup: '',
    location: '',
    phoneNumber: ''
  });

  useEffect(() => {
    if (user) {
      setFormData({
        fullname: user.fullname || '',
        age: user.age || '',
        bloodGroup: user.bloodGroup || '',
        location: user.location || '',
        phoneNumber: user.phoneNumber || ''
      });
    }
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    onUpdate(formData);
  };

  const bloodGroups = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Full Name</label>
        <input
          type="text"
          className="form-control"
          value={formData.fullname}
          onChange={(e) => setFormData({...formData, fullname: e.target.value})}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Age</label>
        <input
          type="number"
          className="form-control"
          value={formData.age}
          onChange={(e) => setFormData({...formData, age: e.target.value})}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Blood Group</label>
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

      <div className="mb-3">
        <label className="form-label">Location</label>
        <input
          type="text"
          className="form-control"
          value={formData.location}
          onChange={(e) => setFormData({...formData, location: e.target.value})}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label">Phone Number</label>
        <input
          type="tel"
          className="form-control"
          value={formData.phoneNumber}
          onChange={(e) => setFormData({...formData, phoneNumber: e.target.value})}
          required
        />
      </div>

      <div className="text-end">
        <button type="button" className="btn btn-secondary me-2" onClick={onClose}>
          Cancel
        </button>
        <button type="submit" className="btn btn-primary">
          Update
        </button>
      </div>
    </form>
  );
};