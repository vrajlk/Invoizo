const Admin = require('../models/Admin.model.js');
const bcrypt = require('bcryptjs');
const { generateToken } = require('../utils/generatetoken');

const registerAdmin = async (req, res) => {
    const { username, number, password } = req.body;

    try {
        const AdminExists = await Admin.findOne({ number });
        if (AdminExists) {
            return res.status(400).json({ message: "Admin already exists" });
        }
        const hashedPassword = await bcrypt.hash(password, 10);
        const newAdmin = await Admin.create({ username, number, password: hashedPassword,});



        await newAdmin.save(); // adminId is automatically assigned

        const token = generateToken(newAdmin);

        const userAgent = req.headers["user-agent"];
        const isWeb = userAgent && (userAgent.includes("Mozilla") || userAgent.includes("PostmanRuntime"));
        
        if (isWeb) {
            // For Web: Store token in an HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None"
            });
            return res.status(200).json({message: "Admin is successfully registered on web", admin: newAdmin });
        } else {
            // For Mobile: Send token in JSON response
            return res.status(200).json({
                message: "Admin is successfully registered on mobile",
                admin: newAdmin,
                token
            });
        }
  

    } catch (error) {
        console.error("Error registering Admin:", error); // Log the error
        return res.status(500).json({ message: "Error registering Admin" });
    }
}

module.exports = registerAdmin;