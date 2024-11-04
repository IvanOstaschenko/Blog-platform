import styles from './Header.module.scss';
import { Link, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { userStore } from '../../../app/redux/index.js';
import { Avatar, Box, Button, Typography } from '@mui/material';

export const Header = () => {
  const location = useLocation();
  const login = useSelector(userStore);
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
        {!login && (
          <>
            <Link to="login" className={styles['login-link']}>
              Sign In
            </Link>
            <Link to="registration" className={styles['register-link']}>
              Sign Up
            </Link>
          </>
        )}
        {login && (
          <>
            <Button variant="createarticle">Create article</Button>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: '13px', fontSize: '18px' }}>
              John Doe
              <Avatar src="./avatar.png" sx={{ width: 46, height: 46 }} />
            </Box>
          </>
        )}
      </Box>
    </header>
  );
};
