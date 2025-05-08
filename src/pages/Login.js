import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function Login() {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={2}
    >
      <Typography variant="h3" color='primary' gutterBottom>Moodify</Typography>
      <Typography variant="h5" color="primary" gutterBottom>Login</Typography>
      {/*Campos de login*/}  
      <Box component="form" sx={{ width: '100%', maxWidth: 360, mt: 2 }}>
        <TextField label="Email" type="email" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/home')}
        >
          Iniciar sesión
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿No tienes cuenta?{' '}
        <Link href="/signup" underline="hover">
          Regístrate
        </Link>
      </Typography>
    </Box>
  );
}

export default Login;
