import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ProfileLayout from './ProfileLayout';

const Profile = () => {
  return (
    <Routes>
      <Route path="/" element={<ProfileLayout />} />
    </Routes>
  );
};

export default Profile;
