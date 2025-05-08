import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#2B4D9B', 
    },
    secondary: {
      main: '#68B7F0', 
    },
    tertiary: {
      main: '#97B1EE',
    },
    buttoncolor: {
        main: '#657EDA',
    },
    background: {
      default: '#f4f4f4',
    },
  },
  typography: {
    fontFamily: `'Poppins', 'Roboto', 'Helvetica', 'Arial', sans-serif`,
    h3: { fontWeight: 600 },
    h4: { fontWeight: 500 },
    button: { textTransform: 'none', fontWeight: 500 },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          color: '#ffffff',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
        },
      },
    },
     MuiTextField: {
        defaultProps: {
            variant: 'filled',
        },
        styleOverrides: {
            root: {
                backgroundColor: '#e0f2ff',
                borderRadius: 10,
                input: {
                    padding: '10px',
                    color: '#2c3e50',
                },
                '.MuiFilledInput-root': {
                    backgroundColor: 'transparent',
                    borderRadius: 10,
                    minHeight: '60px',
                },
                '.MuiFilledInput-underline:before, .MuiFilledInput-underline:after': {
                    display: 'none',
                },
            },
        },
    },
  },
});

export default theme;
