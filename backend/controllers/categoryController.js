const Category = require('../model/Category');

const createCategory = async (req, res) => {
    try {
        const { name, description  } = req.body;

        const existingCategory = await Category.findOne({ name });

        if (existingCategory) {
            return res.status(400).json({
                message: 'Category already exists'
            });
        }

        const category = await Category.create({
            name,
            description
        });

        return res.status(201).json(category);

    } catch (error) {
    console.log("CATEGORY ERROR:", error);
    res.status(500).json({ message: 'Server error' });
    }
    
};

const getCategories = async (req, res) => {
    try {
        const categories = await Category.find({});
        res.json(categories);
    } catch (error) {
        console.error("CATEGORY GET ERROR:", error);
        res.status(500).json({
            message: "Server error"
        });
    }
};

const getCategoryById = async (req, res) => {
    try {
        const category = await Category.findById(req.params.id);

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(category);

    } catch (error) {
        console.error("CATEGORY GET BY ID ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const updateCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json(category);

    } catch (error) {
        console.error("CATEGORY UPDATE ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

const deleteCategory = async (req, res) => {
    try {
        const category = await Category.findByIdAndDelete(
            req.params.id
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.json({
            message: "Category deleted successfully"
        });

    } catch (error) {
        console.error("CATEGORY DELETE ERROR:", error);

        res.status(500).json({
            message: "Server error"
        });
    }
};

module.exports = {
    createCategory,
    getCategories,
    getCategoryById,
    updateCategory,
    deleteCategory
};

