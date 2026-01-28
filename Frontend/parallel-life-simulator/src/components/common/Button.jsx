import { motion } from 'framer-motion';

const Button = ({ children, variant = 'primary', className = '', ...props }) => {
  const baseStyles = "px-6 py-2.5 rounded-lg font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-app-bg disabled:opacity-50 disabled:cursor-not-allowed";
  
  const variants = {
    primary: "bg-primary-blue text-white hover:bg-blue-600 focus:ring-primary-blue shadow-glow",
    secondary: "bg-card-bg text-text-primary border border-slate-700 hover:bg-slate-800 focus:ring-slate-700",
    outline: "bg-transparent border border-primary-blue text-primary-blue hover:bg-primary-blue/10 focus:ring-primary-blue",
    danger: "bg-error text-white hover:bg-red-600 focus:ring-error",
  };

  return (
    <motion.button
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`${baseStyles} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;
