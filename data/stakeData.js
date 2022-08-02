//Import Imgs for the first page
import IMG1 from '/static/stake/NFT_DRAGONS_BATCH2_6 1.png';
import IMG2 from '/static/stake/NFT_DRAGONS_BATCH2_3 1.png';
import IMG3 from '/static/stake/NFT_DRAGONS_BATCH2_4 1.png';
//End first page

//Begin the dashboard page
//Dragon Img
import Img1 from '/static/stake/drg1.png';
import Img2 from '/static/stake/drg2.png';
import Img3 from '/static/stake/drg3.png';
import Img4 from '/static/stake/drg4.png';

//Level Img
import lblBronze from '/static/stake/lblBronze.png';
import lblSilver from '/static/stake/lblSilver.png';
import lblGolden from '/static/stake/lblGolden.png';
import lblDiamond from '/static/stake/lblDiamond.png';

//Artefact item img
import Artefact from '/static/stake/Artefact.png';
//End dashboard page

//Begin  Serpenta page
//Artefact Imgs
import reveal from '/static/stake/reveal.png';
import unreveal0 from '/static/stake/unreveal11.png';
import unreveal1 from '/static/stake/unreveal0.png';
import unreveal2 from '/static/stake/unreveal2.png';
import unreveal3 from '/static/stake/unreveal3.png';
import unreveal6 from '/static/stake/unreveal6.png';

import reveal22 from '/static/stake/revealImg/reveal1.png';
import reveal23 from '/static/stake/revealImg/reveal2.png';
import reveal21 from '/static/stake/revealImg/reveal3.png';
//Artefact Item Imgs
import Artefactnone from '/static/stake/Artefact_none.png';
import Artefactunreveal from '/static/stake/Artefact_unreveal.png';
import Artefact1 from '/static/stake/Artefact1.png';
import Artefact2 from '/static/stake/Artefact2.png';
import Artefact3 from '/static/stake/Artefact3.png';
//End Serpenta page

//First page
export const firstPageItems = [
  {
    src: IMG1,
    alt: 'Image of a serpenta',
  },
  {
    src: IMG2,
    alt: 'Image of a serpenta',
  },
  {
    src: IMG3,
    alt: 'Image of a serpenta',
  },
];

//Begin Dashboard page
// Dragon Item
export const dashboardDrgItems = [
  {
    Id: '1029',
    level: 'Bronze',
    img: Img1,
    lblImg: lblBronze,
  },
  {
    Id: '1452',
    level: 'Silver',
    img: Img2,
    lblImg: lblSilver,
  },
  {
    Id: '1576',
    level: 'Golden',
    img: Img3,
    lblImg: lblGolden,
  },
  {
    Id: '8712',
    level: 'Diamond',
    img: Img4,
    lblImg: lblDiamond,
  },
];
// Artefact Item
export const dashboardArtefactItems = [
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
  {
    src: Artefact,
    alt: 'Artefact',
  },
];
//End Dashboard page

//Begin Serpenta
//Dragon Detail
export const dragonDetailItems = [
  {
    id: 1029,
    imgSrc: Img2,
    bgColor: '#C7DC73',
    lvl: 2,
    lvlStr: 'Bronze',
    stakingDays: 19,
    nextRevealTime: 2,
    nextRevealTimeUnit: 'week',

    revealItemArray: [
      {
        imgSrc: reveal,
        imgAlt: 'Artefact',
        itemSrc: Artefact1,
        itemAlt: 'Artefact Item',
        isReveal: true,
      },
      {
        imgSrc: unreveal0,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal1,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal2,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal3,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal6,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
    ],
  },
  {
    id: 2398,
    imgSrc: Img3,
    bgColor: '#FAFAFA',
    lvl: 4,
    lvlStr: 'Golden',
    stakingDays: 127,
    nextRevealTime: 4,
    nextRevealTimeUnit: 'day',
    revealItemArray: [
      {
        imgSrc: reveal21,
        imgAlt: 'Artefact',
        itemSrc: Artefact2,
        itemAlt: 'Artefact Item',
        isReveal: true,
      },
      {
        imgSrc: reveal22,
        imgAlt: 'Artefact',
        itemSrc: Artefactnone,
        itemAlt: 'Artefact Item',
        isReveal: true,
      },
      {
        imgSrc: reveal23,
        imgAlt: 'Artefact',
        itemSrc: Artefact3,
        itemAlt: 'Artefact Item',
        isReveal: true,
      },
      {
        imgSrc: unreveal2,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal3,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
      {
        imgSrc: unreveal6,
        imgAlt: 'Artefact',
        itemSrc: Artefactunreveal,
        itemAlt: 'Artefact Item',
        isReveal: false,
      },
    ],
  },
];
//End Serpenta

export const  DragonArray = [
  {
    src:Img1,
    alt:'Dragon Img'
  },
  {
    src:Img2,
    alt:'Dragon Img'
  },
  {
    src:Img3,
    alt:'Dragon Img'
  },
  {
    src:Img4,
    alt:'Dragon Img'
  },
]