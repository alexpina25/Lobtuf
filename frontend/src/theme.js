import { createTheme } from '@mui/material/styles';
import { yellow, grey } from '@mui/material/colors';

const getDesignTokens = (mode) => ({
  palette: {
    mode,
    primary: {
      main: yellow[700],
    },
    secondary: {
      main: grey[900],
    },
    ...(mode === 'dark'
      ? {
          background: {
            default: grey[900],
            paper: grey[800],
          },
        }
      : {
          background: {
            default: grey[50],
            paper: grey[100],
          },
        }),
  },
  typography: {
    fontFamily: 'Roboto, Arial, sans-serif',
  },
});

const lightTheme = createTheme(getDesignTokens('light'));
const darkTheme = createTheme(getDesignTokens('dark'));

export { lightTheme, darkTheme };
