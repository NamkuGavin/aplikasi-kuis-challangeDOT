import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff } from "lucide-react";
import { useState } from "react";
import * as helper from "@/common/utils/helper";
import { useNavigate } from "react-router-dom";

const payloadForm = {
  email: "",
  password: "",
};

function LoginForm() {
  const [form, setForm] = useState(payloadForm);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  function handleChange(event) {
    const { name, value } = event.target;

    setForm((currentForm) => ({
      ...currentForm,
      [name]: value,
    }));

    if (errors[name]) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        [name]: "",
      }));
    }
  }

  function handleSubmit(event) {
    event.preventDefault();

    const validationErrors = helper.validateForm(form);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    navigate("/beranda", { replace: true });
  }

  return (
    <div className="p-10 w-1/2">
      <h3 className="font-bold text-2xl mb-2">Masuk Akun</h3>
      <p className="text-xs mb-5">Masukkan email dan password untuk masuk</p>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label className="text-sm font-bold text-gray-800 block mb-2">
            Email
          </label>
          <Input
            name="email"
            label="Email"
            type="email"
            value={form.email}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? "email-error" : undefined}
            autoComplete="email"
            placeholder="Masukkan email"
            className="w-full min-h-10 px-4 py-3 rounded-md border transition-all outline-none
            placeholder:text-gray-400 text-black font-semibold mb-1"
            onChange={handleChange}
          />
          {errors.email && (
            <p
              id="email-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.email}
            </p>
          )}
        </div>
        <label className="text-sm font-bold text-gray-800 block mb-2">
          Password
        </label>
        <div className="relative mb-5">
          <Input
            name="password"
            label="Password"
            type={showPassword ? "text" : "password"}
            value={form.password}
            placeholder="Masukkan password"
            autoComplete="current-password"
            aria-invalid={Boolean(errors.password)}
            onChange={handleChange}
            aria-describedby={errors.password ? "password-error" : undefined}
            className="w-full min-h-10 px-4 py-3 rounded-md border transition-all outline-none
            placeholder:text-gray-400 text-black font-semibold mb-1 pr-12"
          />
          {errors.password && (
            <p
              id="password-error"
              className="text-sm text-destructive"
              role="alert"
            >
              {errors.password}
            </p>
          )}
          <button
            type="button"
            aria-label={
              showPassword ? "Sembunyikan password" : "Tampilkan password"
            }
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-1 p-2 text-gray-500 transition-colors rounded-lg"
          >
            {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
          </button>
        </div>
        <Button
          type="submit"
          className="w-full inline-flex min-h-11 rounded-lg font-bold transition-all"
        >
          Login
        </Button>
      </form>
    </div>
  );
}

export default LoginForm;
