import React from 'react';

export const UserTable = ({ users, onView, onUpdate, onDelete }) => (
  <table className="table">
    <thead>
      <tr>
        <th>Name</th>
        <th>Email</th>
        <th>Age</th>
        <th>Blood Group</th>
        <th>Location</th>
        <th>Phone</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {users.map(user => (
        <tr key={user.id}>
          <td>{user.fullname}</td>
          <td>{user.email}</td>
          <td>{user.age}</td>
          <td>{user.bloodGroup}</td>
          <td>{user.location}</td>
          <td>{user.phoneNumber}</td>
          <td>
            <button
              className="btn btn-info btn-sm me-1"
              onClick={() => onView(user)}
            >
              View
            </button>
            <button
              className="btn btn-warning btn-sm me-1"
              onClick={() => onUpdate(user)}
            >
              Update
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => onDelete(user.id)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);