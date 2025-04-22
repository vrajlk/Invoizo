// Assuming you have a Bill model and mongoose
const Bill = require("../models/Bill");

exports.getPendingBillsSummary = async (req, res) => {
  try {
    const pendingBills = await Bill.aggregate([
      { $match: { status: "Pending" } },
      { $group: { _id: null, count: { $sum: 1 }, totalAmount: { $sum: "$amount" } } }
    ]);

    // For simplicity, assume change percentage is calculated based on previous month
    const changePercentage = 5; // Example static value for now

    const summary = {
      count: pendingBills[0]?.count || 0,
      totalAmount: pendingBills[0]?.totalAmount || 0,
      changePercentage,
    };

    res.status(200).json(summary);
  } catch (error) {
    console.error("Error in fetching pending bills summary:", error);
    res.status(500).json({ error: "Failed to fetch pending bills summary" });
  }
};
