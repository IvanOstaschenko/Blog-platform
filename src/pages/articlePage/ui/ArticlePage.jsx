import { useParams } from 'react-router-dom';
import { Article } from '../../../entities/article/ui/index.jsx';

export function ArticlePage() {
  const { slug } = useParams();
  return <Article slug={slug} />;
}
