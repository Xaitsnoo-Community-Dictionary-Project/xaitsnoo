import { useState, FormEvent, ChangeEvent } from "react";
import Meta from "@/components/meta";
import Link from "next/link";

const words: string[] = [
  "ant", "baby ground squirrel", "bat", "bear", "bee", "bird", "bird, fly (insect)", 
  "bluesnake, watersnake", "bobcat, wildcat", "buck", "bullfrog", "butterfly", "buzzard", 
  "cat", "caterpillar", "chicken", "cow", "deer", "dog", "eagle", "eel, lamprey", "fish", 
  "flicker", "flying squirrel", "fox", "frog", "goat", "gopher", "gray tree squirrel", 
  "grizzly bear", "ground squirrel", "hawk", "horse", "hummingbird", "lizard", 
  "milk snake, king snake", "minnow", "moth", "mountain lion, puma, cougar", "mouse", 
  "mudhen", "owl", "pig", "porcupine", "quail", "rabbit, bunny", "raccoon", "rattlesnake", 
  "raven", "salamander", "scorpion", "seagull", "seal", "sheep", "skunk", "small squirrel", 
  "snake", "turkey", "turtle", "whale", "wolf", "worm"
];

export default function Home() {
  const [inputValue, setInputValue] = useState<string>("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [error, setError] = useState<boolean>(false);
  const [result, setResult] = useState<string>("");

  const submit = (selected?: string) => {
    const value = selected || inputValue.trim();
    if (/[^a-zA-Z]/.test(value)) {
      setError(true);
      setSuggestions([]);
      setResult("");
    } else {
      setError(false);
      setResult(value);
      setSuggestions([]);
    }
    setInputValue("");
  };

  const autocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setInputValue(input);
    setResult("");

    if (!input) {
      setSuggestions([]);
      return;
    }

    const filteredSuggestions = words
      .filter(word => word.toLowerCase().includes(input))
      .slice(0, 3);

    setSuggestions(filteredSuggestions);
  };

  const handleSuggestionClick = (word: string) => {
    submit(word);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  return (
    <>
      <Meta />
      <form id="form" onSubmit={handleSubmit}>
        <input
          id="input"
          placeholder="Search..."
          value={inputValue}
          onChange={autocomplete}
        />
      </form>
      {error && (
        <div id="characters_error" className="infobox error">
          Unexpected characters! At the moment, only the Latin alphabet is supported.
        </div>
      )}
      <div id="suggestions">
        {suggestions.map(word => (
          <div
            key={word}
            className="infobox suggestion"
            onClick={() => handleSuggestionClick(word)}
          >
            {word}
          </div>
        ))}
      </div>
      {result && (
        <Link id="result" className="infobox" href={`/${result}`}>
          {result}
        </Link>
      )}
    </>
  );
};
