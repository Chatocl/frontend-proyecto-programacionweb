import { Box, Typography, Card, CardContent, IconButton } from '@mui/material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
  /*Datos de prueba*/
  const mockHistory = [
    {
      date: '24/03/2025 15:30',
      emotion: 'Feliz',
      songs: [
        { title: 'Song Artist' },
        { title: 'Song Artist' },
        { title: 'Song Artist' },
      ],
    },
    {
      date: '24/03/2025 17:30',
      emotion: 'Feliz',
      songs: [
        { title: 'Song Artist' },
        { title: 'Song Artist' },
      ],
    },
  ];
  
  function History() {
    return (
      <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
        <Typography variant="h4" fontWeight="bold" textAlign="center" mb={3} color="primary">
          Historial de Recomendaciones
        </Typography>
  
        {mockHistory.map((entry, i) => (
          <Box key={i} width="100%" maxWidth="500px" mb={4}>
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
  
                <IconButton sx={{ mr: 1 }}>
                  <PlayArrowIcon />
                </IconButton>
              </Card>
            ))}
          </Box>
        ))}
      </Box>
    );
  }
  
  export default History;