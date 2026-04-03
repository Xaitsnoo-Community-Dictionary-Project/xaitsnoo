import styles from "@/styles/InfoAbout.module.css"
import Meta from "@/components/meta"

export default function Team() {
    return (
        <div className = {styles.entire_page}>
          <div className={styles.title}>
            <Meta title="About the Team" />
            <h1>About the dictionary</h1>
          </div>
          <div>
            <p>blurb blurb</p>
          </div>
        </div>
    );
}