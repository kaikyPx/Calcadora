import React, { useState, useEffect, useRef } from 'react';
import { Calculator, Cpu, Bot, History as HistoryIcon, Trash2, X } from 'lucide-react';
import { CalcMode, HistoryItem } from './types';
import { evaluateExpression } from './utils/mathUtils';
import { solveMathProblem } from './services/geminiService';
import Display from './components/Display';
import { StandardKeypad, ScientificKeypad } from './components/Keypads';
import Button from './components/Button';

const App: React.FC = () => {
  const [mode, setMode] = useState<CalcMode>(CalcMode.STANDARD);
  const [input, setInput] = useState<string>('');
  const [result, setResult] = useState<string>('');
  const [history, setHistory] = useState<HistoryItem[]>([]);
  const [showHistory, setShowHistory] = useState<boolean>(false);
  const [aiPrompt, setAiPrompt] = useState<string>('');
  const [isAiLoading, setIsAiLoading] = useState<boolean>(false);

  // --- Handlers ---

  const handleInput = (val: string) => {
    // Prevent multiple operators in sequence if needed, or rely on eval to fail gracefully
    // Simple logic: just append
    setInput(prev => prev + val);
  };

  const handleClear = () => {
    setInput('');
    setResult('');
  };

  const handleDelete = () => {
    setInput(prev => prev.slice(0, -1));
  };

  const handleCalculate = () => {
    if (!input) return;

    const res = evaluateExpression(input);
    setResult(res);

    if (res !== "Erro") {
      addToHistory(input, res, mode);
    }
  };

  const handleAiSubmit = async () => {
    if (!aiPrompt.trim()) return;

    setIsAiLoading(true);
    try {
      const solution = await solveMathProblem(aiPrompt);
      setResult(solution); // For AI, result might be long text
      addToHistory(aiPrompt, "Resolvido pela IA", CalcMode.AI_SOLVER);
    } catch (e) {
      setResult("Erro ao conectar com a IA");
    } finally {
      setIsAiLoading(false);
    }
  };

  const addToHistory = (expression: string, res: string, m: CalcMode) => {
    const newItem: HistoryItem = {
      id: Date.now().toString(),
      expression,
      result: res,
      mode: m,
      timestamp: Date.now(),
    };
    setHistory(prev => [newItem, ...prev].slice(0, 50));
  };

  const clearHistory = () => {
    setHistory([]);
  };

  const restoreHistoryItem = (item: HistoryItem) => {
    if (item.mode === CalcMode.AI_SOLVER) {
        setMode(CalcMode.AI_SOLVER);
        setAiPrompt(item.expression);
        setResult(item.result); // In AI mode result is the answer text
    } else {
        setMode(item.mode);
        setInput(item.expression);
        setResult(item.result);
    }
    setShowHistory(false);
  };

  // --- Render Helpers ---

  const renderKeypad = () => {
    switch (mode) {
      case CalcMode.STANDARD:
        return <StandardKeypad onInput={handleInput} onClear={handleClear} onDelete={handleDelete} onEqual={handleCalculate} />;
      case CalcMode.SCIENTIFIC:
        return <ScientificKeypad onInput={handleInput} onClear={handleClear} onDelete={handleDelete} onEqual={handleCalculate} />;
      case CalcMode.AI_SOLVER:
        return (
          <div className="flex flex-col gap-4 h-full">
            <textarea
              className="w-full h-40 bg-slate-800 text-white p-4 rounded-2xl resize-none focus:ring-2 focus:ring-blue-500 outline-none text-lg"
              placeholder="Digite seu problema matemático aqui... (Ex: Qual a raiz quadrada de 144 vezes pi?)"
              value={aiPrompt}
              onChange={(e) => setAiPrompt(e.target.value)}
            />
            <Button 
              label={isAiLoading ? "Pensando..." : "Resolver com IA"} 
              onClick={handleAiSubmit} 
              variant="accent" 
              className={isAiLoading ? "opacity-70 cursor-wait" : ""}
            />
             {result && (
              <div className="mt-4 p-4 bg-slate-800/50 rounded-2xl border border-slate-700 max-h-60 overflow-y-auto">
                 <h3 className="text-slate-400 text-xs uppercase font-bold mb-2">Resposta da IA:</h3>
                 <div className="text-white whitespace-pre-wrap leading-relaxed">
                   {result}
                 </div>
              </div>
            )}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 sm:p-6 md:p-8 font-sans">
      
      {/* Main Container */}
      <div className="w-full max-w-5xl bg-slate-900 rounded-[2.5rem] shadow-2xl overflow-hidden border border-slate-800 flex flex-col md:flex-row min-h-[800px]">
        
        {/* Sidebar / Navigation */}
        <div className="w-full md:w-24 bg-slate-900 md:border-r border-slate-800 flex md:flex-col items-center justify-between md:justify-start p-4 gap-2 md:gap-6 z-10">
           <div className="hidden md:block w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center mb-6 shadow-lg shadow-blue-900/50">
             <span className="font-bold text-white text-xl">O</span>
           </div>

           <NavButton 
             active={mode === CalcMode.STANDARD} 
             onClick={() => setMode(CalcMode.STANDARD)} 
             icon={<Calculator size={24} />} 
             label="Padrão"
           />
           <NavButton 
             active={mode === CalcMode.SCIENTIFIC} 
             onClick={() => setMode(CalcMode.SCIENTIFIC)} 
             icon={<Cpu size={24} />} 
             label="Cient."
           />
           <NavButton 
             active={mode === CalcMode.AI_SOLVER} 
             onClick={() => setMode(CalcMode.AI_SOLVER)} 
             icon={<Bot size={24} />} 
             label="IA"
           />
           
           <div className="md:mt-auto">
             <NavButton 
               active={showHistory} 
               onClick={() => setShowHistory(!showHistory)} 
               icon={<HistoryIcon size={24} />} 
               label="Hist."
             />
           </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 flex flex-col relative">
           
           {/* Header (Mobile only mainly, or title) */}
           <div className="p-6 pb-0 flex justify-between items-center">
             <h1 className="text-2xl font-semibold text-white tracking-tight">
               {mode === CalcMode.STANDARD && 'Calculadora Padrão'}
               {mode === CalcMode.SCIENTIFIC && 'Calculadora Científica'}
               {mode === CalcMode.AI_SOLVER && 'Solucionador IA'}
             </h1>
           </div>

           {/* Workspace */}
           <div className="flex-1 p-4 sm:p-6 lg:p-8 flex flex-col max-w-3xl mx-auto w-full">
              
              {mode !== CalcMode.AI_SOLVER && (
                 <Display input={input} result={result} mode={mode} />
              )}
              
              <div className="flex-1">
                {renderKeypad()}
              </div>

           </div>

           {/* History Overlay/Sidebar */}
           {showHistory && (
             <div className="absolute inset-y-0 right-0 w-full sm:w-80 bg-slate-900/95 backdrop-blur-xl border-l border-slate-700 p-6 flex flex-col z-20 transition-transform duration-300">
               <div className="flex justify-between items-center mb-6">
                 <h2 className="text-xl font-bold text-white">Histórico</h2>
                 <div className="flex gap-2">
                   <button onClick={clearHistory} className="p-2 hover:bg-slate-800 rounded-full text-red-400 transition-colors">
                     <Trash2 size={20} />
                   </button>
                   <button onClick={() => setShowHistory(false)} className="p-2 hover:bg-slate-800 rounded-full text-slate-400 transition-colors">
                     <X size={20} />
                   </button>
                 </div>
               </div>
               
               <div className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin scrollbar-thumb-slate-700">
                 {history.length === 0 ? (
                   <p className="text-slate-500 text-center mt-10">Nenhum cálculo recente.</p>
                 ) : (
                   history.map(item => (
                     <div 
                       key={item.id} 
                       onClick={() => restoreHistoryItem(item)}
                       className="p-4 bg-slate-800 rounded-xl hover:bg-slate-700 cursor-pointer transition-colors border border-slate-700/50 group"
                     >
                       <div className="text-slate-400 text-sm mb-1 font-mono break-all">{item.expression}</div>
                       <div className="text-white text-lg font-bold text-right group-hover:text-blue-400 transition-colors">
                         {item.mode === CalcMode.AI_SOLVER ? 'Ver Resposta' : `= ${item.result}`}
                       </div>
                       <div className="text-[10px] text-slate-600 mt-2 flex justify-between uppercase font-bold tracking-wider">
                         <span>{item.mode}</span>
                         <span>{new Date(item.timestamp).toLocaleTimeString()}</span>
                       </div>
                     </div>
                   ))
                 )}
               </div>
             </div>
           )}

        </div>
      </div>
    </div>
  );
};

const NavButton: React.FC<{ active: boolean; onClick: () => void; icon: React.ReactNode; label: string }> = ({ active, onClick, icon, label }) => (
  <button
    onClick={onClick}
    className={`
      flex flex-col items-center justify-center p-3 rounded-2xl w-full transition-all duration-200 group
      ${active ? 'bg-slate-800 text-blue-400 shadow-inner' : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800/50'}
    `}
  >
    <div className={`mb-1 transition-transform group-hover:scale-110 ${active ? 'scale-110' : ''}`}>
      {icon}
    </div>
    <span className="text-[10px] font-medium tracking-wide hidden md:block">{label}</span>
  </button>
);

export default App;
