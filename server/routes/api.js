console.log('api.js loaded');
const express = require('express');
const router = express.Router();

const helloController = require('../controllers/helloController');
router.get('/hello', helloController.getHello);

const projectController = require('../controllers/projectController');
router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.addProject);

// Secure admin login route
const adminRoutes = require('./admin');
router.use(adminRoutes);

// Hire builder form route
const hireBuilderRoutes = require('./hireBuilder');
router.use(hireBuilderRoutes);

// Start project form route
const startProjectRoutes = require('./startProject');
router.use(startProjectRoutes);

module.exports = router;
