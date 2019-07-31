import React from 'react';
import styled from 'styled-components';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch';

const Card = styled.div`
  margin: 10vh auto;
  padding: 5vh;
  text-align: center;
  box-shadow: 2px 2px 6px rgb(0, 0, 0);
  border: solid 0.01px #3e4f85;
  border-radius: 5px;
  max-width: 24rem;
  max-height: 16rem;

  @media (max-width: 600px) {
    margin: 10vh 1rem;
    max-width: none;
    max-height: none;
`;

function useDataFetcher() {
  const [articles, setArticles] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  React.useEffect(() => {
    setIsLoading(true);

    fetch(url, {
      headers: {
        'x-api-key': API_KEY,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error('Error fetching the news!');
        }
      })
      .then(res => {
        const articles = res.articles;
        setArticles(articles);
        setIsLoading(false);
      })
      .catch(error => {
        setError(error);
      })
  }, [])

  return { articles, isLoading, error };
}

function App() {
  const { articles, isLoading, error } = useDataFetcher();

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }

  if (isLoading) {
    return <p style={{ textAlign: 'center' }}>Loading articles...</p>;
  }
  // Article source hardcoded as Tech Crunch but {article.source.name} works also
  return (
    <div>
      {articles.map((article, index) => (
        <Card key={index}>
          <h1>{article.author}</h1>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a target="_blank" rel="noopener noreferrer" href={article.url}>Tech Crunch</a>
        </Card>
      )

      )}
    </div>
  );
}



export default App;
