const Bill = require("../models/Bill");

exports.getTrafficData = async (req, res) => {
  try {
    const bills = await Bill.find({});


    const result = await Bill.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" }, // Group by month
          value: { $sum: "$amount" }, // Sum the amount for each month
        },
      },
      { $sort: { _id: 1 } }, // Sort the months in ascending order
    ]);
  

    // Array of month names
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", 
                    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

    // Map the result to get the month name and sum of amount
    const labels = result.map((item) => months[item._id - 1]); // Convert month number to name
    const values = result.map((item) => Math.round(item.value / 1000)); // Convert to thousands if needed

    // Return the result
    res.status(200).json({
      labels, // Month labels
      values, // Monthly revenue values
      period: "This Year", // You can modify this if needed
    });
  } catch (error) {
    console.error("Error in trafficController:", error);
    res.status(500).json({ error: "Failed to fetch traffic data" });
  }
};
