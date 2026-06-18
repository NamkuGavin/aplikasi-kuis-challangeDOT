export function validateForm(form) {
  const errors = {};
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!form.email.trim()) {
    errors.email = "Email wajib diisi.";
  } else if (!emailPattern.test(form.email)) {
    errors.email = "Masukkan format email yang valid.";
  }

  if (!form.password) {
    errors.password = "Password wajib diisi.";
  } else if (form.password.length < 6) {
    errors.password = "Password minimal 6 karakter.";
  }

  return errors;
}
