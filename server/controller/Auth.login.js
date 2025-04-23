const Admin = require("../models/Admin.model");
const bcrypt = require("bcryptjs");
const { generateToken } = require("../utils/generatetoken");


const loginAdmin = async (req, res) => {
    const { number, password } = req.body;

    try {
        const AdminExists = await Admin.findOne({ number });
        if (!AdminExists) {
            return res.status(400).json({ message: "invalid Credentials, please check your number and password" });
        }
        const passwordMatch = await bcrypt.compare(password, AdminExists.password);
        if (!passwordMatch) {
            return res.status(400).json({ message: "invalid Credentials, please check your number and password" });
        }
        const token = generateToken(AdminExists);

        // Check if request comes from a browser (cookie) or mobile (header)
        const userAgent = req.headers["user-agent"];
        const isWeb = userAgent && (userAgent.includes("Mozilla") || userAgent.includes("PostmanRuntime"));
        // After successful login


        if (isWeb) {
            // For Web: Store token in an HTTP-only cookie
            res.cookie("token", token, {
                httpOnly: false,
                secure: process.env.NODE_ENV === "production",
                sameSite: "None"

            });
            return res.status(200).json({
                message: "Admin logged in successfully on web", 
                adminId: AdminExists.adminId,
                number: AdminExists.number
            });
        } else {
            // For Mobile: Send token in JSON response
            return res.status(200).json({
                message: "Admin logged in successfully on mobile",
                token,
                adminId: AdminExists.adminId,
                number: AdminExists.number
            });
        }

    } catch (error) {
        console.error("Error logging in Admin:", error); // Log the error
        return res.status(500).json({ message: "Error logging in Admin" });
    }
}

module.exports = loginAdmin;