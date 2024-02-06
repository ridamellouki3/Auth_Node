const express = require('express')
const {Home,registre,login} =require('../controllers/userController')

const router = express.Router()



router.get('/',Home)
router.post('/api/registre',registre)
router.post('/api/login',login)

module.exports = router