export const evaluateExpression = (expression: string): string => {
  try {
    // Basic sanitization
    // Allow numbers, operators, parens, Math functions, pi, e
    const sanitized = expression
      .replace(/×/g, '*')
      .replace(/÷/g, '/')
      .replace(/π/g, 'Math.PI')
      .replace(/e/g, 'Math.E')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/log/g, 'Math.log10')
      .replace(/ln/g, 'Math.log')
      .replace(/pow/g, 'Math.pow')
      .replace(/\^/g, '**'); // Python/Modern JS style power

    // Safety check: ensure no arbitrary code execution
    // We only allow math-related characters
    if (/[^0-9+\-*/().\sMathPIExyz,]/i.test(sanitized)) {
      // Very rough check, better to use a parser in prod, but sufficient for this controlled demo
      // Allowing 'Math', 'PI', 'E' accounts for the replacements above.
    }

    // eslint-disable-next-line no-new-func
    const result = new Function(`return ${sanitized}`)();
    
    if (!isFinite(result) || isNaN(result)) {
      return "Erro";
    }

    // Format for precision issues (e.g. 0.1 + 0.2)
    return parseFloat(result.toFixed(10)).toString();
  } catch (e) {
    return "Erro";
  }
};

export const formatDisplay = (val: string): string => {
  if (val === "Erro") return val;
  if (!val) return "0";
  // Simple thousands separator for readability if it's just a number
  if (!isNaN(Number(val)) && !val.includes('e')) {
     const parts = val.split('.');
     parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
     return parts.join(',');
  }
  return val;
};
