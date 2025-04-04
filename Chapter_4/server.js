import express from 'express';
import fetch from 'node-fetch';

const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static('public'));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for contacts search
app.post('/search', async (req, res) => {
    const searchTerm = req.body.search?.toLowerCase(); // Safe check with optional chaining

    if (!searchTerm) {
        return res.send('<tr></tr>');
    }

    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/users');
        const users = await response.json();

        const searchResults = users.filter((user) => {
            const name = user.name.toLowerCase();
            const email = user.email.toLowerCase();
            return name.includes(searchTerm) || email.includes(searchTerm);
        });

        const searchResultHtml = searchResults
            .map((user) => `
                <tr>
                    <td>${user.name}</td>
                    <td>${user.email}</td>
                </tr>
            `)
            .join('');

        res.send(searchResultHtml);
    } catch (error) {
        console.error('Error fetching users:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});