export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Минимум 8 символов, хотя бы одна буква и одна цифра
  return password.length >= 8 && /[A-Za-z]/.test(password) && /[0-9]/.test(password);
}; 