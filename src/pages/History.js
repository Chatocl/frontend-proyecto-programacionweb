// src/pages/History.js
import React, { useEffect, useState } from 'react';
import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import { apiFetch } from '../services/api';  // tu helper que inyecta el JWT

// Función auxiliar para formatear fechas
function formatDate(dateString) {
  const d = new Date(dateString);
  const pad = n => n.toString().padStart(2, '0');
  const day   = pad(d.getDate());
  const month = pad(d.getMonth() + 1);
  const year  = d.getFullYear();
  const hours = pad(d.getHours());
  const mins  = pad(d.getMinutes());
  return `${day}/${month}/${year} ${hours}:${mins}`;
}

export default function History() {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    async function fetchHistory() {
      try {
        const res = await apiFetch('/history', { method: 'GET' });
        if (!res.ok) throw new Error('Error al cargar historial');
        const data = await res.json();

        // Transformar la respuesta al formato que usa el layout
        const formatted = data.map(entry => ({
          date:     formatDate(entry.createdAt),
          emotion:  entry.emotion.charAt(0).toUpperCase() + entry.emotion.slice(1).toLowerCase(),
          songs:    entry.songs.map(s => ({ title: s.title, url: s.url }))
        }));
        console.log('→ historial recibido:', data);
        setHistory(formatted);
      } catch (err) {
        console.error(err);
        setHistory([]);  // o manejar un estado de error si prefieres
      }
    }

    fetchHistory();
  }, []);

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="primary">
        Historial de Recomendaciones
      </Typography>

      {history.length === 0 ? (
        <Typography color="text.secondary">No hay entradas en tu historial.</Typography>
      ) : (
        history.map((entry, i) => (
          <Box key={i} width="100%" maxWidth="700px" mb={4}>
            {/* Encabezado de cada entrada */}
            <Box
              bgcolor="#ffe0cc"
              borderRadius={2}
              px={2}
              py={1}
              mb={2}
            >
              <Typography fontWeight="bold" color="#2c3e50">
                Fecha: {entry.date} &nbsp;&nbsp; Emoción detectada: {entry.emotion}
              </Typography>
            </Box>

            {/* Lista de canciones */}
            {entry.songs.map((song, idx) => (
              <Card
                key={idx}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  mb: 1.5,
                  bgcolor: '#e0f2ff',
                  borderRadius: 2,
                  width: '100%'
                }}
              >
                <Box
                  sx={{
                    width: 40,
                    height: 40,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontWeight: 'bold',
                    bgcolor: '#b3e5fc',
                    borderRadius: '50%',
                    ml: 1.5,
                  }}
                >
                  {idx + 1}
                </Box>

                <CardContent sx={{ flex: '1 0 auto', pl: 2 }}>
                  <Typography color="#2c3e50">{song.title}</Typography>
                </CardContent>

                <IconButton
                  component="a"
                  href={song.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ color: '#1DB954', mr: 1 }}
                >
                  <PlayArrowIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        ))
      )}
    </Box>
  );
}