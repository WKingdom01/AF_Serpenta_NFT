/**
 * Return status based on the whitelist code
 * 1. return 'Whitelisted'
 * 2, return 'Waitlisted'
 * default: public
 * @param statusCode
 * @returns {{alert: string, time: Date, status: string}}
 */
export const statusHelper = (statusCode) => {
  switch (statusCode) {
    case 1:
      return {
        status: 'Whitelisted',
        alert:
          'You are in the Whitelist! This starts at Wednesday, August 16, 2022 23:00 PM',
        time: new Date(Date.UTC('2022', '7', '16', '23', '00', '00', '00')),

        code: 1,
      };
    case 2:
      return {
        status: 'Waitlist',
        alert:
          'You are in the Waitlist! This starts at Wednesday, August 17, 2022 3:00 AM',
        time: new Date(Date.UTC('2022', '7', '17', '3', '00', '00', '00')),
        code: 2,
      };
    default:
      return {
        status: 'Public',
        alert:
          'This wallet has not been found in our white or wait list.\
       The public mint starts at Thursday, August 17, 2022 4:00 AM',
        time: new Date(Date.UTC('2022', '7', '17', '4', '00', '00', '00')),
        code: 3,
      };
  }
};
