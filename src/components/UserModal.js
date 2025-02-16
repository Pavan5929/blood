import React from 'react';

export const UserModal = ({ user, onClose, isEditing }) => (
  <div className="modal" style={{ display: 'block', backgroundColor: 'rgba(0,0,0,0.5)' }}>
    <div className="modal-dialog">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">
            {isEditing ? 'Edit User' : 'User Details'}
          </h5>
          <button 
            type="button" 
            className="btn-close"
            onClick={onClose}
          ></button>
        </div>
        <div className="modal-body">
          <p><strong>Name:</strong> {user.fullname}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Age:</strong> {user.age}</p>
          <p><strong>Blood Group:</strong> {user.bloodGroup}</p>
          <p><strong>Location:</strong> {user.location}</p>
          <p><strong>Phone:</strong> {user.phoneNumber}</p>
        </div>
      </div>
    </div>
  </div>
);