import { useState } from 'react';
import ReactDOM from 'react-dom/client';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { SnackbarProvider } from 'notistack';
import { lightTheme, darkTheme } from './theme';
import App from './App';
import './index.css';

export const Root = () => {
  const [mode, setMode] = useState('dark');
  const theme = mode === 'light' ? lightTheme : darkTheme;

  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <SnackbarProvider maxSnack={3}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <App toggleTheme={toggleTheme} />
      </ThemeProvider>
    </SnackbarProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<Root />);
