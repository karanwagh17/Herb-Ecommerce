const moongose = require("mongoose")
require("dotenv").config()

const connection = moongose.connect(process.env.MOONGOSE_URL)
module.exports=connection