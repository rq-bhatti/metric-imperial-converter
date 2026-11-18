const UNITS = {
  gal: { ret: 'L', name: 'gallons' },
  L: { ret: 'gal', name: 'liters' },
  mi: { ret: 'km', name: 'miles' },
  km: { ret: 'mi', name: 'kilometers' },
  lbs: { ret: 'kg', name: 'pounds' },
  kg: { ret: 'lbs', name: 'kilograms' }
};

function splitInput(input) {
  const str = String(input || '').trim();
  const idx = str.search(/[a-zA-Z]/);
  if (idx === -1) return [str, ''];
  return [str.slice(0, idx), str.slice(idx)];
}

function ConvertHandler() {

  this.getNum = function(input) {
    const numStr = splitInput(input)[0].trim();
    if (numStr === '') return 1;
    const parts = numStr.split('/');
    if (parts.length > 2) return 'invalid number';
    const numRe = /^(\d+(\.\d*)?|\.\d+)$/;
    if (!parts.every(p => numRe.test(p))) return 'invalid number';
    const result = parts.length === 2
      ? parseFloat(parts[0]) / parseFloat(parts[1])
      : parseFloat(parts[0]);
    if (!isFinite(result)) return 'invalid number';
    return result;
  };

  this.getUnit = function(input) {
    const unitStr = splitInput(input)[1].trim().toLowerCase();
    if (unitStr === 'l') return 'L';
    if (['gal', 'mi', 'km', 'lbs', 'kg'].includes(unitStr)) return unitStr;
    return 'invalid unit';
  };

  this.getReturnUnit = function(initUnit) {
    const u = UNITS[initUnit];
    return u ? u.ret : 'invalid unit';
  };

  this.spellOutUnit = function(unit) {
    const u = UNITS[unit];
    return u ? u.name : 'invalid unit';
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    switch (initUnit) {
      case 'gal': result = initNum * galToL; break;
      case 'L': result = initNum / galToL; break;
      case 'lbs': result = initNum * lbsToKg; break;
      case 'kg': result = initNum / lbsToKg; break;
      case 'mi': result = initNum * miToKm; break;
      case 'km': result = initNum / miToKm; break;
      default: return undefined;
    }
    return parseFloat(result.toFixed(5));
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };

}

module.exports = ConvertHandler;
