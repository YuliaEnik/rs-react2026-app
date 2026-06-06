import * as yup from 'yup';
import type { IData } from '../types/types';

const schema: yup.ObjectSchema<IData> = yup
  .object({
    name: yup
      .string()
      .required('Name is required')
      .matches(/^[A-ZА-ЯЁ]/, 'The first letter must be uppercase'),
    age: yup
      .number()
      .typeError('The age should contain only numbers')
      .positive('Age must be positive')
      .required('Age is required'),
    email: yup
      .string()
      .email('Invalid email format')
      .required('Email is required'),
    country: yup.string().required('Enter country'),
    gender: yup.string().required('Choose your gender'),
    agree: yup.boolean().oneOf([true], 'You need to agree').defined(),
    password: yup
      .string()
      .min(6, 'Min 6 characters')
      .matches(/[0-9]/, 'Must contain at least 1 number')
      .matches(/[A-ZА-ЯЁ]/, 'Must contain at least 1 uppercase letter')
      .matches(/[a-zа-яё]/, 'Must contain at least 1 lowercase letter')
      .matches(/[@$!%*?&_#^]/, 'Must contain at least 1 special character')
      .required('Password is required'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password')], 'Passwords must match')
      .required('Confirm password is required'),
    file: yup
      .mixed<FileList>()
      .defined()
      .test(
        'required',
        'Choose a file',
        (value) => value && value instanceof FileList && value.length > 0
      ),
  })
  .required();

export { schema };
