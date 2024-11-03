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
        <Link to={'/'}>Realworld Blog</Link>
      )}

      <Box sx={{ display: 'flex', alignItems: 'center', gap: '25px' }}>
        {!login && (
          <>
            <Button variant="signin" underline="none">
              Sign In
            </Button>
            <Button variant="signup">Sign Up</Button>
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
