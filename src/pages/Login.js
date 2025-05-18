import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';  // ← importamos el helper

function Login() {
  const navigate = useNavigate();

  // Estados para los campos y el error
  const [login,    setLogin]    = useState('');  // aquí guardamos email o username
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Llamada al endpoint de login
      const res = await apiFetch('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ login, password })
      });
      const data = await res.json();

      if (!res.ok) {
        // Si el backend devuelve msg, lo mostramos
        setError(data.msg || 'Error al iniciar sesión');
        return;
      }

      // Guardamos el token en localStorage
      localStorage.setItem('token', data.token);

      // Redirigimos a la página principal (o la ruta que quieras)
      navigate('/home');
    } catch {
      setError('No se pudo conectar con el servidor');
    }
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height="100vh"
      px={2}
    >
      <Typography variant="h3" color='primary' gutterBottom>
        Moodify
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Login
      </Typography>

      {/* Formulario de login */}
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 360, mt: 2 }}
        onSubmit={handleLogin}   // ← enlazamos el handler
      >
        <TextField
          label="Email o Username"
          type="text"
          fullWidth
          margin="normal"
          value={login}
          onChange={e => setLogin(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />

        {/* Mensaje de error */}
        {error && (
          <Typography color="error" sx={{ mt: 1 }}>
            {error}
          </Typography>
        )}

        <Button
          type="submit"             // ← cambiamos onClick por submit
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: 2 }}
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