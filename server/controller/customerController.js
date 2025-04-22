const Bill = require("../models/Bill");

// Helper to get start and end dates
const getDateRange = (period) => {
  const now = new Date();
  let startDate = new Date(now);
  let prevStartDate = new Date(now);

  switch (period) {
    case "daily":
      startDate.setHours(0, 0, 0, 0);
      prevStartDate.setDate(prevStartDate.getDate() - 1);
      prevStartDate.setHours(0, 0, 0, 0);
      break;
    case "weekly":
      startDate.setDate(now.getDate() - now.getDay());
      startDate.setHours(0, 0, 0, 0);
      prevStartDate.setDate(startDate.getDate() - 7);
      prevStartDate.setHours(0, 0, 0, 0);
      break;
    case "monthly":
      startDate.setDate(1);
      startDate.setHours(0, 0, 0, 0);
      prevStartDate.setMonth(startDate.getMonth() - 1);
      prevStartDate.setDate(1);
      prevStartDate.setHours(0, 0, 0, 0);
      break;
  }

  return { startDate, prevStartDate };
};

exports.getUniqueCustomers = async (req, res) => {
  try {
    const { period = "daily" } = req.query;
    const { startDate, prevStartDate } = getDateRange(period);
    const now = new Date();

    // Current period
    const currentUnique = await Bill.aggregate([
    //   { $match: { createdAt: { $gte: startDate, $lte: now } } },
      { $group: { _id: "$number" } },
      { $count: "total" },
    ]);
    console.log("Unique Mobiles:", currentUnique);

    // Previous period
    const prevEndDate = new Date(startDate);
    prevEndDate.setMilliseconds(-1); // Just before current period
    const previousUnique = await Bill.aggregate([
      { $match: { createdAt: { $gte: prevStartDate, $lte: prevEndDate } } },
      { $group: { _id: "$mobile" } },
      { $count: "total" },
    ]);

    const currentTotal = currentUnique[0]?.total || 0;
    const prevTotal = previousUnique[0]?.total || 0;
    const change = prevTotal ? (((currentTotal - prevTotal) / prevTotal) * 100).toFixed(1) : 100;

    res.json({
      total: currentTotal,
      changePercentage: parseFloat(change),
      period,
    });
  } catch (err) {
    console.error("Error fetching unique customers:", err);
    res.status(500).json({ error: "Server error" });
  }
};
