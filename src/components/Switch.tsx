import React from 'react';

interface SwitchProps {
  checked: boolean;
  onChange: () => void;
  className?: string;
}

export const Switch: React.FC<SwitchProps> = ({ checked, onChange, className }) => {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      onClick={onChange}
      className={className}
    >
      <span className="sr-only">Toggle</span>
      <span
        className={`${
          checked ? 'translate-x-6' : 'translate-x-1'
        } inline-block h-4 w-4 transform rounded-full bg-white transition`}
      />
    </button>
  );
};
