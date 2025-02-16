import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { UserSearch } from 'lucide-react';
import { UserTable } from '../components/UserTable';
import { UpdateForm } from '../components/UpdateForm';

export const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/Get');
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching users:', error);
      alert('Error fetching users');
    }
  };

  const handleDelete = async (userId) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      try {
        await axios.delete(`http://localhost:8080/api/delete/${userId}`);
        setUsers(users.filter(user => user.id !== userId));
        alert('User deleted successfully');
      } catch (error) {
        alert('Failed to delete user');
      }
    }
  };

  const handleUpdate = async (formData) => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/update/${selectedUser.id}`,
        {
          ...selectedUser,
          ...formData
        }
      );
      
      if (response.data) {
        setUsers(users.map(user => 
          user.id === selectedUser.id ? response.data : user
        ));
        setSelectedUser(null);
        setIsEditing(false);
        alert('User updated successfully');
      }
    } catch (error) {
      console.error('Error updating user:', error);
      alert('Failed to update user');
    }
  };

  const filteredUsers = users.filter(user => 
    user.fullname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.bloodGroup?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    user.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container mt-4">
      <h2>Admin Dashboard</h2>
      <UserSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      <UserTable 
        users={filteredUsers}
        onView={(user) => {
          setSelectedUser(user);
          setIsEditing(false);
        }}
        onUpdate={(user) => {
          setSelectedUser(user);
          setIsEditing(true);
        }}
        onDelete={handleDelete}
      />
      
      {selectedUser && (
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
                  onClick={() => {
                    setSelectedUser(null);
                    setIsEditing(false);
                  }}
                ></button>
              </div>
              <div className="modal-body">
                {isEditing ? (
                  <UpdateForm 
                    user={selectedUser}
                    onUpdate={handleUpdate}
                    onClose={() => {
                      setSelectedUser(null);
                      setIsEditing(false);
                    }}
                  />
                ) : (
                  <div>
                    <p><strong>Name:</strong> {selectedUser.fullname}</p>
                    <p><strong>Email:</strong> {selectedUser.email}</p>
                    <p><strong>Password:</strong> {selectedUser.password}</p>
                    <p><strong>Age:</strong> {selectedUser.age}</p>
                    <p><strong>Blood Group:</strong> {selectedUser.bloodGroup}</p>
                    <p><strong>Location:</strong> {selectedUser.location}</p>
                    <p><strong>Phone:</strong> {selectedUser.phoneNumber}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};