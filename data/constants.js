export const OPENSEA_URL = ''; //https://testnets.opensea.io/collection/serpenta;
export const TWITTER_URL = 'https://twitter.com/SerpentaNFT';
export const DISCORD_URL = 'https://discord.com/invite/serpentaNFT';
export const MINT_QUANTITY_MODAL_POPUP_DUE_DATE = new Date(
  '2022',
  '7',
  '15',
  '17',
  '00',
  '00',
  '00'
);
export const WHITELIST_DATE = new Date(
  '2022',
  '7',
  '17',
  '00',
  '00',
  '00',
  '00'
);
export const WAITLIST_DATE = new Date(
  '2022',
  '7',
  '17',
  '04',
  '00',
  '00',
  '00'
);
export const PUBLIC_DATE = new Date(
  '2022',
  '7',
  '17',
  '06',
  '00',
  '00',
  '00'
);
export const networks = 
{
  polygon: {
      chainId: `0x${Number(137).toString(16)}`      
  },
  rinkeby: {
    chainId: `0x${Number(4).toString(16)}`
    },
  mainnet: {
    chainId: `0x${Number(1).toString(16)}`
  },
  bsc: {
    chainId: `0x${Number(56).toString(16)}`,    
    },    
}