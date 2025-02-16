import React from 'react';

export const UserSearch = ({ searchTerm, setSearchTerm }) => (
  <div className="mb-3">
    <input
      type="text"
      className="form-control"
      placeholder="Search users..."
      value={searchTerm}
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  </div>
);