import { Button } from "@ariakit/react";
import Link from "next/link";
import { useState } from "react";
import styles from "@/styles/Browse.module.css"
import Meta from "@/components/meta"

export default function browse() {
    const [category, setCategory] = useState<string>(""); // Whether meaning type or grammar type is selected
    const [type, setType] = useState<string>(""); // The specific grammar type or meaning category that is selected
    const [stage, setStage]= useState<number>(1); // Which section of the browsing page is currently being used

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
        if (category=="Meaning Type") {
            return meaningTypes.get(type) ?? [];
        } 
        return grammarTypes.get(type) ?? [];
    }
    function handleCategoryChange(category: string) {
        setCategory(category);
        setStage(2);
    }
    function handleTypeChange(type: string) {
        setType(type);
        setStage(3);
    }
    function handleReset() {
        setStage(1);
        setType("");
        setCategory("");
    }
   
    function browseContent() {
        if (stage == 1) {
            return <h2 className={styles.browse_subtitle}>Brose by{"  "}
                <span className={styles.navegate_link} onClick={() => handleCategoryChange("Meaning Type")}>Meaning Type</span> or{"  "}
                <span className={styles.navegate_link} onClick={() => handleCategoryChange("Grammar Type")}>Grammar Category</span></h2>
        } else if (stage == 2) {
            return (
                <div className={styles.result_list}>
                    <h2 className={styles.browse_subtitle}>Select a {category}</h2>
                    {category=="Meaning Type" ? 
                        [...meaningTypes.keys()].map(type => (
                            <div key={type} className={styles.result}>
                                <p className={styles.navegate_link} onClick={() => handleTypeChange(type)}>{type}</p>
                            </div>
                        ))
                    :   [...grammarTypes.keys()].map(type => (
                            <div key={type} className={styles.result}>
                                <p className={styles.navegate_link} onClick={() => handleTypeChange(type)}>{type}</p>
                            </div>
                        ))}
                </div>
            )
        } else if (stage == 3) {
            return (
                <div className={styles.result_list}>
                    <h2 className={styles.browse_subtitle}>Select a Word</h2>
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
                <h1 className={styles.title} onClick={() => handleReset()}>Browse Dictionary Entries</h1>
            </div>
            <hr className={styles.divider}></hr>
            {browseContent()}
        </>
    );
}