const express = require("express");
const router = express.Router();
const {assesmentComponents} = require("../controllers/feedback")

router.post('/feedback',
    assesmentComponents
)

module.exports = router;