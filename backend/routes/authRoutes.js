const express = require('express');
const router = express.Router();
const { 
    registerUser, 
    loginUser, 
    logoutUser, 
    me,  
} = require('../controllers/authController');
const auth = require('../middleware/auth');

router.post('/signup', registerUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.get('/me', auth, me);


module.exports = router;