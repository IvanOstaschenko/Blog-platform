import { Avatar, Box, Link, List, ListItem, ListItemText, Rating, Typography } from '@mui/material';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import styled from './ArticleRow.module.css';
import PropTypes from 'prop-types';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export default function ArticleRow({ article }) {
  return (
    <Box className={styled['article-row']}>
      <Box>
        <Box className={styled['title-row']}>
          <Link variant="h5" sx={{ color: '#1890FF' }}>
            {article.title}
          </Link>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
            <Rating
              max={1}
              emptyIcon={<FavoriteBorderIcon sx={{ fontSize: '16px', color: '#000' }} />}
              icon={<FavoriteIcon sx={{ fontSize: '16px', color: '#FF0707' }} />}
            />
            <Typography variant="body2" sx={{ lineHeight: '11px' }}>
              {article.favoritesCount}
            </Typography>
          </Box>
        </Box>
        <List sx={{ display: 'flex', gap: '8px' }}>
          {article.tagList.map(
            (tag) =>
              tag && (
                <ListItem
                  key={tag}
                  sx={{
                    height: '20px',
                    border: '1px solid #000',
                    borderRadius: '2px',
                    width: 'auto',
                    fontSize: '12px',
                    paddingInline: '5px',
                  }}
                >
                  <ListItemText>{tag}</ListItemText>
                </ListItem>
              ),
          )}
        </List>
        <Typography variant="body2" className={styled['text-preview']}>
          {article.description}
        </Typography>
      </Box>
      <Box className={styled['user-desc']}>
        <Box sx={{ textAlign: 'right' }}>
          <Typography variant="h6" component="div" sx={{ fontWeight: '400' }}>
            {article.author.username}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(0, 0, 0, 0.5)' }}>
            {format(new Date(article.createdAt), 'LLLL d, yyyy', { locale: ru })}
          </Typography>
        </Box>
        <Avatar src={article.author.image || './avatar.png'} sx={{ width: 46, height: 46 }} />
      </Box>
    </Box>
  );
}
ArticleRow.propTypes = {
  article: PropTypes.object.isRequired,
};
