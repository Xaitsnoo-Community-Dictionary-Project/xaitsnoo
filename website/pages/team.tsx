import styles from "@/styles/Speakers.module.css"
import Meta from "@/components/meta"

export default function Team() {
    return (
        <div className = {styles.entire_page}>
          <div>
            <Meta title="About the Team" />
            <h1>About us</h1>
          </div>
          <div>
            <p>blurb blurb</p>
          </div>
        </div>
    );
}