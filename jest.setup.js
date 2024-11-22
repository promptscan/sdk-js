// Suppress specific deprecation warnings
const originalWarn = process.emitWarning;
process.emitWarning = (warning, ...args) => {
  if (warning.includes('The `punycode` module is deprecated')) {
    return;
  }
  return originalWarn.call(process, warning, ...args);
};
