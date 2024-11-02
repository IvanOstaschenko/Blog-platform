import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { Provider } from 'react-redux';
import store from './store/store.js';
import BaseLayout from './layouts/BaseLayout.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
      <BaseLayout />
    </Provider>
  </StrictMode>,
);
