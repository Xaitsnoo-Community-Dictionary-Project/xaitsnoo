import { useRouter } from 'next/router';
import Meta from "@/components/meta";
import { Button } from "@ariakit/react";
import styles from "@/styles/Word.module.css";
import Link from "next/link";

export default function Word() {
  const audio = new Audio("https://linguistics.berkeley.edu/~sepomo/WordAudio/5oct06_LK9_663.mp3");
  const start = () => {
    audio.play()
  }
  const router = useRouter();
  const { word } = router.query;
  return (
    <div className = {styles.entire_page}>
      <div className={styles.title}>
        <Meta title={word as string} />
        <h1 className={styles.entry_name}>Xaitsnoo Word</h1>
        <h1 className={styles.english_name}>{word}</h1>
        <h2>Lexical Category</h2>
      </div>
      <div className={styles.audio}>
        <h4>Listen</h4>
        <div className={styles.listen}>
          <Button onClick={start}> 🔈</Button>
          <audio
            src="https://linguistics.berkeley.edu/~sepomo/WordAudio/15apr07_LK1_549.mp3"
            controls={false}
          ></audio>
          <p>John K.</p>
        </div>
      </div>
      <div className={styles.variants}>
        <h4>Variants</h4>
        <p>Variant 1 (Speaker 1)</p>
        <p>Variant 2 (Speaker 2)</p>
      </div>
      <div className={styles.other_info}>
        <h4>Other Information</h4>
        <p>None</p>
      </div>
      <div className={styles.more}>
        <h4>View More</h4>
        <Link href="/">Mammals<br></br></Link>
        <Link href="/">Animals</Link>
      </div>
    </div>
  );
}