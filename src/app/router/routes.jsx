import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout.jsx';
import { FeedPage } from '../../pages/feed/index.jsx';
import { ArticlePage } from '../../pages/articlePage/index.jsx';
import { LoginPage } from '../../pages/loginPage/index.jsx';
import { RegisrationPage } from '../../pages/registrationPage/ui/RegisrationPage.jsx';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<FeedPage />} />
      <Route path="article/:slug" element={<ArticlePage />} />
      <Route path="login" element={<LoginPage />} />
      <Route path="registration" element={<RegisrationPage />} />
    </Route>,
  ),
);
