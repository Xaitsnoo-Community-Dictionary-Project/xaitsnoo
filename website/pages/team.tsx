import styles from "@/styles/InfoAbout.module.css"
import Meta from "@/components/meta"

export default function Team() {
    return (
        <div className = {styles.entire_page}>
          <div className={styles.title}>
            <Meta title="About the Team" />
            <h1>About the team</h1>
          </div>
          <div className= {styles.team_header}>
            <p>This project is a collaboration between the Xaitsnoo language community and 
              linguistics students UC Berkeley. Several UC Berkeley undergraduate students 
              have and continue to participate through the Linguistics Research Apprenticeship Program. </p>
            <img src="https://linguistics.berkeley.edu/~sepomo/clearlake.jpg"/>
          </div>
          <div className={styles.team_info}>
            <p>
               <span className={styles.team_bold}>Robert Geary (Elem Pomo)</span> - Community Lead<br />
               <span className={styles.team_bold}>Anna Macknick</span> - Linguistics and LRAP Lead<br />
               <br />
               <span className={styles.team_bold}>Undergraduate Research apprentices (LRAP)</span><br />
               Current student researchers: Henry Adams, Liana Bozorgi, Jay Jiang, Nina Stadermann, Aindra Tan<br />
               Previous student researchers: Fortunato Beruman, Anette Brecko, Nyssa Comb, Mia Chyung, Michelle Deng, 
               Sara Eginova, Paloma Hashemi, Ethan Joseph, Carina Kim, Stella Merims, Chloe Oh, Sam Poder, Dennis Phan, 
               Mae Richardson, Myrah Shah, Ella Shonk, Noah Sindell, Kyla Ulug, Noelia Vasquez Ramos, Lauren Vinh, Joey Zimmerman<br />
               <br />
               <span className={styles.team_bold}>Advising and Support<br /></span>
               Lewis Lawyer (UC Davis)<br />
               Naomi Treviño (DAILP, Northeastern University)
              </p>
          </div>
        </div>
    );
}