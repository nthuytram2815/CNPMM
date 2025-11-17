require("dotenv").config();
const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const saltRounds = 10;

const createUserService = async (name, email, password) => {
    try {
        const user = await User.findOne({ email });
        if (user) {
            console.log(`User with email ${email} already exists.`);
            return null;
        }
        const hashPassword = await bcrypt.hash(password, saltRounds);
        let result = await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "User",
        });
        return result;
    } catch (error) {
        console.error("Error creating user:", error);
        return null;
    }
}

const loginService = async (email1, password) => {
    try {
        const user = await User.findOne({ email: email1 });
        if (user) {
            const match = await bcrypt.compare(password, user.password);
            if (!match) {
                return {
                    EC: 2,
                    EM: "Wrong password",
                }
            } else {
                const payload = {
                    email: user.email,
                    name: user.name,
                }
                const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRE })
                return {
                    EC: 0,
                    token,
                    user: {
                        email: user.email,
                        name: user.name
                    }
                };
            }
        } else {
            return {
                EC: 1,
                EM: "Email/Password is incorrect",
            }
        }
    } catch (error) {
        console.error("Error during login:", error);
        return null;
    }
}
const getUserService = async () => {
    try {
        let result = await User.find({}).select('-password');
        return result;
    } catch (error) {
        console.error("Error fetching users:", error);
        return null;
    }
}
module.exports = {
    createUserService,
    loginService,
    getUserService
}