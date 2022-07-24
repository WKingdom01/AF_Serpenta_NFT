//Import Imgs for the first page
import IMG1 from '/static/stake/NFT_DRAGONS_BATCH2_6 1.png';
import IMG2 from '/static/stake/NFT_DRAGONS_BATCH2_3 1.png';
import IMG3 from '/static/stake/NFT_DRAGONS_BATCH2_4 1.png';
//End first page

//Import Imgs for the dashboard page
    //Dragon Img
    import Img1 from "/static/stake/drg1.png";
    import Img2 from "/static/stake/drg2.png";
    import Img3 from "/static/stake/drg3.png";
    import Img4 from "/static/stake/drg4.png";

    //Level Img
    import lblBronze from "/static/stake/lblBronze.png";
    import lblSilver from "/static/stake/lblSilver.png";
    import lblGolden from "/static/stake/lblGolden.png";
    import lblDiamond from "/static/stake/lblDiamond.png";

    //Artefact item img
    import Artefact from "/static/stake/Artefact.png";
//End dashboard page

//First page
export const firstPageItems = [
    {
        src: IMG1,
        alt: "Image of a serpenta"
    },
    {
        src: IMG2,
        alt: "Image of a serpenta"
    },
    {
        src: IMG3,
        alt: "Image of a serpenta"
    }
]

//Dashboard page
    // Dragon Item
    export const dashboardDrgItems = [
        {
            Id:"1029",
            level:"Bronze",
            img:Img1,
            lblImg:lblBronze,
        },
        {
            Id:"1452",
            level:"Silver",
            img:Img2,
            lblImg:lblSilver
        },
        {
            Id:"1576",
            level:"Golden",
            img:Img3,
            lblImg:lblGolden
        },
        {
            Id:"8712",
            level:"Diamond",
            img:Img4,
            lblImg:lblDiamond
        },
        
    ]
    // Artefact Item
    export const dashboardArtefactItems = [
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
        {
            src:Artefact,
            alt:"Artefact"
        },
    ]
