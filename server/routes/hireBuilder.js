const express = require('express');
const router = express.Router();
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_KEY;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

router.post('/hire-builder', async (req, res) => {
  const { title, problem, tech, budget, deadline, name, email, phone, additional_info } = req.body;
  try {
    const { data, error } = await supabase
      .from('HireBuilderRequests')
      .insert([
        {
          name: name || title,
          email,
          phone,
          project_description: problem,
          tech_stack: tech,
          budget,
          timeline: deadline,
          additional_info
        }
      ]);
    if (error) {
      return res.status(400).json({ success: false, error });
    }
    return res.json({ success: true, data });
  } catch (err) {
    return res.status(500).json({ success: false, message: 'Server error' });
  }
});

module.exports = router;
