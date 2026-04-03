import styles from "@/styles/InfoAbout.module.css"
import Meta from "@/components/meta"

export default function How_to_use() {
    return (
        <div className = {styles.entire_page}>
          <div className={styles.title}>
            <Meta title="How to use" />
            <h1>How to use the dictionary</h1>
          </div>
          <div>
            <p>blurb blurb</p>
          </div>
        </div>
    );
}