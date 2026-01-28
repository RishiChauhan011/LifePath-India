import { useState, useRef, useEffect } from 'react';

const Slider = ({ label, value, min, max, step = 1, onChange, formatValue = (v) => v, unit = '' }) => {
  const [isDragging, setIsDragging] = useState(false);
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e) => {
    onChange(Number(e.target.value));
  };

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2">
        <label className="text-sm font-medium text-text-secondary">{label}</label>
        <span className="text-sm font-bold text-primary-blue">{formatValue(value)}{unit}</span>
      </div>
      
      <div className="relative w-full h-6 flex items-center">
        {/* Track Background */}
        <div className="absolute w-full h-1.5 bg-slate-700 rounded-full" />
        
        {/* Fill Track */}
        <div 
            className="absolute h-1.5 bg-primary-blue rounded-full" 
            style={{ width: `${percentage}%` }}
        />

        {/* Thumb (Invisible Input on top) */}
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={handleChange}
          className="absolute w-full h-full opacity-0 cursor-pointer z-20"
        />

        {/* Visual Thumb */}
        <div 
            className="absolute w-5 h-5 bg-app-bg border-[3px] border-primary-blue rounded-full z-10 shadow-lg pointer-events-none transition-transform"
            style={{ 
                left: `calc(${percentage}% - 10px)`
            }}
        />
      </div>
    </div>
  );
};

export default Slider;
