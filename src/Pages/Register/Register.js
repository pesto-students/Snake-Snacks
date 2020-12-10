/* eslint-disable no-console */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */
/* eslint-disable no-underscore-dangle */
import React, { useState } from 'react';
import Button from '../../Components/Presenters/Button/Button';
import InputElement from '../../Components/Presenters/InputElement/InputElement';
import Title from '../../Components/Title/Title';
import SignUp, { SignUpFormConfig, validate } from '../../Utils/SingUpUtils';

function Register() {
  const [form, setForm] = useState(SignUpFormConfig());

  const changeHandler = (event) => {
    if (!event) return;

    const { name, value } = event.target;

    const updatedControls = {
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
    for (const ele in updatedControls) {
      _formIsValid = updatedControls[ele].valid && _formIsValid;
    }

    setForm({
      formControls: {
        ...updatedControls,
      },
      formIsValid: _formIsValid,
    });
  };

  const getValues = () => {
    const formObject = {};
    for (const key of Object.keys(form.formControls)) {
      formObject[key] = form.formControls[key].value;
    }
    return formObject;
  };

  const submitForm = (event) => {
    event.preventDefault();
    const promise = SignUp();
    promise(getValues()).then((res) => res.json()).then((res) => {
      console.log(res);
    });
  };

  return (
    <div className="login">
      <div className="login-title">
        <Title name="Snake" className={['title-8', 'white']} />
        <Title name="Snack" className={['title-7', 'white-gray']} />
      </div>
      <form className="login-form">
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
        <Button
          type="submit"
          title="Signup"
          classNames={['white']}
          handleClick={submitForm}
          isDisabled={!form.formIsValid}
        />
      </form>
    </div>
  );
}

export default Register;
