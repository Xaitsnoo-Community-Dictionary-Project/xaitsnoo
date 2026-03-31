import { useState, FormEvent, ChangeEvent } from "react";
import { button } from "@ariakit/react";
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

  function levenshtein(a: string, b: string): number {
    const matrix = Array.from({ length: a.length + 1 }, (_, i) => [i]);
    for (let j = 1; j <= b.length; j++) {
      matrix[0][j] = j;
    }
    for (let i = 1; i <= a.length; i++) {
      for (let j = 1; j <= b.length; j++) {
        if (a[i - 1] === b[j - 1]) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j - 1] + 1
          );
        }
      }
    }
    return matrix[a.length][b.length];
  }

  const autocomplete = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setInputValue(input);
    setResult("");

    if (!input) {
      setSuggestions([]);
      return;
    }

    const ranked = words
      .map(word => ({
        word,
        distance: levenshtein(word.toLowerCase(), input),
        includes: word.toLowerCase().includes(input)
      }))
      .sort((a, b) => {
        if (a.includes && !b.includes) return -1;
        if (!a.includes && b.includes) return 1;
        return a.distance - b.distance;
      })
      .slice(0, 5)
      .map(item => item.word);

    setSuggestions(ranked);
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
              <button type="reset" className={styles.reset_btn}>x</button>
            </div>
            <button type="submit" className={styles.search_btn}>Search</button>
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
