export function validarCPF(cpf) {
    // Código de validação que mostrei anteriormente
    // Remove non-digit characters
    cpf = cpf.replace(/[^\d]/g, '');
    
    // Check if CPF has 11 digits
    if (cpf.length !== 11) return false;
    
    // Check for obviously invalid CPFs (all same digit)
    if (/^(\d)\1{10}$/.test(cpf)) return false;
    
    // Calculate first check digit
    let sum = 0;
    for (let i = 0; i < 9; i++) {
      sum += parseInt(cpf.charAt(i)) * (10 - i);
    }
    let remainder = 11 - (sum % 11);
    let checkDigit1 = remainder >= 10 ? 0 : remainder;
    
    // Verify first check digit
    if (checkDigit1 !== parseInt(cpf.charAt(9))) return false;
    
    // Calculate second check digit
    sum = 0;
    for (let i = 0; i < 10; i++) {
      sum += parseInt(cpf.charAt(i)) * (11 - i);
    }
    remainder = 11 - (sum % 11);
    let checkDigit2 = remainder >= 10 ? 0 : remainder;
    
    // Verify second check digit
    return checkDigit2 === parseInt(cpf.charAt(10));
  }