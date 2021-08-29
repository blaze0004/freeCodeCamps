import { useEffect, useState } from "react";
import "./App.css";
import Quote from "./component/Quote";

const quotesPath =
  process.env.REACT_APP_QUOTE_PATH ??
  "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

const getRandomColor = () => {
  const r = Math.random() * 255;
  const b = Math.random() * 255;
  const g = Math.random() * 255;
  return `rgb(${r}, ${g}, ${b})`;
};

const getRandomQuote = (quotes: [] = []) => {
  if (quotes.length) {
    const randomIndex = Math.floor(Math.random() * quotes.length);
    const randomQuote = quotes[randomIndex];
    return randomQuote;
  }
  return { quote: "", author: "" };
};

const App = () => {
  const [quote, setQuote] = useState<{
    author: string;
    quote: string;
    color: string;
  }>({
    quote: "",
    author: "",
    color: "green",
  });
  const [quotes, setQuotes] = useState<any>([]);

  useEffect(() => {
    fetch(quotesPath)
      .then((data) => data.json())
      .then(({ quotes }) => {
        setQuotes(quotes);
        setRandomQuote(quotes);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const setRandomQuote = (quotesData: [] | null = null) => {
    const randomColor = getRandomColor();
    const { quote, author } = getRandomQuote(quotesData ?? quotes);
    setQuote({
      quote,
      author,
      color: randomColor,
    });
  };

  return (
    <div className="App" style={{ backgroundColor: quote.color }}>
      {quote.quote ? (
        <Quote
          author={quote.author}
          quote={quote.quote}
          color={quote.color}
          onNext={() => setRandomQuote()}
        />
      ) : (
        <div>loading...</div>
      )}
    </div>
  );
};

export default App;
