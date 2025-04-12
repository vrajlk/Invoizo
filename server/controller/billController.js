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
    console.log('createBill: Starting with body:', req.body);
    console.log('createBill: User:', req.user);

    const { name, deliveryDate, number, customer, lineItems } = req.body;

    if (!req.user || !req.user._id) {
      console.log('createBill: No user ID');
      return res.status(401).json({ message: 'Authentication required' });
    }

    if (!name || !number || !customer || !deliveryDate || !lineItems || !Array.isArray(lineItems)) {
      console.log('createBill: Missing fields:', { name, number, customer, deliveryDate, lineItems });
      return res.status(400).json({ message: 'Missing required fields' });
    }

    if (lineItems.length === 0) {
      console.log('createBill: No line items');
      return res.status(400).json({ message: 'At least one line item is required' });
    }

    for (const item of lineItems) {
      if (
        !item.itemName ||
        typeof item.quantity !== 'number' ||
        typeof item.price !== 'number' ||
        item.quantity <= 0 ||
        item.price <= 0
      ) {
        console.log('createBill: Invalid line item:', item);
        return res.status(400).json({ message: 'Invalid line item data' });
      }
    }

    const amount = lineItems.reduce((total, item) => total + Number(item.quantity) * Number(item.price), 0);

    const bill = new Bill({
      userId: req.user._id, // Number (16)
      name,
      number,
      customer,
      deliveryDate: new Date(deliveryDate),
      amount,
      lineItems,
      status: 'Pending',
      createdAt: new Date(),
    });

    console.log('createBill: Saving bill:', bill);
    await bill.save();
    console.log('createBill: Bill saved:', bill._id);

    const existingCustomer = await Customer.findOne({ userId: req.user._id, name: customer });
    if (!existingCustomer) {
      const newCustomer = new Customer({ userId: req.user._id, name: customer, createdAt: new Date() });
      console.log('createBill: Saving customer:', newCustomer);
      await newCustomer.save();
      console.log('createBill: Customer saved:', newCustomer._id);
    } else {
      console.log('createBill: Customer exists:', existingCustomer._id);
    }

    const order = new Order({
      userId: req.user._id,
      billId: bill._id,
      customer,
      amount,
      createdAt: new Date(),
    });

    console.log('createBill: Saving order:', order);
    await order.save();
    console.log('createBill: Order saved:', order._id);

    console.log('createBill: Sending response:', bill);
    return res.status(201).json(bill);
  } catch (error) {
    console.error('createBill: Error:', error.message, error.stack);
    if (res.headersSent) {
      console.error('createBill: Headers already sent, skipping response');
      return;
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ message: Object.values(error.errors).map(e => e.message).join(', ') });
    }
    if (error.name === 'MongoServerError' && error.code === 11000) {
      return res.status(400).json({ message: 'Duplicate bill number' });
    }
    return res.status(500).json({ message: error.message || 'Server error' });
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