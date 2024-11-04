import styled from './UserPreview.module.css';
import { Avatar, Box, Typography } from '@mui/material';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import PropTypes from 'prop-types';

export function UserPreview({ name, date, image }) {
  return (
    <Box className={styled['user-desc']}>
      <Box sx={{ textAlign: 'right' }}>
        <Typography variant="h6" component="div" sx={{ fontWeight: '400' }}>
          {name}
        </Typography>
        <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
          {format(new Date(date), 'LLLL d, yyyy', { locale: ru })}
        </Typography>
      </Box>
      <Avatar src={image || './avatar.png'} sx={{ width: 46, height: 46 }} />
    </Box>
  );
}

UserPreview.propTypes = {
  name: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  image: PropTypes.string,
};
