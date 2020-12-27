/* eslint-disable no-console */
/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../../Components/Button/Button';
import InputElement from '../../Components/InputElement/InputElement';
import SignUp, { SignUpFormConfig, validate } from '../../Utils/SignUpUtils';

export default function Register(props: IProps) {
  const [form, setForm] = useState(SignUpFormConfig());

  const changeHandler = (event: {  target: { name: string, value: any } }) => {
    if (!event) return;
  
    const { name, value } = event.target;
  
    const updatedControls: { [key: string]: any } = {
      ...form.formControls,
    };
  
    const updatedElement = {
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
    for (const key of Object.keys(updatedControls)) {
      _formIsValid = updatedControls[key].valid && _formIsValid;
    }
  
    setForm({
      formControls: {
        ...updatedControls as any,
      },
      formIsValid: _formIsValid,
    });
  };
  
  const getValues = () => {
    const formObject = {
      'username': '',
      'email': '',
      'password': '',
    };
    for (const key of Object.keys(form.formControls)) {
      if (key === 'username' || key === 'email' || key === 'password') {
        formObject[key] = form.formControls[key].value;
      }
    }
    return formObject;
  };
  
  const submitForm = async (event: any) => {
    event.preventDefault();
    const promise = SignUp();
    try {
      const response = await (await promise(getValues())).json();
      props.setIsLogin(true);
      // TODO: render login here
    } catch (e) {
      console.log(e);
    } finally {
      props.setIsSignUp(false);
    }
    // const promise = SignUp();
    // promise(getValues()).then((res) => res.json()).then((res) => {
    //   console.log(res);
    // });
  };
  
  return (
    <div className="login">
      <form className="flex flex-col items-center z-20">
        <InputElement
          placeholder="Email"
          type="email"
          name="email"
          handleOnChange={changeHandler}
        />
        <InputElement
          placeholder="Username"
          type="text"
          name="username"
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
            text="Signup"
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
  setIsSignUp: Function;
  setIsLogin: Function;
}
