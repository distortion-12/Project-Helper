const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

router.post('/hire-builder', async (req, res) => {
  const { title, problem, tech, budget, deadline, name, email, phone, additional_info } = req.body;
  try {
    const mergedAdditionalInfo = [
      tech ? `Tech Requirements: ${tech}` : null,
      additional_info || null,
    ]
      .filter(Boolean)
      .join('\n\n');

    const { data, error } = await supabase
      .from('HireBuilderRequests')
      .insert([
        {
          name: name || title,
          email,
          phone,
          project_description: problem,
          budget,
          timeline: deadline,
          additional_info: mergedAdditionalInfo || null
        }
      ]);
    if (error) {
      return res.status(400).json({ success: false, error: error.message });
    }
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET /api/hire-builder-requests - Fetch all hire builder requests
router.get('/hire-builder-requests', async (req, res) => {
  try {
    const { data, error } = await supabase
      .from('HireBuilderRequests')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.log('Supabase fetch error:', error);
      return res.status(500).json({ success: false, error: error.message });
    }

    return res.json({ success: true, requests: data });
  } catch (err) {
    console.error('Server error:', err);
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
