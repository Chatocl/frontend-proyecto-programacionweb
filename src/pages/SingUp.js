import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';

function SignUp() {
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
      <Typography variant="h3" color="primary" gutterBottom>Moodify</Typography>
      <Typography variant="h5" color="primary" gutterBottom>Crear cuenta</Typography>
      {/*Campos de Signup*/}
      <Box component="form" sx={{ width: '100%', maxWidth: 360, mt: 2 }}>
        <TextField label="Email" type="email" fullWidth margin="normal" />
        <TextField label="Username" fullWidth margin="normal" />
        <TextField label="Password" type="password" fullWidth margin="normal" />
        <TextField label="Confirmar password" type="password" fullWidth margin="normal" />

        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
          onClick={() => navigate('/home')}
        >
          Crear cuenta
        </Button>
      </Box>

      <Typography variant="body2" sx={{ mt: 2 }}>
        ¿Ya tienes cuenta?{' '}
        <Link href="/" underline="hover">
          Inicia sesión
        </Link>
      </Typography>
    </Box>
  );
}

export default SignUp;
