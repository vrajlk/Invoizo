const express = require('express');
const app = express();
const port = 3000;
const connectiondb = require('./config/db.js');
const router = require('./routes/Authroutes.js');
const shopRoutes = require('./routes/Shoproutes.js');
const dashboardRoutes = require('./routes/dashboardRoutes');
const billRoutes = require('./routes/billRoutes');
const aiRoutes = require('./routes/aiRoutes');
const pdfRoutes = require('./routes/pdfRoutes');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const trafficRoutes = require("./routes/trafficRoutes");
const customerRoutes = require("./routes/customerRoutes.js")
const RevenueRoutes = require("./routes/getRevenueData.js");
const getPendingBillsRoute = require("./routes/getPendingBillsRoute.js");
const getTotalRevenue = require('./routes/getTotalRevenueRoute.js');

app.set("trust proxy", 1);

app.use(cors({
    origin: 'http://65.2.129.154',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
}));

app.use(express.json()); // Middleware to parse JSON bodies
app.use(cookieParser());

app.use('/api/admin', router ); // Use the router with the correct path
app.use('/api/shop', shopRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/bills', billRoutes);
app.use('/api/ai', aiRoutes);
app.use('/api', pdfRoutes); // Note: Adjusted to match POST /api/generate-pdf
app.use("/api", trafficRoutes); // Now route is /api/traffic-data
app.use("/api",customerRoutes)
app.use("/api",RevenueRoutes)
app.use("/api",getPendingBillsRoute)
app.use("/api",getTotalRevenue)

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
