import { Box, Rating, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useFavoriteArticleMutation } from '../../../shared/api/articlesApi.js';
import { useSelector } from 'react-redux';

export function FavoriteArticle({ count, slug }) {
  const navigate = useNavigate();
  const log = useSelector((state) => state.auth.token);
  const [handler] = useFavoriteArticleMutation();
  async function favoriteHandler() {
    if (log) {
      await handler(slug).unwrap();
    } else {
      navigate('/signin');
    }
  }
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <Rating
        max={1}
        emptyIcon={<FavoriteBorderIcon sx={{ fontSize: '16px', color: '#000' }} />}
        icon={<FavoriteIcon sx={{ fontSize: '16px', color: '#FF0707' }} />}
        onChange={favoriteHandler}
      />
      <Typography variant="body2" sx={{ lineHeight: '11px' }}>
        {count}
      </Typography>
    </Box>
  );
}
FavoriteArticle.propTypes = {
  count: PropTypes.number,
  slug: PropTypes.string,
};
