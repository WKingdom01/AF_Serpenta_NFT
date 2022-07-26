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
      return 'Whitelisted';
    case 2:
      return 'Waitlisted';
    default:
      return 'Public';
  }
};
