import { Box, Rating, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import PropTypes from 'prop-types';
import { isLogin } from '../../../shared/utils/isLogin.js';

export function FavoriteArticle({ count }) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
      <Rating
        max={1}
        emptyIcon={<FavoriteBorderIcon sx={{ fontSize: '16px', color: '#000' }} />}
        icon={<FavoriteIcon sx={{ fontSize: '16px', color: '#FF0707' }} />}
        disabled={isLogin()}
      />
      <Typography variant="body2" sx={{ lineHeight: '11px' }}>
        {count}
      </Typography>
    </Box>
  );
}
FavoriteArticle.propTypes = {
  count: PropTypes.number,
};
