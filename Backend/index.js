const express = require('express');
const app = express();

const db = require('./config/db');
const userModel = require("./models/userModel");


app.use(express.json());



app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/users', async (req, res) => {
    const users = await userModel.find();
    res.json(users);
});

app.post('/create', async (req, res) => {
    const user = new userModel(req.body);
    await user.save();
    res.status(201).json(user);
});

// Put request
app.put('/update/:id', async (req, res) => {
    const userId = req.params.id;
    const { name } = req.body;
    try {
        const updatedUser = await userModel.findByIdAndUpdate(userId, { name }, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: "User not found" });
        }
        res.json({ message: "User name updated successfully", user: updatedUser });
    } catch (error) {
        res.status(500).json({ message: "Internal Server Error", error: error.message });
    }
});


app.delete('/delete', async (req, res) => {
    const user = await userModel.deleteMany();
    res.status(201).json(user);
})


const port = 5001;
app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});