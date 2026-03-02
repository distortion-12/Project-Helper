console.log('contactAdmin.js loaded');
const express = require('express');
const router = express.Router();
const supabase = require('../config/supabase');

// POST /api/contact-admin-messages - Save contact message
router.post('/contact-admin-messages', async (req, res) => {
  const { email, message } = req.body;

  if (!email || !message) {
    return res.status(400).json({ 
      success: false, 
      error: 'Email and message are required' 
    });
  }

  try {
    const { error } = await supabase
      .from('ContactMessage')
      .insert([{ email, message }]);

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        success: false, 
        error: error.message 
      });
    }

    return res.json({ success: true });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ 
      success: false, 
      error: 'Internal server error' 
    });
  }
});

// GET /api/contact-admin-messages - Fetch all contact messages
router.get('/contact-admin-messages', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('ContactMessage')
      .select('email, message, createdAt')
      .order('createdAt', { ascending: false });

    if (error) {
      console.error('Supabase error:', error);
      return res.status(500).json({ 
        messages: [], 
        error: error.message 
      });
    }

    return res.json({ messages: data || [] });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ 
      messages: [], 
      error: 'Internal server error' 
    });
  }
});

module.exports = router;
