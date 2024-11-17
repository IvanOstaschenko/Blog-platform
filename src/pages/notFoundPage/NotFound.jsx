import { useNavigate } from 'react-router-dom';
import { Button, Container, Typography } from '@mui/material';

export function NotFound() {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <Container style={{ textAlign: 'center', marginTop: '50px' }}>
      <Typography variant="h1" color="error">
        404
      </Typography>
      <Typography variant="h5">Страница не найдена</Typography>
      <Button variant="contained" color="primary" onClick={handleGoHome}>
        Вернуться на главную
      </Button>
    </Container>
  );
}
