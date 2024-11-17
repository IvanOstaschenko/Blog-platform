import { Box, Typography } from '@mui/material';
import styled from './ArticleRow.module.css';
import { Link } from 'react-router-dom';
import { UserPreview } from '../../../shared/ui/userInfo/index.jsx';
import PropTypes from 'prop-types';
import { FavoriteArticle } from '../../../features/index.js';
import { TagList } from '../../../shared/ui/article/index.jsx';

export function ArticleRow({ article }) {
  return (
    <Box className={styled['article-row']}>
      <Box>
        <Box className={styled['title-row']}>
          <Link to={`article/${article.slug}`} className={styled['article-link']}>
            {article.title}
          </Link>
          <FavoriteArticle count={article.favoritesCount} slug={article.slug} />
        </Box>
        <TagList dataList={article.tagList} />
        <Typography variant="body2" className={styled['text-preview']}>
          {article.description}
        </Typography>
      </Box>
      <UserPreview
        date={article.createdAt}
        name={article.author.username}
        image={article.author.image}
      />
    </Box>
  );
}

ArticleRow.propTypes = {
  article: PropTypes.object.isRequired,
};
