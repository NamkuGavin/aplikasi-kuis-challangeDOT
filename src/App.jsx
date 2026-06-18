import { Navigate, Route, Routes } from "react-router-dom";
import NotFoundPage from "@/modules/not_found/404_not_found";
import LoginView from "@/modules/(auth)/login/login_view";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginView />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
