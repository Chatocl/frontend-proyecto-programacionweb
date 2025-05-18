import { Box, Button, Typography, Card, CardContent, IconButton } from '@mui/material';
import { useState } from 'react';
import UploadIcon from '@mui/icons-material/Upload';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [emotion, setEmotion] = useState('');
  const [recommendations, setRecommendations] = useState([]);

/*resetea los valores de la imagen y recomendaciones al seleccionar una nueva imagen*/
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setEmotion('');
    setRecommendations([]);
  };

/*Analiza la imagen que se subió*/
  const handleAnalyze = () => {
    if (!selectedFile) {
      alert('Selecciona una imagen primero');
      return;
    }
    /*Aquí iría la comunicación con el backend para analizar la imagen y obtener la emoción*/
    setEmotion('Feliz');
    setRecommendations([
      { title: 'Song 1', artist: 'Artist A' },
      { title: 'Song 2', artist: 'Artist B' },
    ]);
  };

  return (
    <Box display="flex" flexDirection="column" alignItems="center" px={2} py={4}>
      <Typography variant="h4" fontWeight="bold" mb={3}>
        Moodify
      </Typography>

      {/* Área de imagen o dropzone simulada */}
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
            Choose a file or drag & drop it here<br />
            <small>JPEG, PNG, up to 50MB</small>
          </Typography>
        )}

        {/* Botón subir foto */}
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
          <input type="file" hidden onChange={handleFileChange} accept="image/*" />
        </Button>
      </Box>

      {/* Botón analizar emoción */}
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

      {/* Resultado */}
      {emotion && (
        <Box width="100%" maxWidth="400px">
          <Typography variant="h6" color="primary" textAlign="center" mb={1}>
            Recomendaciones musicales
          </Typography>
          {recommendations.map((song, index) => (
            <Card 
            key={index}
            sx={{
              display: 'flex',
              alignItems: 'center',
              mb: 1.5,
              bgcolor: '#e0f2ff',
              borderRadius: 2,
            }}>
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
                {index + 1}
              </Box>
              <CardContent sx={{ flex: '1 0 auto' }}>
                <Typography>{song.title}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {song.artist}
                </Typography>
              </CardContent>
              <IconButton>
                <PlayArrowIcon />
              </IconButton>
            </Card>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default Home;