import { AuthProvider } from "./context/AuthProvider";
import Dashboard from "./routes/Dashboard";
import { Home } from "./routes/Home";
import Login from "./routes/Login";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { Settings } from "./routes/Settings";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { Register } from "./routes/Register";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Public routes here */}
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          {/* Protected routes here */}
          <Route element={<ProtectedRoute />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/settings" element={<Settings />} />
          </Route>
          <Route path="*" element={<h1>page not found!</h1>} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
