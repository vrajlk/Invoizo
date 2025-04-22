const Bill = require("../models/Bill");

exports.getRevenueData = async (req, res) => {
  try {
    const result = await Bill.aggregate([
      {
        $group: {
          _id: { $month: "$createdAt" },
          totalRevenue: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    const chartData = Array(12).fill(0);
    let total = 0;

    result.forEach(item => {
      const monthIndex = item._id - 1;
      chartData[monthIndex] = Math.round(item.totalRevenue);
      total += item.totalRevenue;
    });

    res.status(200).json({
      chartData,
      total,
      period: "This Year",
      activeTab: "monthly" // You can change this based on selection later
    });
  } catch (error) {
    console.error("Error in getRevenueData:", error);
    res.status(500).json({ error: "Failed to fetch revenue data" });
  }
};
