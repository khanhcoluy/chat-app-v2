import React from 'react';
import { GoogleOutlined, FacebookOutlined } from '@ant-design/icons';
import "firebase/app";

import firebase from 'firebase/app';
import { auth } from '../firebase/firebase.utils';

const Login = () => {
  return (
    <div id="login-page">
      <div id="login-card">
        <h2>Welcome to UChat</h2>
        <div className="login-button google" onClick={() => auth.signInWithPopup(new firebase.auth.GoogleAuthProvider())}>
          <GoogleOutlined /> Sign In With Google
        </div>
        <br />
        <br />
        <div className="login-button facebook" onClick={() => auth.signInWithPopup(new firebase.auth.FacebookAuthProvider())}>
          <FacebookOutlined /> Sign In With Facebook
        </div>
      </div>
    </div>
  );
};

export default Login;
