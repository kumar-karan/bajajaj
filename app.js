const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());
app.use(express.json());


app.post('/bfhl', (req, res) => {
    const data = req.body.data || [];
    const userId = "karan_kumar_04082002";

    const numbers = data.filter(item => !isNaN(item));
    const alphabets = data.filter(item => isNaN(item));
    const highestLowercaseAlphabet = alphabets
        .filter(item => item === item.toLowerCase())
        .sort()
        .pop() || [];

    res.json({
        is_success: true,
        user_id: userId,
        email: "karan.kumar2021@vitstudent.ac.in",
        roll_number: "21BCI0024",
        numbers,
        alphabets,
        highest_lowercase_alphabet: highestLowercaseAlphabet
    });
});


app.get('/bfhl', (req, res) => {
    res.json({ operation_code: 1 });
});


const PORT = process.env.PORT || 5078;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
