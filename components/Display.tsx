import React, { useRef, useEffect } from 'react';

interface DisplayProps {
  input: string;
  result: string;
  mode: string;
}

const Display: React.FC<DisplayProps> = ({ input, result, mode }) => {
  const inputRef = useRef<HTMLDivElement>(null);

  // Auto scroll to end
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.scrollLeft = inputRef.current.scrollWidth;
    }
  }, [input]);

  return (
    <div className="w-full bg-slate-900 p-6 rounded-3xl mb-6 shadow-inner border border-slate-800 relative overflow-hidden h-40 flex flex-col justify-end items-end">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-amber-500 opacity-70"></div>
      
      <div className="text-slate-400 text-xs font-mono uppercase tracking-widest absolute top-4 left-6">
        {mode}
      </div>

      <div 
        ref={inputRef}
        className="w-full text-slate-400 text-right text-lg sm:text-2xl font-mono overflow-x-auto whitespace-nowrap scrollbar-hide mb-2"
      >
        {input || '0'}
      </div>
      
      <div className="text-white text-4xl sm:text-5xl font-bold tracking-tight break-all text-right">
        {result || (input ? '...' : '0')}
      </div>
    </div>
  );
};

export default Display;
