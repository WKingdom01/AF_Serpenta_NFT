import fse from 'fs-extra';
import 'dotenv/config';
import { createClient } from '@supabase/supabase-js';
import { transformWallets } from './transform-wallets.mjs';

const { SUPABASE_API_KEY, SUPABASE_API_URL } = process.env;

if (SUPABASE_API_KEY && SUPABASE_API_URL) {
  const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

  let { data: wallets, error } = await supabase
    .from('wallets')
    .select(
      'id, wallet_address, whitelisted, discord_id, discord_username, roles, mint_quantity, lootbox_type, lootbox_status, lootbox_quantity, lootbox_held, created_at, updated_at',
    )
    .eq('whitelisted', 2)
    .limit(100000);

  if (error) {
    console.log('error fetching waitlisted wallets from supabase');
  }

  if (wallets) {
    const jsonWallets = JSON.stringify(wallets);
    const addressesOnly = transformWallets(wallets);

    fse.outputFile(
      './public/static/waitlisted-wallets-only.json',
      addressesOnly,
      (e) => {
        if (e) {
          return console.log(e);
        }

        console.log(
          'waitlisted-wallets-only.json was saved in ./public/static/waitlisted-wallets-only.json',
        );
      },
    );

    fse.outputFile(
      './public/static/waitlisted-wallets.json',
      jsonWallets,
      (e) => {
        if (e) {
          return console.log(e);
        }

        console.log(
          'waitlisted-wallets.json was saved in ./public/static/waitlisted-wallets.json',
        );
      },
    );
  }
}
