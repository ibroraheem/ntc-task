const express = require('express');
const router = express.Router();

const { getTasks, createTask, getTask, updateTask, deleteTask } = require('../controllers/Task');

router.get('/', getTasks);
router.post('/', createTask);
router.get('/:id', getTask);
router.patch('/:id', updateTask);
router.delete('/:id', deleteTask);

module.exports = router;
