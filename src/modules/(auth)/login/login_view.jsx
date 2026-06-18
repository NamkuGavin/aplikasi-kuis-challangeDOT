import { ShieldCheck } from "lucide-react";
import LoginForm from "./components/login_form";

function LoginView() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-50 px-25">
      <div className="flex w-full bg-white rounded-2xl shadow-sm border border-gray-100">
        <div className="w-1/2 bg-[#383E4E] p-10 rounded-l-xl flex flex-col">
          <div className="flex items-center gap-4 mb-15">
            <div className="w-11 h-11 rounded-xl bg-[#262A35] text-white flex items-center justify-center">
              <ShieldCheck size={22} />
            </div>
            <h3 className="text-white font-medium">Quiz Trivia App</h3>
          </div>
          <h2 className="text-white font-bold text-3xl mb-3">
            Masuk dan mulai kuismu
          </h2>
          <h3 className="text-white">
            Jawab, dan lihat hasil terbaikmu dalam satu sesi kuis
          </h3>
          <h3 className="text-white text-xs mt-auto">
            Belajar lebih seru, satu pertanyaan dalam satu waktu
          </h3>
        </div>
        <LoginForm />
      </div>
    </main>
  );
}

export default LoginView;
