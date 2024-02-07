const Task = require('../models/Task');

const getTasks = async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

const createTask = async (req, res) => {
    const { title, description } = req.body;
    try {
        const task = new Task({ title, description });
        await task.save();
        res.status(201).json({ message: "TAsk created successfully", task });
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await Task.findById(id);
        res.status(200).json(task);
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, description } = req.body;
    try {
        const task = await Task
            .findByIdAndUpdate(id, {
                title,
                description
            }, { new: true });
        res.status(200).json(task);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
}

const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        await Task.findByIdAndDelete(id);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(404).json({ message: error.message });
    }
}

module.exports = { getTasks, createTask, getTask, updateTask, deleteTask };
