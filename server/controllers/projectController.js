// Project controller using Supabase from backend
const supabase = require('../config/supabase');

exports.getProjects = async (req, res) => {
  const { data, error } = await supabase.from('projects').select('*');
  if (error) return res.status(500).json({ status: 'error', message: error.message });
  res.json({ status: 'success', data });
};

exports.addProject = async (req, res) => {
  const { title, tech, verified, github } = req.body;
  const { data, error } = await supabase.from('projects').insert([{ title, tech, verified, github }]);
  if (error) {
    console.error('Supabase Insert Error:', error);
    return res.status(400).json({ status: 'error', message: error.message, details: error });
  }
  res.status(201).json({ status: 'success', data });
};
