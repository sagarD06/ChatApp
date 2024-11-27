import { Navigate, Route, Routes } from "react-router-dom";
import AuthPage from "./pages/AuthPage";
import Home from "./pages/Home";
import { Toaster } from "react-hot-toast";

import { useAuthContext } from "./context/AuthContext";

function App() {
  const { user } = useAuthContext();
  return (
    <div>
      <Routes>
        <Route path="/" element={user ? <Home /> : <Navigate to="/signup" />} />
        <Route
          path="/login"
          element={user ? <Navigate to="/" /> : <AuthPage page="login" />}
        />
        <Route
          path="/signup"
          element={user ? <Navigate to="/" /> : <AuthPage page="signup" />}
        />
      </Routes>
      <Toaster />
    </div>
  );
}

export default App;
