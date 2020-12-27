/* eslint-disable no-console */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import InputElement from '../../Components/InputElement/InputElement';
import login, { IElement, LoginFormConfig, validate } from '../../Utils/LoginUtils';

export function Login(props: IProps) {
  const [form, setForm] = useState(LoginFormConfig());

  const changeHandler = (event: {
    target: { name: string; value: string };
  }) => {
    if (!event) return;

    const { name, value } = event.target;

    const updatedControls: { email: IElement; password: IElement } = {
      ...form.formControls,
    };

    if (name !== 'email' && name !== 'password') {
      return;
    }
    const updatedElement: IElement = {
      ...updatedControls[name],
    };

    updatedElement.value = value;
    updatedElement.touched = true;
    const { message, isValid } = validate(
      value,
      updatedElement.validationRules,
    );
    updatedElement.valid = isValid;
    updatedElement.message = message;

    updatedControls[name] = updatedElement;

    let _formIsValid = true;

    for ( const key of Object.keys(updatedControls) ) {
      if (key === 'email' || key === 'password') {
        _formIsValid = !!(updatedControls[key].valid && _formIsValid);
      }
    }

    setForm({
      formControls: {
        ...updatedControls,
      },
      formIsValid: _formIsValid,
    });
  };

  const getValues = () => {
    const formObject = {
      'email': '',
      'password': '',
    };
    for (const key of Object.keys(form.formControls)) {
      if (key === 'email' || key === 'password') {
        formObject[key] = form.formControls[key].value;
      }
    }
    return formObject;
  };

  const setUserDetails = (response: { 'auth-token': string; username: string; 'userId': string }) => {
    localStorage.setItem('isLoggedIn', 'yes');
    localStorage.setItem('auth_token', response['auth-token']);
    localStorage.setItem('username', response.username);
    localStorage.setItem('userId', response.userId);
  };

  const submitForm = async (event: any) => {
    event.preventDefault();
    const promise = login();
    try {
      const response = await (await promise(getValues())).json();
      setUserDetails(response);
      props.setIsLoggedIn(true);
    } catch (e ) {
      console.log(e);
    } finally {
      props.handleCancel();
    }
  };

  return (
    <div className="login">
      <form className="flex flex-col items-center z-20">
        <InputElement
          placeholder="Email"
          type="text"
          name="email"
          handleOnChange={changeHandler}
        />
        <InputElement
          placeholder="Password"
          type="password"
          name="password"
          handleOnChange={changeHandler}
        />
        <div className="self-end z-20">
          <Button
            text="Cancel"
            handleClick={() => props.handleCancel()}
          />
          <Button
            type={true}
            text="Login"
            handleClick={submitForm}
            isDisabled={!form.formIsValid}
          />
        </div>
      </form>
    </div>
  );
}


export interface IProps {
  handleCancel: Function;
  setIsLoggedIn: Function;
}
  
