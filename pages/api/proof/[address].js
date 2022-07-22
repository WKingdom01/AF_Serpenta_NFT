const { join, resolve } = require('path');
const { readFileSync } = require('fs');

/**
 * Check whitelisted wallets based on slug
 * @param req {Object} The request.
 * @param res {Object} The response.
 * @param req.query.address {String} ethaddress.
 */
export default function handler(req, res) {
  const { address } = req.query;
  const walletDirectory = resolve(process.cwd(), './public/static');

  try {
    const wallets = readFileSync(
      join(walletDirectory, 'whitelisted-wallets.json'),
      'utf8'
    );

    const discordUserRoles = readFileSync(
      join(walletDirectory, 'discord-user-roles.json'),
      'utf8'
    );

    const walletsArray = JSON.parse(wallets);
    const discordUserRolesArray = JSON.parse(discordUserRoles);

    const mergedWalletsWithDiscordUsername = walletsArray.map((wallet) => {
      const discordUser = discordUserRolesArray.find(
        (user) => user.discord_id === wallet.discord_id
      );

      if (discordUser) {
        return Object.assign({}, wallet, {
          discord_id: discordUser.discord_id,
          discord_username: discordUser.discord_username,
          roles: discordUser.roles,
        });
      }
      return wallet;
    });

    const wallet = mergedWalletsWithDiscordUsername.find(
      (mergedWallet) =>
        mergedWallet.wallet_address.toLowerCase() === address.toLowerCase()
    );

    if (wallet) {
      return res.json(wallet);
    } else {
      return res.status(404).json({
        error: `wallet(${address}) not found in whitelist / waitlist.`,
      });
    }
  } catch (err) {
    console.error(err);
  }
}