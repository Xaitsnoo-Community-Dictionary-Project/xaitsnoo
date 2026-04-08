import Link from "next/link";
import styles from "@/styles/Browse.module.css"
import Meta from "@/components/meta"
import { useParams } from "next/navigation";
export default function browse() {
    const searchParams = useParams();
    const slug = (searchParams?.slug as string[]) || [];

    // category refers to either "Grammar Type" or "Meaning Category"
    // subCategory refers to the specific subcategories of "Grammar Type" or "Meaning Category"
    const [category, subCategory] = slug;
    const stage = slug.length + 1;

    // The data will need to be processed in order to get it to the state shown below.  
    const grammarTypes = new Map([
        ['noun', ['ant', 'cat', 'bird']],
        ['verb', ['see']],
        ['adjective', ['happy', 'tall']],
        ['adverb', ['happily']]
    ])
    
    const meaningTypes = new Map([
        ['bird', ['bluebird']],
        ['animal', ['bluebird', 'ant', 'kangaroo', 'platypus', 'chicken']],
        ['bug', ['ant']],
        ['mammal', ['kangaroo', 'platypus']],
        ['drink', ['lemonade']],
        ['food', ['chicken']]
    ])

    function searchWords(): string[] {
        if (category=="meaning-type") {
            return meaningTypes.get(subCategory) ?? [];
        }
        return grammarTypes.get(subCategory) ?? [];
    }
   
    function browseContent() {
        if (stage == 1) {
            return <h2 className={styles.browse_subtitle}>Brose by{"  "}
                <Link className={styles.navegate_link} href={`/browse/meaning-type`}>Meaning Type</Link> or{"  "}
                <Link className={styles.navegate_link} href={`/browse/grammar-type`}>Grammar Category</Link></h2>
        } else if (stage == 2) {
            return (
                <div className={styles.result_list}>
                    <h2 className={styles.browse_subtitle}>Select a {category=="meaning-type" ? "Meaning Type" : "Grammar Category"}</h2>
                    {category=="meaning-type" ? 
                        [...meaningTypes.keys()].map(relatedCategory => (
                            <div key={relatedCategory} className={styles.result}>
                                <Link className={styles.navegate_link} href={`/browse/meaning-type/${relatedCategory}`}>{relatedCategory}</Link>
                            </div>
                        ))
                    :   [...grammarTypes.keys()].map(relatedCategory => (
                            <div key={relatedCategory} className={styles.result}>
                                <Link className={styles.navegate_link} href={`/browse/grammar-type/${relatedCategory}`}>{relatedCategory}</Link>
                            </div>
                        ))}
                </div>
            )
        } else if (stage == 3) {
            return (
                <div className={styles.result_list}>
                    <h2 className={styles.browse_subtitle}>Select a {subCategory.charAt(0).toUpperCase() + subCategory.slice(1)}</h2>
                    {searchWords().map(word => (
                        <div key={word} className={styles.result}>
                            <Link className={styles.navegate_link} id="result" href={`/${word}`}>{word}</Link>
                        </div>
                    ))
                    }
                </div>
            );
        }
    }
     
    return (
        <>
            <div className={styles.header}>
                <Meta title="browse" />
                <Link className={styles.title} href="/browse">Browse Dictionary Entries</Link>
            </div>
            <hr className={styles.divider}></hr>
            {browseContent()}
        </>
    );
}
