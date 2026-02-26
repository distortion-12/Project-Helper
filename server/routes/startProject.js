const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');
const validator = require('validator');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

router.post('/start-project', async (req, res) => {
  let { name, email, phone, budget, message } = req.body;
  // Sanitize and validate inputs
  name = validator.escape(validator.trim(name || ''));
  email = validator.normalizeEmail(email || '');
  phone = validator.escape(validator.trim(phone || ''));
  budget = validator.escape(validator.trim(budget || ''));
  message = validator.escape(validator.trim(message || ''));

  if (!validator.isEmail(email)) {
    return res.status(400).json({ success: false, error: 'Invalid email address.' });
  }
  if (phone && !validator.isMobilePhone(phone, 'any')) {
    return res.status(400).json({ success: false, error: 'Invalid phone number.' });
  }
  if (name.length > 100 || budget.length > 50 || message.length > 1000) {
    return res.status(400).json({ success: false, error: 'Input too long.' });
  }
  try {
    const { data, error } = await supabase
      .from('StartProjectRequests')
      .insert([
        { name, email, phone, budget, message, createdat: new Date() }
      ]);
    if (error) {
      console.log('Supabase insert error:', error);
      return res.status(400).json({ success: false, error });
    }
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
