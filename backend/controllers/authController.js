const User = require("../model/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../utils/generateToken");

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
// };

//Register a new user
const registerUser = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: "User already exists"
            });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            role: user.role,
            token: generateToken(user._id)
        });

    } catch (error) {
        console.error("REGISTER ERROR:", error);

        res.status(500).json({
            message: error.message
        });
    }
};

//Login user
const loginUser = async (req, res) => {
    const{ email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (user && (await bcrypt.compare(password, user.password))) {
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                token: generateToken(user._id)
            });
        }
        else {
            res.status(400).json({ message: 'Invalid email or password' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

//getUsers
const getUsers = async (req, res) => {
    try {
        const users = await User.find({}).select('-password');

        return res.status(200).json(users);

    } catch (error) {
        console.error("Get Users Error:", error);

        return res.status(500).json({
            message: 'Server error'
        });
    }
};

const createAdmin = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // 1. Check: user already exists?
        const existingUser = await User.findOne({ email });

        if (existingUser) {
            return res.status(400).json({
                message: 'User already exists'
            });
        }

        // 2. Password hash
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // 3. Create admin
        const adminUser = await User.create({
            name,
            email,
            password: hashedPassword,
            role: 'admin',
            verified: true
        });

        return res.status(201).json({
            message: 'Admin created successfully',
            user: {
                _id: adminUser._id,
                name: adminUser.name,
                email: adminUser.email,
                role: adminUser.role,
                verified: adminUser.verified
            }
        });

    } catch (error) {
        return res.status(500).json({
            message: 'Server error'
        });
    }
};

module.exports = { registerUser, loginUser, getUsers, createAdmin };