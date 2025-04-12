const Bill = require('../models/Bill');
const Customer = require('../models/Customer');
const Order = require('../models/Order');

exports.getBills = async (req, res) => {
  try {
    const bills = await Bill.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(bills);
  } catch (error) {
    console.error('Get bills error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.getBill = async (req, res) => {
  try {
    const bill = await Bill.findOne({ _id: req.params.id, userId: req.user._id });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    console.error('Get bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.createBill = async (req, res) => {
  try {
    const { name, deliveryDate, number, customer, lineItems } = req.body;
    const amount = lineItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);

    const bill = new Bill({
      userId: req.user._id,
      name,
      number,
      customer,
      deliveryDate,
      amount,
      lineItems,
      status: 'Pending',
      createdAt: new Date(),
    });
    await bill.save();

    const existingCustomer = await Customer.findOne({ userId: req.user._id, name: customer });
    if (!existingCustomer) {
      const newCustomer = new Customer({ userId: req.user._id, name: customer, createdAt: new Date() });
      await newCustomer.save();
    }

    const order = new Order({
      userId: req.user._id,
      billId: bill._id,
      customer,
      amount,
      createdAt: new Date(),
    });
    await order.save();

    res.status(201).json(bill);
  } catch (error) {
    console.error('Create bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.updateBill = async (req, res) => {
  try {
    const { name, deliveryDate, number, customer, lineItems } = req.body;
    const amount = lineItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);

    const bill = await Bill.findOneAndUpdate(
      { _id: req.params.id, userId: req.user._id },
      { name, number, customer, deliveryDate, amount, lineItems, updatedAt: new Date() },
      { new: true },
    );
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    res.json(bill);
  } catch (error) {
    console.error('Update bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.deleteBill = async (req, res) => {
  try {
    const bill = await Bill.findOneAndDelete({ _id: req.params.id, userId: req.user._id });
    if (!bill) return res.status(404).json({ message: 'Bill not found' });
    await Order.findOneAndDelete({ billId: bill._id, userId: req.user._id });
    res.json({ message: 'Bill deleted successfully' });
  } catch (error) {
    console.error('Delete bill error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};