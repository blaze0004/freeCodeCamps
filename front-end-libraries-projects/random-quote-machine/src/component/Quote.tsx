import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import Button from "./Button";

const Quote: React.FC<{
  quote: string;
  author: string;
  color: string;
  onNext: () => void;
}> = (props) => {
  const { quote, author, color, onNext } = props;

  return (
    <div
      id="quote-box"
      style={{
        padding: 20,
        backgroundColor: "white",
        borderRadius: 8,
        display: "flex",
        flexDirection: "column",
        width: "40vw",
      }}
    >
      <div
        id="text"
        style={{
          textAlign: "center",
          color: color,
          fontSize: 18,
          fontWeight: 500,
          fontFamily: "cursive",
          marginBottom: 20,
        }}
      >
        <q>{quote}</q>
      </div>
      <div
        id="author"
        style={{
          textAlign: "right",
          color: color,
        }}
      >
        -- {author}
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          marginTop: 20,
        }}
      >
        <div>
          <div
            style={{
              padding: "2px 8px",
              borderRadius: 8,
              backgroundColor: color,
            }}
          >
            <a
              href={`https://twitter.com/intent/tweet?hashtags=quotes&related=freecodecamp&text=${quote}`}
              target="_blank"
              id="tweet-quote"
              rel='noreferrer'
              style={{ color: "white", textDecoration: "none" }}
            >
              Tweet <FontAwesomeIcon icon={faShare} size="1x" color="white" />
            </a>
          </div>
        </div>
        <div id="new-quote">
          <Button bgColor={color} onClick={onNext} text="New quote" />
        </div>
      </div>
    </div>
  );
};

export default Quote;
