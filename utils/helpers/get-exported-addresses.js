import whitelistAddresses from '../../public/static/whitelisted-wallets-only.json';
import waitlistAddresses from '../../public/static/waitlisted-wallets-only.json';

/**
 * @function getWhitelistedAddresses
 * @returns {Array[wallet_address]}
 */
export const getWhitelistedAddresses = () => {
  return whitelistAddresses;
};

/**
 * @function getWaitlistedAddresses
 * @returns {Array[wallet_address]}
 */
export const getWaitlistedAddresses = () => {
  return waitlistAddresses;
};
