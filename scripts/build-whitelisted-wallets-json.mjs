import fse from 'fs-extra';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_API_KEY, SUPABASE_API_URL } = process.env;

if (SUPABASE_API_KEY && SUPABASE_API_URL) {
  const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

  let { data: wallets, error } = await supabase
    .from('wallets')
    .select('wallet_address')
    .is('whitelisted', true);

  if (error) {
    console.log('error fetching wallets from supabase');
  }

  const whitelistedWallets = wallets.map((wallet) => wallet.wallet_address);

  if (whitelistedWallets) {
    const jsonWallets = JSON.stringify(whitelistedWallets);

    fse.outputFile(
      './public/static/whitelisted-wallets.json',
      jsonWallets,
      (e) => {
        if (e) {
          return console.log(e);
        }

        console.log(
          'whitelisted-wallets.json was saved in ./public/static/whitelisted-wallets.json'
        );
      }
    );
  }
}
