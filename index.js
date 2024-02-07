const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();
const app = express();
const port = process.env.PORT
const taskRouter = require('./routes/Task');
const userRouter = require('./routes/User');
// Connect to MongoDB
mongoose.set("strictQuery", true);
const connectDB = () => {
    mongoose
        .connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then((_) => console.log("MongoDB Connected"));
};
app.use(express.json());

connectDB();
app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.use('/tasks', taskRouter);
app.use('/', userRouter);
app.listen(port, () => {
    console.log(`Server is running on port ${port}`)
});