const express = require('express');
const app = express();
const port = 3000;
const connectiondb = require('./config/db.js');
const router = require('./routes/Authroutes.js');
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON bodies

app.use('/api/admin', router); // Use the router with the correct path

// const rateLimit = require('express-rate-limit');
// const limiter = rateLimit({
//     windowMs: 15 * 60 * 1000, // 15 minutes
//     max: 100 // Limit each IP to 100 requests per window
// });
// app.use(limiter);


connectiondb().then(() => {
    console.log('Database connected');
    
    app.listen(port, () => {
        console.log(`Server listening on port ${port}`);
    });
}).catch((error) => {
    console.log('Error connecting to database', error);
});
