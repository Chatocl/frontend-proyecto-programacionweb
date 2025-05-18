// src/pages/SignUp.js
import React, { useState } from 'react';
import { Box, Button, TextField, Typography, Link } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { apiFetch } from '../services/api';   // ← importamos el helper

function SignUp() {
  const navigate = useNavigate();

  // Estados para los campos y el error
  const [email,           setEmail]           = useState('');
  const [username,        setUsername]        = useState('');
  const [password,        setPassword]        = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error,           setError]           = useState('');

  // Manejador de registro
  const handleSignUp = async (e) => {
    e.preventDefault();
    setError('');

    // Validación básica de contraseñas
    if (password !== confirmPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      // Llamada POST a /api/auth/register
      const res = await apiFetch('/auth/register', {
        method: 'POST',
        body: JSON.stringify({ username, email, password })
      });
      const data = await res.json();

      if (!res.ok) {
        // Mostrar mensaje de error que venga del backend
        setError(data.msg || 'Error al crear la cuenta');
        return;
      }

      // Registro OK → redirigir a login ("/")
      navigate('/');
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
      <Typography variant="h3" color="primary" gutterBottom>
        Moodify
      </Typography>
      <Typography variant="h5" color="primary" gutterBottom>
        Crear cuenta
      </Typography>

      {/* Formulario de Signup */}
      <Box
        component="form"
        sx={{ width: '100%', maxWidth: 360, mt: 2 }}
        onSubmit={handleSignUp}   // ← aquí ligamos el handler
      >
        <TextField
          label="Email"
          type="email"
          fullWidth
          margin="normal"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
        <TextField
          label="Username"
          fullWidth
          margin="normal"
          value={username}
          onChange={e => setUsername(e.target.value)}
        />
        <TextField
          label="Password"
          type="password"
          fullWidth
          margin="normal"
          value={password}
          onChange={e => setPassword(e.target.value)}
        />
        <TextField
          label="Confirmar password"
          type="password"
          fullWidth
          margin="normal"
          value={confirmPassword}
          onChange={e => setConfirmPassword(e.target.value)}
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