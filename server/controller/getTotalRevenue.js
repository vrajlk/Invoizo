const Bill = require("../models/Bill");

const getTotalRevenue = async (req, res) => {
  try {
    let { adminId } = req.query;

    if (!adminId) {
      return res.status(400).json({ message: "Missing adminId" });
    }

    adminId = parseInt(adminId); // Convert to number

    console.log("Looking for bills with userId =", adminId, "and type =", typeof adminId);

    const bills = await Bill.find({ userId: adminId });

    console.log("Fetched Bills:", bills);

    const totalRevenue = bills.reduce((sum, bill) => sum + parseFloat(bill.totalAmount || 0), 0);

    console.log("Total Revenue:", totalRevenue);
    return res.status(200).json({ amount: totalRevenue });
  } catch (err) {
    console.error("Revenue error:", err);
    return res.status(500).json({ message: "Server error" });
  }
};

module.exports = getTotalRevenue;
