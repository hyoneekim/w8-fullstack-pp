const express = require("express")
const { signUp, logInUser} = require("../controllers/userControllers")



const router = express.Router()



router.post("/signup", signUp)
router.post("/login", logInUser)



module.exports = router