import express from "express";

const app = express();
const PORT = 3000;

// Set static folder
app.use(express.static("public"));

// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// Handle POST request for email validation
app.post("/email", (req, res) => {
    const submittedEmail = req.body.email;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (emailRegex.test(submittedEmail)) {
        return res.send(`
            <div class="mb-3" id="email-field" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control is-valid" 
                    name="email" 
                    hx-post="/email" 
                    value="${submittedEmail}"
                    required
                >
                <div class="alert alert-success" role="alert">
                    That email is valid ✅
                </div>
            </div>
        `);
    } else {
        return res.send(`
            <div class="mb-3" id="email-field" hx-target="this" hx-swap="outerHTML">
                <label class="form-label">Email address</label>
                <input 
                    type="email" 
                    class="form-control is-invalid" 
                    name="email" 
                    hx-post="/email" 
                    value="${submittedEmail}"
                    required
                >
                <div class="alert alert-danger" role="alert">
                    ❌ Please enter a valid email address
                </div>
            </div>
        `);
    }
});

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});