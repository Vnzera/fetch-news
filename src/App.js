import React from 'react';

const API_KEY = process.env.REACT_APP_NEWS_API_KEY;
const url = 'https://newsapi.org/v2/top-headlines?sources=techcrunch';

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
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      {articles.map(article => (
        <>
          <h1>{article.author}</h1>
          <h3>{article.title}</h3>
          <p>{article.description}</p>
          <a href={article.url}>{article.source.name}</a>
        </>
      )

      )}
    </div>
  );
}



export default App;
