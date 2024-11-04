import { Box, Typography } from '@mui/material';
import styled from './ArticleHeader.module.css';
import { UserPreview } from '../../../shared/ui/userInfo/index.jsx';
import PropTypes from 'prop-types';
import { FavoriteArticle } from '../../../features/index.js';
import { TagList } from '../../../shared/ui/article/index.jsx';

export function ArticleHeader({ article }) {
  return (
    <Box className={styled.wrapper}>
      <Box>
        <Box className={styled['title-row']}>
          <Typography variant="h5" sx={{ color: '#1890FF' }}>
            {article.title}
          </Typography>
          <FavoriteArticle count={article.favoritesCount} />
        </Box>
        <TagList dataList={article.tagList} />
        <Typography variant="body2">{article.description}</Typography>
      </Box>
      <Box>
        <UserPreview
          date={article.createdAt}
          name={article.author.username}
          image={article.author.image}
        />
      </Box>
    </Box>
  );
}

ArticleHeader.propTypes = {
  article: PropTypes.object.isRequired,
};
