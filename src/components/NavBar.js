import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();

  // No mostrar Navbar en login o signup
  if (location.pathname === '/' || location.pathname === '/signup') return null;

    // Handler de logout
  const handleLogout = () => {
    // 1) Elimina el token
    localStorage.removeItem('token');
    // 2) Redirige al Login (y reemplaza el historial)
    navigate('/', { replace: true });

     };

  return (
    <AppBar position="static" sx={{ mb: 4 }}>
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1, cursor: 'pointer' }} onClick={() => navigate('/home')}>
          Moodify
        </Typography>

        <Box>
          <Button color="inherit" onClick={() => navigate('/home')}>
            Inicio
          </Button>
          <Button color="inherit" onClick={() => navigate('/history')}>
            Historial
          </Button>
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Navbar;