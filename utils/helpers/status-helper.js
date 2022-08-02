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
        status: 'Whitelisted', //1660662000 = UTC: Tuesday, 16 August 2022 15:00:00
        alert: 'You are in the Whitelist! This starts at ',
        time: new Date(Date.UTC('2022', '7', '16', '15', '00', '00', '00')),
        code: 1,
      };
    case 2:
      return {
        status: 'Waitlist', //1660676400 = UTC: Tuesday, 16 August 2022 19:00:00
        alert: 'You are in the Waitlist! This starts at ',
        time: new Date(Date.UTC('2022', '7', '16', '19', '00', '00', '00')),
        code: 2,
      };
    default:
      return {
        status: 'Public', //1660680000 UTC: Tuesday, 16 August 2022 20:00:00
        alert: 'You can mint in the Public phase! This starts at ',
        time: new Date(Date.UTC('2022', '7', '16', '20', '00', '00', '00')),
        code: 3,
      };
  }
};
