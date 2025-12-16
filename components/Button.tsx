import React from 'react';

interface ButtonProps {
  label: React.ReactNode;
  onClick: () => void;
  className?: string;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'ghost';
  cols?: number;
}

const Button: React.FC<ButtonProps> = ({ label, onClick, className = '', variant = 'default', cols = 1 }) => {
  const baseStyles = "relative overflow-hidden rounded-2xl font-medium text-xl transition-all duration-200 active:scale-95 flex items-center justify-center shadow-lg select-none";
  
  const variants = {
    default: "bg-slate-700 hover:bg-slate-600 text-white",
    primary: "bg-blue-600 hover:bg-blue-500 text-white shadow-blue-900/20",
    secondary: "bg-slate-800 hover:bg-slate-700 text-slate-200",
    accent: "bg-amber-500 hover:bg-amber-400 text-white shadow-amber-900/20",
    ghost: "bg-transparent hover:bg-slate-800 text-slate-400 text-sm"
  };

  const colSpan = cols > 1 ? `col-span-${cols}` : '';

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variants[variant]} ${colSpan} ${className} h-16 sm:h-20`}
    >
      {label}
    </button>
  );
};

export default Button;
