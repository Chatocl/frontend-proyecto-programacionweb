import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import SignUp from './pages/SingUp';
import Home from './pages/Home';
import History from './pages/History';
import Navbar from './components/NavBar';
function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/home" element={<Home />} />
        <Route path="/history" element={<History />} />
      </Routes>
    </Router>
  );
}

export default App;
