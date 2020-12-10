import React from 'react';
import Button from '../../Components/Presenters/Button/Button';
import InputElement from '../../Components/Presenters/InputElement/InputElement';
import Title from '../../Components/Title/Title';
import './Login.css';

function Login() {
  return (
    <div className="login">
      <div className="login-title">
        <Title name="Snake" className={['title-8', 'white']} />
        <Title name="Snack" className={['title-7', 'white-gray']} />
      </div>
      <form className="login-form">
        <InputElement
          placeholder="username"
          type="text"
        />
        <InputElement
          placeholder="password"
          type="password"
        />
        <Button
          type="submit"
          title="Login"
          classNames={['white']}
        />
      </form>
    </div>
  );
}

export default Login;
