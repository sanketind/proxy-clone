import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    primary: {
      main: '#00A783', // The teal/green color from buttons
      light: '#E6F7F4',
    },
    secondary: {
      main: '#FF9F43', // The orange color from SA button
    },
    background: {
      default: '#FFFFFF',
      paper: '#F8F9FA',
    },
    text: {
      primary: '#2D3436',
      secondary: '#636E72',
    }
  },
  typography: {
    fontFamily: '"PP Mono", monospace',
    h1: {
      fontSize: '2rem',
      fontWeight: 600,
      color: '#2D3436',
      fontFamily: '"PP Mono", monospace',
    },
    h2: {
      fontSize: '1.5rem',
      fontWeight: 600,
      color: '#2D3436',
      fontFamily: '"PP Mono", monospace',
    },
    body1: {
      fontSize: '1rem',
      color: '#636E72',
      fontFamily: '"PP Mono", monospace',
    },
    body2: {
      fontFamily: '"PP Mono", monospace',
    },
    button: {
      fontFamily: '"PP Mono", monospace',
    }
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: '8px',
          textTransform: 'none',
          padding: '8px 16px',
          fontFamily: '"PP Mono", monospace',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          fontFamily: '"PP Mono", monospace',
        }
      }
    }
  },
});
