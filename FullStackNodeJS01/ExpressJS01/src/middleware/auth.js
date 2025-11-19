require("dotenv").config();
const jwt = require("jsonwebtoken");
const User = require("../models/user");  // Import User model để fetch user từ DB

const auth = async (req, res, next) => {
    // Whitelist: Các route không cần token (public)
    const white_lists = ["/", "/register", "/login"];
    const prefix = "/api";  // Theo tutorial, route prefix là /api (không phải /v1/api)
    const isWhitelisted = white_lists.some(item => req.originalUrl.startsWith(prefix + item));
    
    if (isWhitelisted) {
        return next();  // Skip auth cho public routes
    }

    // Extract token từ header (Bearer <token>)
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: "Không có token. Access denied!" });
    }

    const token = authHeader.split(' ')[1];  // Lấy phần sau 'Bearer '
    try {
        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Fetch user từ DB để xác thực 
        const user = await User.findById(decoded.id).select('-password');  // Ẩn password
        if (!user) {
            return res.status(401).json({ message: "Token không hợp lệ. User không tồn tại!" });
        }

        // Set user vào req để dùng ở controller (thêm role cho authorization sau)
        req.user = {
            id: user._id,
            email: user.email,
            name: user.name,
            role: user.role 
        };

        console.log("Auth success for user:", req.user.email);
        next();
    } catch (error) {
        console.error("Token verify error:", error.message);
        return res.status(401).json({ message: "Token không hợp lệ hoặc hết hạn!" });
    }
};

module.exports = auth;