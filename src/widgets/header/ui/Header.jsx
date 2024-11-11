import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { Avatar, Box, Button, Typography } from '@mui/material';
import { isLogin } from '../../../shared/utils/isLogin.js';
import { useGetCurrentUserQuery } from '../../../shared/api/articlesApi.js';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logIn, logOut } from '../../../app/redux/authSlice.js';

export const Header = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const log = useSelector((state) => state.auth.token);
  const { data } = useGetCurrentUserQuery(log);
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) dispatch(logIn(token));
  }, [log]);
  const logOutHandler = () => {
    dispatch(logOut());
    localStorage.removeItem('token');
  };
  return (
    <header className={styles.header}>
      {location.pathname === '/' ? (
        <Typography variant="h6">Realworld Blog</Typography>
      ) : (
        <Link to={'/'} className={styles['home-link']}>
          Realworld Blog
        </Link>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        {!isLogin() && (
          <>
            <Link to="/signin" className={styles['login-link']}>
              Sign In
            </Link>
            <Link to="/signup" className={styles['register-link']}>
              Sign Up
            </Link>
          </>
        )}
        {isLogin() && (
          <>
            <Button variant="createarticle">Create article</Button>

            <Link to="/profile" className={styles.profile}>
              {data?.user.username}
              <Avatar src={data?.user.image || './avatar.png'} sx={{ width: 46, height: 46 }} />
            </Link>
            <Button variant="logout" onClick={logOutHandler}>
              Log Out
            </Button>
          </>
        )}
      </Box>
    </header>
  );
};
