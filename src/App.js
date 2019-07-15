import React from 'react';

const API_KEY = process.env.REACT_APP_WEATHER_API_KEY;
const url = `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`;

function useDataFetcher() {
  const [items, setItems] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(false);
  const [error, setError] = React.useState(null);


  React.useEffect(() => {
    setIsLoading(true);

    fetch(url)
      .then(res => {
        if (res.ok) {
          return res.json();
        } else {
          throw Error('Error fetching the news!');
        }
      })
      .then(res => {
        const items = res.articles;
        setItems(items);
        setIsLoading(true);
      })
      .catch(error => {
        setError(error);
      })
  }, [])

  return { items, isLoading, error };
}

function App() {
  const { items, isLoading, error } = useDataFetcher();

  if (error) {
    return <p style={{ color: 'red' }}>{error.message}</p>;
  }

  if (isLoading) {
    return <p>Loading posts...</p>;
  }

  return (
    <div>
      {items.map(item => (
        <>
          <h1>{item.author}</h1>
          <h3>{item.title}</h3>
          <p>{item.description}</p>
          <a href={item.url}>{item.source.name}</a>
        </>
      )

      )}
    </div>
  );
}



export default App;
