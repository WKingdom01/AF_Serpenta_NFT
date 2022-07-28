const whitelist = new Date('2022', '7', '17', '00', '00', '00', '00');
const waitlist = new Date('2022', '7', '17', '4', '00', '00', '00');
const publics = new Date('2022', '7', '17', '6', '00', '00', '00');
const current = new Date();

const getCurrentPhase=()=>{
    if(current<whitelist)
        {return 'Minting soon'}
    else if(whitelist <current && current < waitlist){
        return 'Minting Now Whitelist'
    }
    else if(waitlist <current && current < publics){
        return 'Minting Now Waitlist'
    }
    else{
        return 'Minting Now Public'
    }
}
export default getCurrentPhase;