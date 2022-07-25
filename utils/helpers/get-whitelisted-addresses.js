import whitelistAddress from '../../public/static/whitelisted-wallets.json';

/**
 * @function getWhitelistedAddresses
 * @returns {Array[walletAddress]}
 */
export default function getWhitelistedAddresses() {
  let whitelistOnlyAddress = [];
  whitelistAddress.map((item) =>
    whitelistOnlyAddress.push(item.wallet_address)
  );
  return whitelistOnlyAddress;
}
