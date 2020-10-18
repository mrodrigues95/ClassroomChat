import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './Login';
import Signup from './Signup';

const Auth = () => {
  return (
    <Routes>
      <Route path="login">
        <Login />
      </Route>
      <Route path="signup">
        <Signup />
      </Route>
    </Routes>
  );
};

export default Auth;
