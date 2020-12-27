const URL = 'https://vast-castle-15150.herokuapp.com/api/user/register';
export default function SignUp() {
  return (payload: any) => fetch(URL, {
    method: 'post',
    body: JSON.stringify(payload),
    headers: {
      'Content-Type': 'application/JSON',
    },
  });
}

export function SignUpFormConfig() {
  return {
    formControls: {
      username: {
        value: '',
        placeholder: 'Investor Name',
        valid: false,
        touched: false,
        message: '',
        validationRules: [
          { type: 'required', value: 'true' },
          { type: 'minLength', value: 3 },
        ],
      },
      email: {
        value: '',
        placeholder: 'email',
        valid: false,
        touched: false,
        message: '',
        validationRules: [
          { type: 'required', value: 'true' },
          { type: 'email' },
        ],
      },
      password: {
        value: '',
        placeholder: 'password',
        valid: false,
        touched: false,
        message: '',
        validationRules: [
          { type: 'required', value: 'true' },
          { type: 'minLength', value: 3 },
        ],
      },
    },
    formIsValid: false,
  };
}

export function requiredValidator(value: number | string | boolean) {
  if (value === 0) {
    return true;
  }

  if (typeof value === 'number' && Number.isFinite(value)) {
    return true;
  }

  if (typeof value === 'string' && value.trim()) {
    return true;
  }

  if (typeof value === 'boolean' && (value === false || value === true)) {
    return true;
  }

  return false;
}

export function minLengthValidator(value: string, minValue: number) {
  return value.length >= minValue;
}

export function maxLengthValidator(value: string, maxValue: number) {
  return value.length <= maxValue;
}

export function validate(value: string | number | boolean, rules: any) {
  let isValid = false;
  let message = '';

  // eslint-disable-next-line no-restricted-syntax
  for (const rule of rules) {
    switch (rule.type) {
      case 'required':
        isValid = requiredValidator(value);
        message = 'Field is Required';
        break;
      case 'minLength':
        isValid = minLengthValidator(value as string, rule.value);
        message = `Minimum ${rule.value} characters are needed`;
        break;
      case 'maxLength':
        isValid = maxLengthValidator(value as string, rule.value);
        message = `Maximum ${rule.value} characters are allowed`;
        break;
      default:
        isValid = true;
        message = '';
        break;
    }
  }

  message = isValid ? '' : message;
  return { isValid, message };
}
