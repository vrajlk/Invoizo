const Bill = require('../models/Bill');
const Customer = require('../models/Customer');
const Order = require('../models/Order');
const Revenue = require('../models/Revenue');
const Traffic = require('../models/Traffic');

exports.getDashboard = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const revenueData = await Revenue.find({ userId: req.user._id }).sort({ date: -1 }).limit(7);
    const trafficData = await Traffic.find({ userId: req.user._id }).sort({ date: -1 });
    const totalCustomers = await Customer.countDocuments({ userId: req.user._id });
    const lastMonthCustomers = await Customer.countDocuments({
      userId: req.user._id,
      createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
    });
    const totalOrders = await Order.countDocuments({ userId: req.user._id });
    const lastMonthOrders = await Order.countDocuments({
      userId: req.user._id,
      createdAt: { $gte: new Date(new Date().setMonth(new Date().getMonth() - 1)) },
    });
    const recentBills = await Bill.find({
      userId: req.user._id,
      createdAt: { $gte: today },
    }).sort({ createdAt: -1 });
    const pendingBills = await Bill.find({
      userId: req.user._id,
      status: 'Pending',
    });
    const todayRevenue = await Bill.find({
      userId: req.user._id,
      createdAt: { $gte: today },
      status: 'Paid',
    });

    const pendingBillsAmount = pendingBills.reduce((total, bill) => total + bill.amount, 0);
    const todayRevenueAmount = todayRevenue.reduce((total, bill) => total + bill.amount, 0);
    const customerChangePercentage = lastMonthCustomers > 0 ? ((totalCustomers - lastMonthCustomers) / lastMonthCustomers) * 100 : 0;
    const orderChangePercentage = lastMonthOrders > 0 ? ((totalOrders - lastMonthOrders) / lastMonthOrders) * 100 : 0;

    const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    const trafficValues = Array(12).fill(0);
    trafficData.forEach((item) => {
      const month = new Date(item.date).getMonth();
      trafficValues[month] = item.value;
    });

    res.json({
      revenue: {
        total: revenueData.reduce((total, item) => total + item.amount, 0),
        period: 'January - July 2023',
        activeTab: 'monthly',
        chartData: revenueData.map((item) => item.amount).reverse(),
      },
      traffic: {
        period: 'January 1, 2022 - December 31, 2022',
        labels: months,
        values: trafficValues,
      },
      customers: {
        total: totalCustomers,
        changePercentage: Number.parseFloat(customerChangePercentage.toFixed(1)),
        activeTab: 'monthly',
      },
      orders: {
        total: totalOrders,
        changePercentage: Number.parseFloat(orderChangePercentage.toFixed(1)),
        activeTab: 'monthly',
      },
      recentBills,
      pendingBills: {
        count: pendingBills.length,
        changePercentage: 8.5,
        totalAmount: pendingBillsAmount,
      },
      todayRevenue: {
        amount: todayRevenueAmount,
        billCount: todayRevenue.length,
      },
    });
  } catch (error) {
    console.error('Dashboard error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};