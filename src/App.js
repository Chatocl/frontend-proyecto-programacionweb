import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import Home from './pages/Home';
import History from './pages/History';
import Navbar from './components/NavBar';

function RequireAuth({ children }) {
  // 1) Sacamos el token de localStorage (o de tu context)
  const token = localStorage.getItem('token');
  // 2) Si no existe, redirige a login
  if (!token) return <Navigate to="/" replace />;
  // 3) Si existe, deja entrar
  return children;
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<RequireAuth>
              <Home />
            </RequireAuth>} />
        <Route path="/history" element={            <RequireAuth>                 
              <History />
            </RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;