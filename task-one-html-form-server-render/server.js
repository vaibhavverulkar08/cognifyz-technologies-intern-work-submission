const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

// Set EJS as the templating engine
app.set('view engine', 'ejs');

// Set the views directory
app.set('views', path.join(__dirname, 'views'));

// Middleware to parse URL-encoded form data
app.use(express.urlencoded({ extended: true }));

// Render the form on the root URL
app.get('/', (req, res) => {
    res.render('index', { errors: [], submittedData: null });
});

// Handle form submission
app.post('/submit', (req, res) => {
    const { name, email, password, confirmPassword, phone } = req.body;
    const errors = [];

    if (!name) errors.push('Name is required');
    if (!email) errors.push('Email is required');
    if (!phone) errors.push('Phone number is required');
    if (password !== confirmPassword) {
        errors.push('Passwords do not match');
    }

    if (errors.length > 0) {
        return res.render('index', { errors, submittedData: null });
    }

    // If no errors, send the form data
    res.render('index', { errors: [], submittedData: { name, email, phone } });
    console.log({ name, email, phone });
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
