const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const upload = require('../config/multer');

router.post(
  '/',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
  ]),
  productController.addProduct
);

router.put(
  '/:id',
  upload.fields([
    { name: 'mainImage', maxCount: 1 },
    { name: 'gallery', maxCount: 5 }
  ]),
  productController.editProduct
);

router.get('/', productController.getAllProducts);
router.get('/:id', productController.getProductById);
router.delete('/:id', productController.deleteProduct);
router.post('/:id/remove_image', productController.removeGalleryImage);

module.exports = router;
