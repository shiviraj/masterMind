class Code {
  constructor(code, totalChances) {
    this.code = code.slice();
    this.submittedCode = [];
    this.totalChances = totalChances;
  }

  get getCode() {
    return this.code.slice();
  }

  checkResult(code) {
    this.submittedCode.push(code);
    const codeResult = code.map((codeUnit, index) => {
      let result = '';
      if (this.code.includes(codeUnit)) {
        result = 'white';
      }
      if (this.code[index] === codeUnit) {
        result = 'red';
      }
      return result;
    });
    const remainingChances = this.totalChances - this.submittedCode.length;
    return {codeResult, remainingChances};
  }
}

module.exports = Code;
