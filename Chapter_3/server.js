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

let currentPrice = 60;
app.get('/get-price',(req,res)=>{
 currentPrice = currentPrice + Math.random() * 2 - 1;
 res.send('$' + currentPrice.toFixed(1))
})

// Start server
app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT}`);
});