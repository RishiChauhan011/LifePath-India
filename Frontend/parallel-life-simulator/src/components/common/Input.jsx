import { forwardRef } from 'react';

const Input = forwardRef(({ label, error, className = '', ...props }, ref) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-text-secondary mb-1.5">
          {label}
        </label>
      )}
      <input
        ref={ref}
        className={`w-full px-4 py-2.5 rounded-lg bg-app-bg border text-text-primary focus:ring-2 focus:ring-primary-blue/50 outline-none transition-all ${
          error 
            ? 'border-error focus:border-error' 
            : 'border-slate-700 focus:border-primary-blue'
        } ${className}`}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-error">{error}</p>
      )}
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
