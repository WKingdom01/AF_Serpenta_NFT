import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const { SUPABASE_API_KEY, SUPABASE_API_URL } = process.env;

  if (SUPABASE_API_KEY && SUPABASE_API_URL) {
    const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);

    const { data, error } = await supabase.from('connected-wallets').upsert({
      wallet_address: req.body.address,
      mint_quantity: req.body.mint_quantity ?? 0,
    });

    if (error) {
      console.error('error inserting wallet into our database');
    }

    if (data) {
      return res.status(200).json(data);
    }
  }

  return res.status(404).json({
    error: `can't insert wallet into our database`,
  });
}
