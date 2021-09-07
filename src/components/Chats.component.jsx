import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router';
import { ChatEngine } from 'react-chat-engine';

import axios from 'axios';

import { auth } from '../firebase/firebase.utils';

import { useAuth } from '../contexts/AuthContext';

const Chats = () => {
  const history = useHistory();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);

  console.log(user);
  // const userName = user.email.slice(0, -10);

  //get user photo
  const getFile = async (url) => {
    const response = await fetch(url);
    const data = await response.blob();

    return new File([data], 'userPhoto.jpg', { type: 'image/jpeg' });
  };

  const handleLogout = async () => {
    await auth.signOut();
    history.push('/');
  };

  useEffect(() => {
    if (!user) {
      history.push('/');

      return;
    }

    //get User Chatengine profile, if not then create a new user (.catch)
    axios
      .get('https://api.chatengine.io/users/me', {
        headers: {
          'project-id': '346deee7-51ca-4a93-b1b4-f497c9afe3d7',
          'user-name': user.email.slice(0, -10),
          'user-secret': user.uid
        }
      })
      .then(() => {
        setLoading(false);
      })
      .catch(() => {
        let formdata = new FormData();
        formdata.append('email', user.email);
        formdata.append('username', user.email.slice(0, -10));
        formdata.append('secret', user.uid);
        formdata.append('first_name', user.displayName);

        getFile(user.photoURL).then((avatar) => {
          formdata.append('avatar', avatar, avatar.name);

          axios
            .post('https://api.chatengine.io/users/', formdata, {
              headers: { 'private-key': process.env.REACT_APP_CHAT_ENGINE_PRIVATE_KEY }
            })
            .then(() => setLoading(false))
            .catch((error) => console.log(error));
        });
      });
  }, [user, history]);

  if (!user || loading) return '...Loading';

  return (
    <div className="chats-page">
      <div className="nav-bar">
        <div className="logo-tab">UChat</div>
        <div className="logout-tab" onClick={handleLogout}>
          Logout
        </div>
      </div>
      <ChatEngine
        height="91vh"
        projectID={process.env.REACT_APP_CHAT_ENGINE_PROJECT_ID}
        userName={user.email.slice(0, -10)}
        userSecret={user.uid}
      />
    </div>
  );
};

export default Chats;
