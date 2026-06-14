import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import type { IData } from '../../types/types';
import { schema } from '../../helpers/schema';
import { Button } from '../Button/button';
import { ControlledAutocomplete } from './Controllers/controlledSelect';
import { ControlledInput } from './Controllers/controlledInput';
import { useCountryStore } from '../../Store/useCountryStore';
import { ControlledPassword } from './Controllers/controlledPassword';
import { ControlledCheckbox } from './Controllers/controlledCheckbox';
import { ControlledFile } from './Controllers/controlledFile';
import { ControlledGender } from './Controllers/controlledGender';
import { convertFileToBase64 } from '../../helpers/converFile';
import './style.scss';

interface FormUseHookProps {
  onSuccess: () => void;
}

const FormUseHook = ({ onSuccess }: FormUseHookProps) => {
  const countries = useCountryStore((state) => state.list);
  const addCard = useCountryStore((state) => state.addCard);

  const {
    handleSubmit,
    control,
    reset,
    formState: { isValid },
  } = useForm<IData>({
    mode: 'onChange',
    resolver: yupResolver(schema),
  });

  const onSubmit = async (data: IData) => {
    try {
      let fileBase64 = '';
      if (data.file && data.file.length > 0) {
        fileBase64 = await convertFileToBase64(data.file[0]);
      }

      const cardData = {
        name: data.name,
        age: data.age,
        email: data.email,
        country: data.country,
        gender: data.gender,
        agree: data.agree,
        file: fileBase64,
      };

      addCard(cardData);
      reset();
      onSuccess();
    } catch (error) {
      console.error('Invalid form:', error);
    }
  };

  return (
    <form
      id="myForm"
      className="form-wrapper"
      onSubmit={handleSubmit(onSubmit)}
    >
      <h2>FormUseHook </h2>

      <ControlledInput
        control={control}
        name="name"
        label="Name"
        placeholder="Enter your name..."
      />

      <ControlledInput
        control={control}
        name="age"
        label="Age"
        type="number"
        placeholder="Enter your age..."
      />

      <ControlledInput
        control={control}
        name="email"
        label="Email"
        type="email"
        placeholder="Enter your email..."
      />

      <ControlledAutocomplete
        control={control}
        name="country"
        label="Country"
        options={countries}
      />

      <ControlledGender control={control} name="gender" />

      <ControlledFile control={control} name="file" label="Choose file" />

      <ControlledCheckbox control={control} name="agree" label="I agree" />

      <ControlledPassword
        name={'password'}
        control={control}
        label="Password"
        placeholder="Enter your password..."
        showStrength={true}
      />

      <ControlledPassword
        name={'confirmPassword'}
        control={control}
        label="Confirm password"
        placeholder="Confirm your password..."
      />

      <Button type="submit" disabled={!isValid}>
        Submit
      </Button>
    </form>
  );
};

export { FormUseHook };
