import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProfileLayout from './components/ProfileLayout';

const Profile = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileLayout />} />
      <Route path="*" element={<Navigate to="." replace />} />
    </Routes>
  );
};

export default Profile;
