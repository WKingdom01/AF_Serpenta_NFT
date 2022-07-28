/**
 * Export wallets array to wallet addresses only and stringify it
 * @param wallets
 * @returns {string}
 */
export const transformWallets = (wallets) => {
  let newWallets = [];
  wallets.map((item) =>
    newWallets.push(item.wallet_address),
  );
  return JSON.stringify(newWallets);
};
