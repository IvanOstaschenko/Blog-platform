import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';

import { RouterProvider } from 'react-router-dom';
import { routes } from './router/index.jsx';
import store from './redux/store.js';
import { ThemeProvider } from '@mui/material';
import { theme } from './providers/themeProvider.js';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <RouterProvider router={routes} />
      </ThemeProvider>
    </Provider>
  </StrictMode>,
);
