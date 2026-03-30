import { useState, FormEvent, ChangeEvent } from "react";
import { Button } from "@ariakit/react";
import Meta from "@/components/meta";
import Link from "next/link";
import styles from "@/styles/Index.module.css"
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
  const [result, setResult] = useState<string>(""); //result is deprecated but may be used soon!

  const submit = (selected?: string) => { //submit is deprecated but may be used soon!
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

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    submit();
  };

  const handleReset = () => {
    setError(false);
    setResult("");
    setSuggestions([]);
    setInputValue("");
  }

  return (
    <>
      <Meta />
      <h1 className={styles.title}>Xaitsnoo Community Dictionary</h1>
      <div className={styles.body}>
        <p>Look up a word (English to Xaitsnoo)</p>
        <form id="form" onSubmit={handleSubmit} onReset={handleReset} className={styles.form}>
          <div className={styles.form_elements}>
            <div className={styles.input}>
              <input className={styles.text_box}
                id="input"
                placeholder="Search..."
                value={inputValue}
                onChange={autocomplete}
              />
              <Button type="reset" className={styles.reset_btn}>x</Button>
            </div>
            <Button type="submit" className={styles.search_btn}>Search</Button>
          </div>
        </form>
        {error && (
          <div id="characters_error" className="infobox error">
            Unexpected characters! At the moment, only the Latin alphabet is supported.
          </div>
        )}
        <div id="suggestions">
          {suggestions.map(word => (
            <div className={styles.suggestion}>
              <Link className={styles.navegate_link} id="result" href={`/${word}`}>{word}</Link>
            </div>
          ))}
        </div>
        <p>Or try browsing words by <Link className={styles.navegate_link} href="">meaning category</Link> or <Link className={styles.navegate_link} href="">grammar type.</Link></p>
      </div>
    </>
  );
};
