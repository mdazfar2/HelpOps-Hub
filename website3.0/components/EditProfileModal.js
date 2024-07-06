'use client'
import React, { useState, useEffect } from 'react';
import "@stylesheets/EditProfileModal.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCamera, faTimes } from "@fortawesome/free-solid-svg-icons";

export default function EditProfileModal({ isOpen, onRequestClose, userData, onSave }) {
  const [formData, setFormData] = useState({ ...userData, password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSaveChanges = () => {
    onSave(formData);
    onRequestClose();
  };

  const handleClickOutside = (e) => {
    if (e.target.className === 'modal-overlay') {
      onRequestClose();
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('click', handleClickOutside);
    } else {
      document.removeEventListener('click', handleClickOutside);
    }

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [isOpen]);

  if (!isOpen) {
    return null;
  }

  return (
    <div className="modal-overlay">
      <div className="edit-modal">
        <span className="close-icon" onClick={onRequestClose}>
          <FontAwesomeIcon icon={faTimes} />
        </span>
        <h2>Edit Profile</h2>
        <div className="modal-image-container">
          <img
            src={formData.userImage}
            alt="Profile Picture"
            className="modal-profile-img"
          />
          <span className="camera-icon">
            <FontAwesomeIcon icon={faCamera} />
          </span>
        </div>
        <form className="edit-form">
          <label>
            Username:
            <input type="text" name="userName" placeholder="Nishant Kaushal" value={formData.userName} onChange={handleChange} />
          </label>
          <label>
            Email:
            <input type="email" name="userEmail" placeholder="Nishantkaushal0708@gmail.com" value={formData.userEmail} onChange={handleChange} />
          </label>
          <label>
            Password:
            <input type="password" name="password" placeholder="Enter Your Password" value={formData.password} onChange={handleChange} />
          </label>
          <label>
            Designation:
            <input type="text" name="designation" placeholder="Software Enginer" value={formData.designation} onChange={handleChange} />
          </label>
          <label>
            Caption:
            <textarea type="text" name="caption" placeholder='Creating visually appealing and highly functional software that bridges technology and user needs.' value={formData.caption} onChange={handleChange} />
          </label>
          <label>
            GitHub:
            <input type="text" name="github" placeholder="Enter Your Github Link"  value={formData.github} onChange={handleChange} />
          </label>
          <label>
            LinkedIn:
            <input type="text" name="linkedin" placeholder="Enter Your Linkedin Link" value={formData.linkedin} onChange={handleChange} />
          </label>
          <div className="form-buttons">
            <button type="button" onClick={handleSaveChanges}>Save Changes</button>
            <button type="button" onClick={onRequestClose}>Cancel</button>
          </div>
        </form>
      </div>
    </div>
  );
}
