import styles from "@/styles/InfoAbout.module.css"
import Meta from "@/components/meta"

export default function Xaitsnoo() {
    return (
        <div className = {styles.entire_page}>
          <div className={styles.title}>
            <Meta title="About" />
            <h1>About the Xaitsnoo language</h1>
          </div>
          <div>
            <p>blurb blurb</p>
          </div>
        </div>
    );
}
