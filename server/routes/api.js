const express = require('express');
const router = express.Router();

const helloController = require('../controllers/helloController');

router.get('/hello', helloController.getHello);

const projectController = require('../controllers/projectController');
router.get('/projects', projectController.getProjects);
router.post('/projects', projectController.addProject);

module.exports = router;
