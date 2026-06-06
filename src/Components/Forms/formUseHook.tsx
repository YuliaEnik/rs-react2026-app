import { useState, useEffect } from 'react';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { IData } from '../../types/types';
import { schema } from '../../helpers/schema';
import { PasswordStrength } from '../PasswordStrength/passwordStreigth';
import { Button } from '../Button/button';
import './style.scss';

const countries = ['USA', 'Canada', 'Ukraine', 'Germany', 'Kazakhstan'];

const FormUseHook = () => {
  const [savedMessage, setSavedMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [inputValue, setInputValue] = useState('');
  const [filteredCountries, setFilteredCountries] = useState<string[]>([]);

  const togglePasswordVisibility = () => {
    setShowPassword((prev) => !prev);
  };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors, isValid },
    setValue,
  } = useForm<IData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const passwordValue = watch('password') || '';

  const onSubmit = (data: IData) => {
    console.log(data);
    setSavedMessage('Information has been saved');
    setTimeout(() => {
      setSavedMessage('');
      reset();
      setInputValue('');
    }, 2000);
  };

  useEffect(() => {
    if (inputValue) {
      const filtered = countries.filter((country: string) =>
        country.toLowerCase().includes(inputValue.toLowerCase())
      );
      setFilteredCountries(filtered);
    } else {
      setFilteredCountries([]);
    }
  }, [inputValue]);

  const handleCountrySelect = (country: string) => {
    setInputValue(country);
    setFilteredCountries([]);
    setValue('country', country, { shouldValidate: true });
  };

  return (
    <>
      <form
        id="myForm"
        className="form-wrapper"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div className="input-wrapper">
          <label className="form-line">
            Name:
            <input
              type="text"
              placeholder="Enter your name..."
              className="input"
              {...register('name')}
            />
          </label>
          {errors.name ? (
            <p className="error">{errors.name.message}</p>
          ) : (
            <br />
          )}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            Age:
            <input
              type="number"
              className="input"
              placeholder="Enter your age..."
              {...register('age')}
            />
          </label>
          {errors.age ? <p className="error">{errors.age.message}</p> : <br />}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            Email:
            <input
              type="email"
              placeholder="Enter your email..."
              className="input"
              {...register('email')}
            />
          </label>
          {errors.email ? (
            <p className="error">{errors.email.message}</p>
          ) : (
            <br />
          )}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            Country:
            <input
              type="text"
              placeholder="Enter your country..."
              className="input"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onBlur={() => setTimeout(() => setFilteredCountries([]), 200)}
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
            <input type="hidden" {...register('country')} />
          </label>
          {errors.country ? (
            <p className="error">{errors.country.message}</p>
          ) : (
            <br />
          )}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            Male
            <input type="radio" {...register('gender')} value="male" />
          </label>
          <label className="form-line">
            Female
            <input type="radio" {...register('gender')} value="female" />
          </label>
          {errors.gender ? (
            <p className="error">{errors.gender.message}</p>
          ) : (
            <br />
          )}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            Choose image:
            <input
              id="file"
              type="file"
              accept="image/png, image/jpeg"
              {...register('file')}
            />
          </label>
          {errors.file ? (
            <p className="error">{errors.file.message}</p>
          ) : (
            <br />
          )}
        </div>

        <div className="input-wrapper">
          <label className="form-line">
            I agree:
            <input type="checkbox" {...register('agree')} />
          </label>
          {errors.agree ? (
            <p className="error">{errors.agree.message}</p>
          ) : (
            <br />
          )}
        </div>
        <PasswordStrength passwordValue={passwordValue} />
        <div className="input-wrapper_password">
          <label className="form-line">
            Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter your password..."
              {...register('password')}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </label>

          {errors.password && (
            <p className="error">{errors.password.message}</p>
          )}
        </div>

        <div className="input-wrapper_password">
          <label className="form-line">
            Confirm Password:
            <input
              className="input"
              type={showPassword ? 'text' : 'password'}
              placeholder="Confirm your password..."
              {...register('confirmPassword')}
            />
            <button
              type="button"
              className="password-toggle"
              onClick={togglePasswordVisibility}
            >
              {showPassword ? 'Hide' : 'Show'}
            </button>
          </label>
          {errors.confirmPassword && (
            <p className="error">{errors.confirmPassword.message}</p>
          )}
        </div>

        <Button type="submit" disabled={!isValid}>
          Submit
        </Button>
        {savedMessage ? <p className="form-message">{savedMessage}</p> : <br />}
      </form>
    </>
  );
};

export { FormUseHook };
