import { WHITELIST_DATE, WAITLIST_DATE,PUBLIC_DATE } from "../../data/constants";
const current = new Date();

const getCurrentPhase=()=>{
    if(current<WHITELIST_DATE)
        {return 'Minting soon'}
    else if(WHITELIST_DATE <current && current < WAITLIST_DATE){
        return 'Minting Now Whitelist'
    }
    else if(WAITLIST_DATE <current && current < PUBLIC_DATE){
        return 'Minting Now Waitlist'
    }
    else{
        return 'Minting Now Public'
    }
}
export default getCurrentPhase;