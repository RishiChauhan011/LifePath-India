import { motion } from 'framer-motion';

const Card = ({ children, className = '', hover = false, ...props }) => {
  return (
    <motion.div
      whileHover={hover ? { y: -5, boxShadow: "0 10px 30px -10px rgba(0,0,0,0.5)" } : {}}
      className={`bg-card-bg rounded-xl border border-slate-700/50 shadow-card p-6 ${className}`}
      {...props}
    >
      {children}
    </motion.div>
  );
};

export default Card;
