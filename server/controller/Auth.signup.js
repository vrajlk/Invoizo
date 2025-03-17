const Admin = require('../models/Admin.model.js');
const bcrypt = require('bcryptjs');

const registerAdmin = async (req, res) => {
    const { username, number, password } = req.body;

    try {
        const AdminExists = await Admin.findOne({ number });
        if (AdminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ username, number, password: hashedPassword,});

        // ✅ Send response to prevent infinite loading
        return res.status(201).json({ 
            message: "Admin registered successfully", 
            admin: newAdmin 
        });

    } catch (error) {
        console.error("Error registering Admin:", error); // Log the error
        return res.status(500).json({ message: "Error registering Admin" });
    }
}

module.exports = registerAdmin;