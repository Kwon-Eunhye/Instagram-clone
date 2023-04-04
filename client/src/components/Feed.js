import {useState, useEffect, useContext} from 'react';
import ArticleTemplate from './ArticleTemplate';
import { getFeed, deleteArticle, favorite, unfavorite } from '../utils/requests';
import Spinner from './Spinner';

const limit = 5;

export default function Feed() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [articles, setArticles] = useState([]);
  const [skip, setSkip] = useState(0);
  const [articleCount, setArticleCount] = useState(0);

  useEffect(() => {
    setError(null);
    setIsLoaded(false);

    getFeed(skip)
      .then(data => {
        setArticleCount(data.articleCount);

        const updatedArticles = [...articles, ...data.articles];
        setArticles(updatedArticles);
      })
      .catch(error => {
        setError(error)
      })
      .finally(() => setIsLoaded(true));
  }, [skip])

  // console.log(articles)
  // console.log(articleCount)

  async function handleFavorite(id) {

  }

  async function handleUnfavorite(id) {

  }

  async function handleDelete(id) {}

  const articleList = articles.map(article => (  // AritcleTemplate으로 Feed 페이지를 작성
    <li key={article.id} className='border-b pb-4'>
      <ArticleTemplate
        article={article}
        handleFavorite={handleFavorite}
        handleUnfavorite={handleUnfavorite}
        handleDelete={handleDelete}
      />
    </li>
  ))

}