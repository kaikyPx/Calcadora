import React from 'react';
import Button from './Button';
import { Delete, Divide, X, Minus, Plus, Equal, Hash, Binary, SquareSigma } from 'lucide-react';

interface KeypadProps {
  onInput: (val: string) => void;
  onClear: () => void;
  onDelete: () => void;
  onEqual: () => void;
}

export const StandardKeypad: React.FC<KeypadProps> = ({ onInput, onClear, onDelete, onEqual }) => {
  return (
    <div className="grid grid-cols-4 gap-3 sm:gap-4">
      <Button label="C" onClick={onClear} variant="secondary" className="text-red-400" />
      <Button label="( )" onClick={() => onInput('()')} variant="secondary" />
      <Button label="%" onClick={() => onInput('%')} variant="secondary" />
      <Button label={<Divide size={24} />} onClick={() => onInput('÷')} variant="primary" />

      <Button label="7" onClick={() => onInput('7')} />
      <Button label="8" onClick={() => onInput('8')} />
      <Button label="9" onClick={() => onInput('9')} />
      <Button label={<X size={24} />} onClick={() => onInput('×')} variant="primary" />

      <Button label="4" onClick={() => onInput('4')} />
      <Button label="5" onClick={() => onInput('5')} />
      <Button label="6" onClick={() => onInput('6')} />
      <Button label={<Minus size={24} />} onClick={() => onInput('-')} variant="primary" />

      <Button label="1" onClick={() => onInput('1')} />
      <Button label="2" onClick={() => onInput('2')} />
      <Button label="3" onClick={() => onInput('3')} />
      <Button label={<Plus size={24} />} onClick={() => onInput('+')} variant="primary" />

      <Button label="0" onClick={() => onInput('0')} />
      <Button label="." onClick={() => onInput('.')} />
      <Button label={<Delete size={24} />} onClick={onDelete} variant="secondary" />
      <Button label={<Equal size={24} />} onClick={onEqual} variant="accent" />
    </div>
  );
};

export const ScientificKeypad: React.FC<KeypadProps> = ({ onInput, onClear, onDelete, onEqual }) => {
  return (
    <div className="grid grid-cols-5 gap-2 sm:gap-3">
       {/* Row 1 */}
      <Button label="rad" onClick={() => {}} variant="ghost" className="text-xs" />
      <Button label="deg" onClick={() => {}} variant="ghost" className="text-xs" />
      <Button label="x!" onClick={() => onInput('!')} variant="secondary" className="text-sm" />
      <Button label="(" onClick={() => onInput('(')} variant="secondary" />
      <Button label=")" onClick={() => onInput(')')} variant="secondary" />

       {/* Row 2 */}
      <Button label="sin" onClick={() => onInput('sin(')} variant="secondary" className="text-sm font-bold" />
      <Button label="cos" onClick={() => onInput('cos(')} variant="secondary" className="text-sm font-bold" />
      <Button label="tan" onClick={() => onInput('tan(')} variant="secondary" className="text-sm font-bold" />
      <Button label="C" onClick={onClear} variant="secondary" className="text-red-400" />
      <Button label={<Delete size={20} />} onClick={onDelete} variant="secondary" />
      
       {/* Row 3 */}
      <Button label="ln" onClick={() => onInput('ln(')} variant="secondary" className="text-sm" />
      <Button label="log" onClick={() => onInput('log(')} variant="secondary" className="text-sm" />
      <Button label="7" onClick={() => onInput('7')} />
      <Button label="8" onClick={() => onInput('8')} />
      <Button label="9" onClick={() => onInput('9')} />

       {/* Row 4 */}
      <Button label="π" onClick={() => onInput('π')} variant="secondary" />
      <Button label="e" onClick={() => onInput('e')} variant="secondary" />
      <Button label="4" onClick={() => onInput('4')} />
      <Button label="5" onClick={() => onInput('5')} />
      <Button label="6" onClick={() => onInput('6')} />

      {/* Row 5 */}
      <Button label="√" onClick={() => onInput('sqrt(')} variant="secondary" />
      <Button label="^" onClick={() => onInput('^')} variant="secondary" />
      <Button label="1" onClick={() => onInput('1')} />
      <Button label="2" onClick={() => onInput('2')} />
      <Button label="3" onClick={() => onInput('3')} />

      {/* Row 6 */}
      <Button label="÷" onClick={() => onInput('÷')} variant="primary" />
      <Button label="×" onClick={() => onInput('×')} variant="primary" />
      <Button label="-" onClick={() => onInput('-')} variant="primary" />
      <Button label="+" onClick={() => onInput('+')} variant="primary" />
      <Button label="=" onClick={onEqual} variant="accent" className="row-span-2" />
      
      {/* Row 7 (Partial due to = rowspan) */}
      <Button label="0" onClick={() => onInput('0')} className="col-span-2" />
      <Button label="." onClick={() => onInput('.')} />
      <Button label="Ans" onClick={() => {}} variant="secondary" className="text-xs" />
    </div>
  );
};
