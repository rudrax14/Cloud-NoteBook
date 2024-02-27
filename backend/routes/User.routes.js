const express = require('express');
const router = express.Router();

const { register, login } = require('../controllers/Auth.controller');
const { fetchUsers } = require('../controllers/User.controller');
const { auth } = require('../middleware/Auth.middleware');

router.post('/register', register);
router.post('/login', login);


router.route('/getuser').get(auth, fetchUsers);

module.exports = router;