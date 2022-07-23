import React from "react";
import Image from "next/image";





// Import Swiper styles
import "swiper/css";
import "swiper/css/autoplay";

//Import image
import Img1 from "/static/stake/drg1.png";
import Img2 from "/static/stake/drg2.png";
import Img3 from "/static/stake/drg3.png";
import Img4 from "/static/stake/drg4.png";

import lblBronze from "/static/stake/lblBronze.png";
import lblSilver from "/static/stake/lblSilver.png";
import lblGolden from "/static/stake/lblGolden.png";
import lblDiamond from "/static/stake/lblDiamond.png";

import Artefact from "/static/stake/Artefact.png";

import Key from "/static/stake/key.png";

import Box from "/static/stake/box.png";
//Import Style
import styles from "/styles/stake.module.scss";

const Dragon = () => {
    const Id = 1029
    const level = 'Bronze'
    const img = Img1
    const lblImg = lblBronze
    return(
        <div className = {styles.dragonWarp}>
            <div className = {styles.drgImg} style={{background:'#FBEDD6'}}>
                <Image src = {img}  alt='level'></Image> 
            </div>
            <div classNamce = {styles.drgProp}>
                <div className = {styles.dragonId}>
                    <span>DRAGON </span>
                    <span>#{Id}</span>
                </div>
                <div className  = {styles.lblWarp}>
                    <Image src={lblImg} alt='level'></Image>
                    <span className = {styles.levelTxt}>Current level is {level}</span>
                </div>
                
            </div>
                       
        </div>    
    )
}
const STAKEDASHBOARD = (props) => {
	return (
        <main>
            <div className={styles.contentWarpDashboard}>
                <h2>DASHBOARD</h2>
                <p>This is an overview of all of your items. To start exploring, click on the button below.</p>
            </div>
            <div className={styles.serpentaWarp}>
                    <button onClick={() => props.setDashboard(false)}>THE SERPENTA WORLD</button>
            </div>

            <div className = {styles.row}>
                <h1>
                    <span>MY DRAGONS </span>
                    <span style={{color: '#6D6963'}}>(4)</span>
                </h1>
                <div className = {styles.dragonsArray} >
                    <Dragon/>
                    <Dragon/>
                    <Dragon/>
                    <Dragon/>
                </div>                
            </div>

            <div className = {styles.row1}>
                <div className = {styles.inventoryWarp}>
                    <h1>
                        <span>INVENTORY </span>
                        <span style={{color: '#6D6963'}}>(63)</span>
                    </h1>
                    <div className = {styles.row2}>
                        <div className = {styles.artefactsWarp}>
                            <h2>
                                <span>ARTEFACTS </span>
                                <span style={{color: '#6D6963'}}>(7)</span>
                            </h2>
                            <div className = {styles.efactArrayWarp}>
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>   
                                <div className = {styles.efactWarp}>
                                    <Image src = {Artefact}></Image>
                                </div>                                

                            </div>

                        </div>
                        <div className = {styles.keysWarp}>
                            <h2>
                                <span>KEYS </span>
                                <span style={{color: '#6D6963'}}>(56)</span>
                            </h2>
                            <div>
                                <Image src= {Key}></Image>
                            </div>
                        </div> 
                    </div>
                                         
                </div>
                <div className = {styles.inventoryWarp}>
                    <h1>
                        <span>LOOTBOX </span>
                        <span style={{color: '#6D6963'}}>(63)</span>
                    </h1>
                    <div className = {styles.box}>
                        <Image src={Box}></Image>
                    </div>
                </div>
            </div>
        </main> 
        
	);
};

export default STAKEDASHBOARD;
