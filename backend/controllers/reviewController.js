const Review = require('../models/Review');
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

exports.addReview = async (req, res) => {
  try {
    const { productId, rating, text } = req.body;

    // Get image path from multer upload
    const image = req.file ? `/uploads/${req.file.filename}` : '';

    const review = await Review.create({
      product: productId,
      user: req.user.id,
      rating,
      text,
      image
    });

    res.status(201).json(review);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getProductReviews = async (req, res) => {
  try {
    const productId = mongoose.Types.ObjectId.createFromHexString(req.params.productId);

    const reviews = await Review.find({ product: productId })
      .populate('user', 'name profilePhoto');

    res.status(200).json(reviews);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteReview = async (req, res) => {
  try {
    const review = await Review.findById(req.params.id);
    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ message: 'Not authorized to delete this review' });
    }

    // Delete image file from local uploads if it exists
    if (review.image) {
      const filePath = path.join(__dirname, '..', review.image);
      fs.unlink(filePath, err => {
        if (err) console.error('Error deleting image:', err.message);
      });
    }

    await Review.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: 'Review and image deleted successfully' });
  } catch (error) {
    console.error('Error deleting review:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

exports.updateReview = async (req, res) => {
  try {
    const { rating, text } = req.body;
    const review = await Review.findById(req.params.id);

    if (!review) {
      return res.status(404).json({ message: 'Review not found' });
    }

    if (review.user.toString() !== req.user.id) {
      return res.status(403).json({ message: 'Not authorized to update this review' });
    }

    let updateData = { rating, text };

    // Handle new image upload
    if (req.file) {
      if (review.image) {
        const oldPath = path.join(__dirname, '..', review.image);
        fs.unlink(oldPath, err => {
          if (err) console.error('Error deleting old image:', err.message);
        });
      }

      updateData.image = `/uploads/${req.file.filename}`;
    }

    const updatedReview = await Review.findByIdAndUpdate(
      req.params.id,
      updateData,
      { new: true }
    ).populate('user', 'name profilePhoto');

    res.json(updatedReview);
  } catch (error) {
    res.status(500).json({ message: 'Failed to update review', error: error.message });
  }
};
