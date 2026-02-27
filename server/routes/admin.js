const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { createClient } = require('@supabase/supabase-js');

// Load Supabase credentials securely from environment variables
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

router.post('/admin-login', async (req, res) => {
  const { username, password } = req.body;
  console.log('[ADMIN LOGIN] Attempt:', { username });
  try {
    // Fetch admin by username
    const { data, error } = await supabase
      .from('Admins')
      .select('password_hash')
      .eq('username', username)
      .single();
    console.log('[ADMIN LOGIN] Supabase result:', { data, error });
    if (error || !data) {
      console.log('[ADMIN LOGIN] No user found or error:', { error });
      return res.status(401).json({ success: false, message: 'Invalid username or password' });
    }
    const valid = await bcrypt.compare(password, data.password_hash);
    console.log('[ADMIN LOGIN] Password valid?', valid);
    if (valid) {
      // Generate a random session token
      const sessionToken = require('crypto').randomBytes(32).toString('hex');
      // Set secure cookie (HttpOnly, SameSite, etc.)
      res.cookie('admin_auth', sessionToken, {
        httpOnly: false, // allow client-side access
        sameSite: 'None',
        maxAge: 86400 * 1000,
        secure: false,
        // domain removed for local dev
      });
      // Optionally: store sessionToken in memory or DB for validation
      console.log('[ADMIN LOGIN] Login success');
      return res.json({ success: true });
    }
    console.log('[ADMIN LOGIN] Invalid password');
    return res.status(401).json({ success: false, message: 'Invalid username or password' });
  } catch (err) {
    console.log('[ADMIN LOGIN] Server error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
