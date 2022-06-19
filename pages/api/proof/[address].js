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
    const whitelistedWalletsJson = readFileSync(
      join(walletDirectory, 'whitelisted-wallets.json'),
      'utf8'
    );

    const walletArray = JSON.parse(whitelistedWalletsJson);
    const isWhitelisted = walletArray.includes(address);

    if (isWhitelisted) {
      res.status(200).json({ wallet: address, whitelisted: true });
    } else {
      res.status(200).json({ wallet: address, whitelisted: false });
    }
  } catch (err) {
    console.error(err);
  }
}
