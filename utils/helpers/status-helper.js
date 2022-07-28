/**
 * Return status based on the whitelist code
 * 1. return 'Whitelisted'
 * 2, return 'Waitlisted'
 * default: public
 * @param statusCode
 * @returns {string}
 */
export const statusHelper = (statusCode) => {
  switch (statusCode) {
    case 1:
      return {status:'Whitelisted',alert:'You are in the Whitelist : This starts at Wednesday, August 17, 2022 12:00 AM',time:new Date('2022', '7', '17', '00', '00', '00', '00')};
    case 2:
      return {status:'Waitlist',alert:'You are in the Waitlist : This starts at Wednesday, August 17, 2022 11:00 PM',time:new Date('2022', '7', '17', '4', '00', '00', '00')};
    default:
      return {status:'Public',alert:'This wallet has not been found in our white or wait list.\
       The public mint starts at Thursday, August 18, 2022 1:00 AM',time:new Date('2022', '7', '17', '6', '00', '00', '00')};
  }
};
111