import { createBrowserRouter, createRoutesFromElements, Route } from 'react-router-dom';
import BaseLayout from '../layouts/BaseLayout.jsx';
import { FeedPage } from '../../pages/feed/index.jsx';
import { ArticlePage } from '../../pages/articlePage/index.jsx';
import { SignInPage } from '../../pages/signInPage/index.js';
import { SignUpPage } from '../../pages/signUpPage/index.js';
import { Profile } from '../../pages/profile/index.jsx';

export const routes = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<BaseLayout />}>
      <Route index element={<FeedPage />} />
      <Route path="article/:slug" element={<ArticlePage />} />
      <Route path="signin" element={<SignInPage />} />
      <Route path="signup" element={<SignUpPage />} />
      <Route path="profile" element={<Profile />} />
    </Route>,
  ),
);
