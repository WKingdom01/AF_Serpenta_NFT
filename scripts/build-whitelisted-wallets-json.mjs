import fse from 'fs-extra';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';

const { SUPABASE_API_KEY, SUPABASE_API_URL } = process.env;

if (SUPABASE_API_KEY && SUPABASE_API_URL) {
  const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

  let { data: wallets, error } = await supabase
    .from('wallets-new')
    .select(
      'id, wallet_address, whitelisted, discord_id, discord_username, roles, mint_quantity, lootbox_type, lootbox_status, lootbox_quantity, lootbox_held, created_at, updated_at'
    )
    .limit(100000);

  if (error) {
    console.log('error fetching wallets from supabase');
  }

  const whitelistedWallets = wallets;

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
