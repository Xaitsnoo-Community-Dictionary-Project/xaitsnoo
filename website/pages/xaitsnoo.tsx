import styles from "@/styles/Xaitsnoo.module.css"
import Meta from "@/components/meta"

export default function Xaitsnoo() {
    return (
        <div className = {styles.entire_page}>
          <div className="title">
            <Meta title="About" />
            <h1>About the Xaitsnoo language</h1>
          </div>
          <div className="info">
            <p>blurb blurb</p>
          </div>
        </div>
    );
}
