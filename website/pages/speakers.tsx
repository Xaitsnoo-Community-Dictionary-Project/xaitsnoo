import styles from "@/styles/InfoAbout.module.css"
import Meta from "@/components/meta"

function SpeakerInfo( {name, bio, image_src}: {name: string, bio: string, image_src?: string} ) {
    let speaker_bio;
    if (image_src) {
      speaker_bio = (
        <div className={styles.speaker_bio_photo}>
          <img src={image_src} />
          <p>{bio}</p>
        </div>
      );
    } else {
      speaker_bio = (
        <div className={styles.speaker_bio_text}>
          <p>{bio}</p>
        </div>
      )
    }

    return (
        <>
          <hr></hr>
          <div className={styles.speaker_title}>
            <h2>{name}</h2>
          </div>
          {speaker_bio}
        </>
    );
}

export default function Speakers() {
    return (
        <div className = {styles.entire_page}>
          <div className={styles.title}>
            <Meta title="Speakers" />
            <h1>Honoring Speakers</h1>
            <p>blurb blurb blurb</p>
          </div>
          <div className={styles.speaker_list}>
            <SpeakerInfo name="Person" bio="blurb blurb blurb" />
            <SpeakerInfo name="Albert Thomas" 
                         bio="blurb blurb blurb" 
                         image_src="https://linguistics.berkeley.edu/~sepomo/clearlake.jpg" />
          </div>
        </div>
    );
}
