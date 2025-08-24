const Product = require('../models/product');
const BASE_URL = process.env.BASE_URL || "http://localhost:5000";

// Get all products
exports.getAllProducts = async (req, res) => {
  try {
    const { search, category, min, max } = req.query;
    let filter = {};

    // Handle multiple categories
    if (category) {
      const categories = Array.isArray(category) ? category : category.split(",");
      filter.category = { $in: categories };
    }

    if (min || max) filter.price = {};
    if (min) filter.price.$gte = Number(min);
    if (max) filter.price.$lte = Number(max);

    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: 'i' } },
        { description: { $regex: search, $options: 'i' } }
      ];
    }

    const products = await Product.find(filter);
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Get product by ID
exports.getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) return res.status(404).json({ message: 'Product not found' });
    res.json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Add product 
exports.addProduct = async (req, res) => {
  try {
    let { name, price, description, category, stock } = req.body;
    price = Number(price);
    stock = stock !== undefined ? Number(stock) : 0;

    // Ensure category is always an array
    const categories = category
      ? (Array.isArray(category) ? category : category.split(","))
      : [];

    const mainImage = req.files && req.files['mainImage']
      ? `${BASE_URL}/uploads/${req.files['mainImage'][0].filename}`
      : "";

    const gallery = req.files && req.files['gallery']
      ? req.files['gallery'].map(file => `${BASE_URL}/uploads/${file.filename}`)
      : [];

    const product = await Product.create({
      name,
      price,
      description,
      category: categories,
      stock,
      mainImage,
      gallery,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Delete product
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }
    await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
};

// Edit product
exports.editProduct = async (req, res) => {
  try {
    const { name, price, description, category, stock } = req.body;

    let updateData = {
      name,
      price,
      description,
      stock,
    };

    // Ensure category stays as array
    if (category) {
      updateData.category = Array.isArray(category)
        ? category
        : category.split(",");
    }

    if (req.files && req.files['mainImage']) {
      updateData.mainImage = req.files['mainImage'][0].filename;
    }

    if (req.files && req.files['gallery']) {
      const newGallery = req.files['gallery'].map(file => file.filename);
      const product = await Product.findById(req.params.id);
      updateData.gallery = [...(product.gallery || []), ...newGallery];
    }

    const updated = await Product.findByIdAndUpdate(req.params.id, updateData, { new: true });

    const updatedWithUrls = {
      ...updated._doc,
      mainImage: updated.mainImage ? `${BASE_URL}/uploads/${updated.mainImage}` : null,
      gallery: updated.gallery ? updated.gallery.map(img => `${BASE_URL}/uploads/${img}`) : []
    };

    res.json(updatedWithUrls);
  } catch (err) {
    res.status(500).json({ message: 'Failed to update product', error: err.message });
  }
};

// Remove image from gallery
exports.removeGalleryImage = async (req, res) => {
  try {
    const { id } = req.params;
    const { imageName } = req.body;

    const product = await Product.findById(id);
    if (!product) return res.status(404).json({ message: 'Product not found' });

    const imageIndex = product.gallery.findIndex(img => img === imageName);
    if (imageIndex === -1) {
      return res.status(404).json({ message: 'Image not found in gallery' });
    }

    product.gallery.splice(imageIndex, 1);
    await product.save();

    res.json({ message: 'Image removed successfully', gallery: product.gallery });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove image', error: err.message });
  }
};
