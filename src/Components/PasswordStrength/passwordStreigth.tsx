import './style.scss';

interface PasswordStrengthProps {
  passwordValue: string;
}

const PasswordStrength = ({ passwordValue }: PasswordStrengthProps) => {
  const hasNumber = /[0-9]/.test(passwordValue);
  const hasUpper = /[A-ZА-ЯЁ]/.test(passwordValue);
  const hasLower = /[a-zа-яё]/.test(passwordValue);
  const hasSpecial = /[@$!%*?&_#^]/.test(passwordValue);

  const strengthScore = [hasNumber, hasUpper, hasLower, hasSpecial].filter(
    Boolean
  ).length;

  const getStrengthColor = (score: number) => {
    if (score === 1) return '#ff4d4f';
    if (score === 2) return '#ffa940';
    if (score === 3) return '#ffec3d';
    if (score === 4) return '#52c41a';
    return '#e8e8e8';
  };

  return (
    <div className="password-strength-line-wrapper">
      <div
        className="password-strength-line"
        style={{
          width: `${(strengthScore / 4) * 100}%`,
          backgroundColor: getStrengthColor(strengthScore),
        }}
      />
    </div>
  );
};

export { PasswordStrength };
