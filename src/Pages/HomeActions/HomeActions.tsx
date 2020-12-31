import { useNavigate } from '@reach/router';
import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import Dialog from '../../Components/Dialog/Dialog';
import Menu from '../../Components/Menu';
import { Login } from '../Login/Login';
import Register from '../Register/Register';

export default function HomeActions() {
  const [isLogin, setIsLogin] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(() => {
    if (localStorage.getItem('isLoggedIn') === 'yes') {
      return true;
    }
    return false;
  });
  const navigate = useNavigate();

  const handleLogout = (event: any) => {
    localStorage.clear();
    setIsLoggedIn(false);
  };

  return (
    <>
      {!isLoggedIn && isLogin && (
        <Login
          handleCancel={() => setIsLogin(false)}
          setIsLoggedIn={setIsLoggedIn}
        />
      )}
      {!isLoggedIn && isSignUp && (
        <Register 
          handleCancel={() => setIsSignUp(false)} 
          setIsSignUp={setIsSignUp}
          setIsLogin={setIsLogin}
        />
      )}
      {!isLoggedIn && !isLogin && !isSignUp && (
        <>
          <Button
            handleClick={() => navigate('/game')}
            text="Start Game As Guest"
          />
          <div className="z-20">
            <Button handleClick={() => setIsLogin(true)} text="Login" />
            <Button handleClick={() => setIsSignUp(true)} text="SignUp" />
          </div>
        </>
      )}
      {isLoggedIn && (
        <div className="z-20 text-center">
          <Dialog id="custom-modal">
            <div className="p-4 flex items-center justify-between text-xl">
              <div className="text-white">Snake Snacks</div>
              <button
                type="button"
                onClick={(event) => Dialog.close('custom-modal')(event)}
                className="text-crail"
              >
                X
              </button>
            </div>
            <ul className="p-0 m-0 mb-4">
              <li
                role="presentation"
                className="p-4 hover:bg-gray-300 cursor-pointer text-xl"
                onClick={(event) => {Dialog.close('custom-modal')(event); handleLogout(event); }}
              >
                Logout
              </li>
            </ul>
          </Dialog>
          <div className="absolute right-1 top-1 z-20">
            <button
              type="button"
              onClick={(event) => Dialog.open('custom-modal')(event)}
            >
              <Menu />
            </button>
          </div>
          <Button
            handleClick={() => navigate('/game')}
            text="Start Single Player"
          />
          <Button
            handleClick={() => navigate('/game')}
            text="Start Multi Player"
          />
        </div>
      )}
    </>
  );
}
