import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "@/modules/not_found/404_not_found";
import LoginView from "@/modules/(auth)/login/login_view";
import HomeView from "@/modules/(beranda)/home/home_view";
import QuizView from "@/modules/(beranda)/quiz/quiz_view";
import BuildHeader from "@/components/build_header";

function App() {
  return (
    <Routes>
      <Route element={<BuildHeader />}>
        <Route path="/beranda" element={<HomeView />} />
        <Route path="/quiz" element={<QuizView />} />
      </Route>

      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
