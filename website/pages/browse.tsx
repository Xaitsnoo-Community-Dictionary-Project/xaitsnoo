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

    function searchWords() {
        if (category=="Meaning Type") {
            return meaningTypes.get(type);
        } else {
            return grammarTypes.get(type);
        } 
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
            return <h1>Brose by 
                <span onClick={() => handleCategoryChange("Meaning Type")}> Meaning Type</span> or 
                <span onClick={() => handleCategoryChange("Grammar Type")}> Grammar Category</span></h1>
        } else if (stage == 2) {
            return (
                <div>
                    <h1>Select a {category}</h1>
                    {category=="Meaning Type" ? 
                        [...meaningTypes.keys()].map(type => (
                            <div>
                                <p onClick={() => handleTypeChange(type)}>{type}</p>
                            </div>
                        ))
                    :   [...grammarTypes.keys()].map(type => (
                            <div>
                                <p onClick={() => handleTypeChange(type)}>{type}</p>
                            </div>
                        ))}
                </div>
            )
        } else if (stage == 3) {
            return (
                <div>
                    <h1>Select a Word</h1>
                    {searchWords().map(word => (
                        <div>
                            <Link id="result" href={`/${word}`}>{word}</Link>
                        </div>
                    ))
                    }
                </div>
            );
        }
    }
     
    return (
        <>
            <div>
                <Meta title="browse" />
                <h1>Browse Dictionary Entries</h1>
                <Button onClick={() => handleReset()}>Reset</Button>
            </div>
            {browseContent()}
        </>
    );
}