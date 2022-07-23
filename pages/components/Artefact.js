import Image from 'next/image';
import Q from '/static/stake/question.png';

import styles from "/styles/stake.module.scss";


const Artefact = ({ img, item, isReveal }) => {
    console.log("IMG:",img)
    
    return (

        <div >
            
            <div className = {styles.revealImg}>
                <Image src = {img}></Image>
                {isReveal&&
                    <div className = {styles.question}>
                        <Image  src = {Q}></Image>
                    </div>
                }
                
            </div>
            <div className = {styles.artefactImg}>
                <Image src = {item}></Image>
            </div>
        </div>
       
    )
}

export default Artefact