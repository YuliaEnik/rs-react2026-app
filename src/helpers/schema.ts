import * as yup from 'yup';
import type { IData } from '../types/types';

const MAX_FILE_SIZE = 5 * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/png', 'image/jpeg', 'image/jpg'];

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
      .required('Email is required')
      .email('Invalid email format')
      .test('dot-in-domain', 'Invalid email format', (value) => {
        if (!value) return false;
        const domainPart = value.split('@')[1];
        if (!domainPart || !domainPart.includes('.')) {
          return false;
        }
        return true;
      }),
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
      .required('Choose a file')
      .test('fileType', 'Only PNG or JPEG images are allowed', (value) => {
        if (!value || value.length === 0) return false;
        return ALLOWED_FILE_TYPES.includes(value[0]?.type);
      })
      .test(
        'fileSize',
        `File size must be less than ${MAX_FILE_SIZE / (1024 * 1024)} MB`,
        (value) => {
          if (!value || value.length === 0) return false;
          return value[0]?.size <= MAX_FILE_SIZE;
        }
      ),
  })
  .required();

export { schema };
