import whitelistAddresses from '../../public/static/whitelisted-wallets.json';
import waitlistAddresses from '../../public/static/waitlisted-wallets.json';

/**
 * @function getWhitelistedAddresses
 * @returns {Array[wallet_address]}
 */
export const getWhitelistedAddresses = () => {
  let whitelistOnlyAddresses = [];
  whitelistAddresses.map((item) =>
    whitelistOnlyAddresses.push(item.wallet_address)
  );
  return whitelistOnlyAddresses;
};

/**
 * @function getWaitlistedAddresses
 * @returns {Array[wallet_address]}
 */
export const getWaitlistedAddresses = () => {
  let waitlistOnlyAddresses = [];
  waitlistAddresses.map((item) =>
    waitlistOnlyAddresses.push(item.wallet_address)
  );
  return waitlistOnlyAddresses;
};
