export interface IData {
  name: string;
  age: number;
  email: string;
  country: string;
  gender: string;
  agree: boolean;
  password: string;
  confirmPassword: string;
  file: FileList;
}

export interface IButton {
  children: React.ReactNode;
  type?: 'submit' | 'button' | 'reset';
  disabled?: boolean;
  onClick?: () => void;
}
