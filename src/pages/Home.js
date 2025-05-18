/* eslint-disable jsx-a11y/iframe-has-title */
import { Box, Button, Typography, Card, IconButton } from '@mui/material';
import { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import { SiSpotify } from 'react-icons/si';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [recommendations, setRecommendations] = useState([]);
  const API_BASE = process.env.REACT_APP_API_BASE_URL;

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    if (file && !['image/png', 'image/jpeg'].includes(file.type)) {
      alert('Solo se permiten archivos PNG o JPG/JPEG');
      return;
    }

    setSelectedFile(file);
    setEmotion('');
    setRecommendations([]);
  };

  const handleAnalyze = async () => {
    if (!selectedFile) {
      alert('Selecciona una imagen primero');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const faceResponse = await fetch(`${API_BASE}/rekognition/detectface`, {
        method: 'POST',
        body: formData,
      });

      if (!faceResponse.ok) throw new Error('Error al analizar imagen');
      const faceData = await faceResponse.json();
      console.log('Datos de la cara:', faceData);

      const emocionPrincipal = faceData.emocion.toUpperCase() || 'UNKNOWN';
      setEmotion(emocionPrincipal);
      console.log('Emoción principal:', emocionPrincipal);

      const recoResponse = await fetch(`${API_BASE}/recommendations/emotion`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ emotion: emocionPrincipal }),
      });

      if (!recoResponse.ok) throw new Error('Error al obtener recomendaciones');

      const songs = await recoResponse.json();

      setRecommendations(songs.map(song => ({
        title: song.name,
        artist: song.artist,
        url: song.url,
        genre: song.genre
      })));
    } catch (error) {
      console.error('Error en análisis o recomendaciones:', error);
      alert('Algo falló al procesar la imagen o sugerir canciones.');
    }
  };

  const getTrackId = (url) => {
    const parts = url.split('/');
    return parts[parts.length - 1].split('?')[0];
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Moodify
      </Typography>

      <Box
        border="2px dashed #ccc"
        borderRadius={2}
        p={3}
        mb={2}
        textAlign="center"
        width="100%"
        maxWidth="400px"
      >
        {selectedFile ? (
          <img
            src={URL.createObjectURL(selectedFile)}
            alt="preview"
            style={{ width: '100%', borderRadius: '8px' }}
          />
        ) : (
          <Typography variant="body2" color="text.secondary">
            Elige una imagen o arrástrala aquí<br />
            <small>Solo JPG o PNG, máximo 50MB</small>
          </Typography>
        )}

        <Button
          component="label"
          variant="contained"
          color="secondary"
          startIcon={<UploadIcon />}
          sx={{
            mt: 2,
            borderRadius: 2,
            textTransform: 'none',
            fontWeight: 'bold',
            fontSize: '1rem',
            width: '100%',
            maxWidth: '200px',
          }}
        >
          Subir foto
          <input type="file" hidden onChange={handleFileChange} accept="image/png, image/jpeg" />
        </Button>
      </Box>

      <Button
        variant="contained"
        onClick={handleAnalyze}
        sx={{
          mb: 3,
          borderRadius: 2,
          fontWeight: 'bold',
          fontSize: '1rem',
          textTransform: 'none',
          width: '100%',
          maxWidth: '200px',
        }}
      >
        Analizar emoción
      </Button>

      {emotion && (
        <Box width="100%" maxWidth="50vh">
          <Typography variant="h6" color="primary" textAlign="center" mb={2}>
            Recomendaciones musicales para: {emotion}
          </Typography>

          {recommendations.map((song, index) => (
  <Card
    key={index}
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      mb: 2,
      bgcolor: '#e0f2ff',
      borderRadius: 2,
      px: 2,
      py: 1,
      width: '100%',
      maxWidth: '600px'
    }}
  >
    {/* Número */}
    <Box
      sx={{
        width: 32,
        height: 32,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontWeight: 'bold',
        bgcolor: '#b3e5fc',
        borderRadius: '50%',
        mr: 2
      }}
    >
      {index + 1}
    </Box>

    {/* Iframe de Spotify */}
    {song.url && (
      <Box sx={{ flexGrow: 1, mr: 2 }}>
        <iframe
          src={`https://open.spotify.com/embed/track/${getTrackId(song.url)}`}
          width="100%"
          height="80"
          frameBorder="0"
          allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
          loading="lazy"
          style={{ borderRadius: 8 }}
        ></iframe>
      </Box>
    )}

    {/* Botón Spotify */}
    <IconButton
      component="a"
      href={song.url}
      target="_blank"
      rel="noopener noreferrer"
      sx={{ color: '#1DB954' }}
    >
      <SiSpotify size={24} />
    </IconButton>
  </Card>
))}
        </Box>
      )}
    </Box>
  );
}

export default Home;
