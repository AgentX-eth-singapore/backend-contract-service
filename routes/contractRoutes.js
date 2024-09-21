const express = require("express");
const router = express.Router();
const contractController = require("../controllers/contractController");

router.post("/store", contractController.storeContract);
router.post("/txn-data", contractController.getTransactionData);

module.exports = router;
