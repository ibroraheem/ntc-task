const User = require('../models/User');
const bcrypt = require('bcryptjs');

const register = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) return res.status(403).json({ message: 'Completely fill all fields' });
        const existingUser = await User.findOne({ username: username });
        if (existingUser) return res.status(403).json({ message: 'Username has been taken' });
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const user = new User({ username, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: 'User registered successfully', user: user.username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        if (!username || !password) return res.status(403).json({ message: 'Completely fill all fields' });
        const existingUser = await User.findOne({ username: username });
        if (!existingUser) return res.status(403).json({ message: 'username not found in the user list' });
        res.status(200).json({ message: "User logged in successfully", user: existingUser.username });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message });
    }
}

module.exports = { login, register }