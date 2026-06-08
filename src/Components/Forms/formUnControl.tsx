import { useRef, useState } from 'react';
import { useCountryStore } from '../../Store/useCountryStore';
import { schema } from '../../helpers/schema';
import * as yup from 'yup';
import './style.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { convertFileToBase64 } from '../../helpers/converFile';
import { Button } from '../Button/button';
import { Input } from './Input/input';
import { PasswordStrength } from '../PasswordStreingth/passwordStreigth';

const FormUnControl = () => {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const countries = useCountryStore((state) => state.list);
  const addCard = useCountryStore((state) => state.addCard);
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const [passwordValue, setPasswordValue] = useState('');

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const agreeRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleCountryInputChange = () => {
    const value = countryRef.current?.value || '';
    if (value) {
      const filtered = countries.filter((country) =>
        country.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  };

  const handleCountrySelect = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
    }
    setFilteredCountries([]);
  };

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const handlePasswordChange = () => {
    setPasswordValue(passwordRef.current?.value || '');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const currentForm = e.currentTarget;

    const dataFromFields = new FormData(currentForm);
    const selectedGender = dataFromFields.get('gender')?.toString() || '';

    const formData = {
      name: nameRef.current?.value || '',
      age: Number(ageRef.current?.value) || undefined,
      email: emailRef.current?.value || '',
      country: countryRef.current?.value || '',
      gender: selectedGender,
      file: fileRef.current?.files || ([] as unknown as FileList),
      agree: agreeRef.current?.checked || false,
      password: passwordRef.current?.value || '',
      confirmPassword: confirmPasswordRef.current?.value || '',
    };

    try {
      await schema.validate(formData, { abortEarly: false });
      if (
        !countries
          .map((c) => c.toLowerCase())
          .includes(formData.country.toLowerCase())
      ) {
        setErrors({
          country: 'Country must exist in the stored countries list',
        });
        return;
      }

      setErrors({});

      let fileBase64 = '';
      if (formData.file && formData.file.length > 0) {
        fileBase64 = await convertFileToBase64(formData.file[0]);
      }

      const cardData = {
        name: formData.name,
        age: formData.age || 0,
        email: formData.email,
        country: formData.country,
        gender: formData.gender,
        agree: formData.agree,
        file: fileBase64,
      };

      addCard(cardData);

      setSavedMessage('Information has been saved');

      setTimeout(() => {
        setSavedMessage('');
        currentForm.reset();
        setPasswordValue('');
      }, 2000);
    } catch (err) {
      if (err instanceof yup.ValidationError) {
        const validationErrors: { [key: string]: string } = {};
        err.inner.forEach((error) => {
          if (error.path) {
            validationErrors[error.path] = error.message;
          }
        });
        setErrors(validationErrors);
      }
    }
  };

  return (
    <form className="form-wrapper" onSubmit={handleSubmit}>
      <h2> Uncontrol Form</h2>

      <Input
        label="Name"
        placeholder="Enter your name..."
        ref={nameRef}
        error={errors.name}
      />

      <Input
        label="Age"
        type="number"
        placeholder="Enter your age..."
        ref={ageRef}
        error={errors.age}
      />

      <Input
        label="Email"
        type="email"
        placeholder="Enter your email..."
        ref={emailRef}
        error={errors.email}
      />

      <div className="input-wrapper">
        <label className="form-line" htmlFor="uncontrolled-country">
          Country:
          <input
            id="uncontrolled-country"
            type="text"
            placeholder="Enter your country..."
            className="input"
            ref={countryRef}
            onChange={handleCountryInputChange}
            autoComplete="off"
          />
          {filteredCountries.length > 0 && (
            <ul className="autocomplete-list">
              {filteredCountries.map((country, index) => (
                <li
                  key={index}
                  onClick={() => handleCountrySelect(country)}
                  className="autocomplete-item"
                >
                  {country}
                </li>
              ))}
            </ul>
          )}
        </label>
        {errors.country && <p className="error">{errors.country}</p>}
      </div>

      <div className="input-wrapper">
        <div className="form-line">
          <label htmlFor="gender-male">
            Male
            <input id="gender-male" type="radio" name="gender" value="male" />
          </label>
          <label htmlFor="gender-female">
            Female
            <input
              id="gender-female"
              type="radio"
              name="gender"
              value="female"
            />
          </label>
        </div>
        {errors.gender && <p className="error">{errors.gender}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line" htmlFor="uncontrolled-file">
          Choose file:
          <input
            id="uncontrolled-file"
            type="file"
            accept="image/png, 
            image/jpeg"
            ref={fileRef}
          />
        </label>
        {errors.file && <p className="error">{errors.file}</p>}
      </div>

      <div className="input-wrapper">
        <label className="form-line" htmlFor="uncontrolled-agree">
          I agree:
          <input id="uncontrolled-agree" type="checkbox" ref={agreeRef} />
        </label>
        {errors.agree && <p className="error">{errors.agree}</p>}
      </div>

      <div className="input-wrapper_password">
        <PasswordStrength passwordValue={passwordValue} />
        <label className="form-line password" htmlFor="password">
          Password:
          <input
            id="password"
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter your password..."
            ref={passwordRef}
            onChange={handlePasswordChange}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        {errors.password && <p className="error">{errors.password}</p>}
      </div>

      <div className="input-wrapper_password">
        <label className="form-line password" htmlFor="confirmPassword">
          Confirm Password:
          <input
            id="confirmPassword"
            className="input"
            type={showPassword ? 'text' : 'password'}
            placeholder="Confirm your password..."
            ref={confirmPasswordRef}
          />
          <button
            type="button"
            className="password-toggle"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </label>
        {errors.confirmPassword && (
          <p className="error">{errors.confirmPassword}</p>
        )}
      </div>

      <Button type="submit">Submit</Button>
      {savedMessage ? <p className="form-message">{savedMessage}</p> : <br />}
    </form>
  );
};

export { FormUnControl };
