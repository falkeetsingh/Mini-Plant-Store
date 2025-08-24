const express = require('express');
const router = express.Router();
const { addReview, getProductReviews, deleteReview, updateReview } = require('../controllers/reviewController');
const auth = require('../middleware/auth');
const upload = require('../config/multer'); 

router.post('/', auth, upload.single('reviewImage'), addReview);

router.get('/:productId', getProductReviews);

router.delete('/:id', auth, deleteReview);

router.put('/:id', auth, upload.single('reviewImage'), updateReview);

module.exports = router;
